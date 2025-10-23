import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Target, RefreshCw, Save, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// Import the new API functions (path points to apiCalls folder)
import {
  generateSEO as generateSEOAPI,
  saveSEO as saveSEOAPI,
} from "@/apiCalls/seoAPI";

// Utility function to safely parse the SEO data object
const parseSeoData = (dataString) => {
  try {
    if (typeof dataString === "string") {
      return JSON.parse(dataString);
    }
    return dataString; // Return as is if it's already an object (e.g., in testing)
  } catch (e) {
    console.error("Failed to parse SEO JSON:", e);
    // Return a structure that prevents the component from crashing
    return {
      title: {},
      description: "",
      keywords: { primary: [], related: [] },
      hashtags: [],
    };
  }
};

const GenerateSEO = () => {
  const { toast } = useToast();
  const [contentTitle, setContentTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [targetKeywords, setTargetKeywords] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoData, setSeoData] = useState(null);
  // State to hold input data used for the generated SEO (for saving metadata)
  const [generatedMetadata, setGeneratedMetadata] = useState(null);

  const handleGenerate = async () => {
    if (!contentTitle.trim() || !platform) {
      toast({
        title: "Details needed 🌱",
        description:
          "Please fill in the content title and platform to generate SEO recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setSeoData(null); // Clear previous output
    setGeneratedMetadata(null);

    try {
      // 1. Call the backend API to generate the SEO data
      const data = await generateSEOAPI(
        contentTitle,
        platform,
        targetKeywords,
        contentDescription
      );

      // Normalize possible response shapes:
      // - backend may return an array of hashtags
      // - backend may return an object { generatedSEOData: {...} } or the object itself
      // - backend may return a JSON string
      let parsedData = null;

      if (Array.isArray(data)) {
        // If the backend returned hashtags array only, map into seoData.hashtags
        parsedData = {
          title: { optimized: "" },
          description: "",
          keywords: { primary: [], related: [] },
          hashtags: data,
        };
      } else if (typeof data === "string") {
        parsedData = parseSeoData(data);
      } else if (data && typeof data === "object") {
        // Try common shapes
        if (data.generatedSEOData) {
          parsedData =
            typeof data.generatedSEOData === "string"
              ? parseSeoData(data.generatedSEOData)
              : data.generatedSEOData;
        } else {
          parsedData = data;
        }
      } else {
        parsedData = {
          title: { optimized: "" },
          description: "",
          keywords: { primary: [], related: [] },
          hashtags: [],
        };
      }

      setSeoData(parsedData);

      // Save metadata related to this generation
      setGeneratedMetadata({
        platform,
        targetKeywords: targetKeywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k),
      });

      toast({
        title: "SEO strategy ready! 🎯",
        description: "Your content optimization recommendations are ready.",
      });
    } catch (error) {
      console.error("SEO Generation Error:", error);
      toast({
        title: "Generation Failed 🛑",
        description:
          error?.message || "Could not generate SEO data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied! 📋`,
      description: "Ready to paste into your content platform.",
    });
  };

  const saveSEO = async () => {
    if (!seoData) {
      toast({
        title: "Nothing to save 😅",
        description: "Generate an SEO strategy before trying to save it.",
      });
      return;
    }

    try {
      // 2. Call the backend API to save the SEO data
      await saveSEOAPI(
        contentTitle || "Generated SEO Strategy",
        seoData, // Pass the structured object
        generatedMetadata
      );

      toast({
        title: "SEO saved! ✅",
        description: "Added to your saved dashboard.",
      });
    } catch (error) {
      console.error("SEO Save Error:", error);
      toast({
        title: "Save Failed 🛑",
        description:
          error?.message || "Could not save SEO strategy. Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-garden rounded-full p-3">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-green-800">
                SEO Generator
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Optimize your content for maximum reach and discoverability
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Side - Inputs */}
            <div className="space-y-6">
              <Card className="shadow-medium border-0 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Content Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label
                      htmlFor="contentTitle"
                      className="text-base font-medium"
                    >
                      Content Title
                    </Label>
                    <Input
                      id="contentTitle"
                      placeholder="e.g., Pixel Art Fundamentals"
                      value={contentTitle}
                      onChange={(e) => setContentTitle(e.target.value)}
                      className="shadow-soft mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="platform"
                        className="text-base font-medium"
                      >
                        Platform
                      </Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger className="shadow-soft mt-2">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="pinterest">Pinterest</SelectItem>
                          <SelectItem value="blog">Blog/Website</SelectItem>
                          <SelectItem value="twitter">Twitter/X</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label
                        htmlFor="targetKeywords"
                        className="text-base font-medium"
                      >
                        Target Keywords (comma-separated)
                      </Label>
                      <Input
                        id="targetKeywords"
                        placeholder="pixel art, digital art, tutorial"
                        value={targetKeywords}
                        onChange={(e) => setTargetKeywords(e.target.value)}
                        className="shadow-soft mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="contentDescription"
                      className="text-base font-medium"
                    >
                      Content Description (Optional)
                    </Label>
                    <Textarea
                      id="contentDescription"
                      placeholder="Brief description of what your content covers..."
                      value={contentDescription}
                      onChange={(e) => setContentDescription(e.target.value)}
                      className="shadow-soft mt-2 resize-none"
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full shadow-medium hover:shadow-strong transition-all"
                    disabled={isGenerating}
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                        Optimizing Content...
                      </>
                    ) : (
                      <>
                        <Target className="w-5 h-5 mr-2" />
                        Generate SEO Strategy
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Output */}
            <div className="space-y-6">
              {seoData ? (
                <Card className="shadow-soft border-0 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-growth-bloom" />
                        SEO Content
                      </CardTitle>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={saveSEO}
                        className="shadow-soft"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/30 shadow-soft">
                      <Label className="text-sm font-semibold mb-2 block">
                        Hashtags
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {/* Note: In a real app, you might want to provide a single copy button for all hashtags */}
                        {seoData.hashtags.map((hashtag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(hashtag, "Hashtag")}
                          >
                            {hashtag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-soft border-0 bg-card/30 backdrop-blur">
                  <CardContent className="p-6 flex items-center justify-center min-h-[400px]">
                    <div className="text-center text-muted-foreground">
                      <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">
                        Your optimized SEO content will appear here
                      </p>
                      <p className="text-sm mt-2">
                        Fill in the form and click generate to get started
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateSEO;
