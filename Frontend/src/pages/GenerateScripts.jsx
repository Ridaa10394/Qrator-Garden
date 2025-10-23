import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Wand2, RefreshCw, Copy, Download, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// Import the new API function
import { generateScript as generateScriptAPI, saveScript as saveScriptAPI } from "@/apiCalls/scriptAPI"; 



const GenerateScripts = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("");
  const [duration, setDuration] = useState("5"); // Default duration to 5
  const [keyPoints, setKeyPoints] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  // State to hold the content type and duration used for the generated script (for saving metadata)
  const [generatedMetadata, setGeneratedMetadata] = useState(null); 
  
  // Handled logic for the button click
  const handleGenerate = async () => {
    if (!title.trim() || !contentType || !duration) {
      toast({
        title: "Details needed 🌱",
        description: "Please fill in the title, content type, and duration to generate a script.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedScript("");
    setGeneratedMetadata(null); // Clear previous metadata

    try {
      // 1. Call the backend API to generate the script
      const scriptText = await generateScriptAPI(title, contentType, duration, keyPoints);
      
      setGeneratedScript(scriptText);
      // Save metadata related to this specific generated content
      setGeneratedMetadata({ contentType, duration: parseInt(duration) });

      toast({
        title: "Script ready! 📝",
        description: "Your content script has been generated and is ready to use.",
      });

    } catch (error) {
      console.error("Script Generation Error:", error);
      toast({
        title: "Generation Failed 🛑",
        description: error?.message || "Could not generate script. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyScript = () => {
    if (!generatedScript) return;
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Script copied and ready to use for filming.",
    });
  };

  const downloadScript = () => {
    if (!generatedScript) return;
    const element = document.createElement("a");
    const file = new Blob([generatedScript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_script.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Script downloaded! 💾",
      description: "Your script file has been saved to downloads.",
    });
  };

  // Handled logic for saving to the database
  const saveScript = async () => {
    if (!generatedScript) {
      toast({
        title: "Nothing to save 😅",
        description: "Generate a script before trying to save it.",
      });
      return;
    }

    try {
      // 2. Call the backend API to save the script to the database
      await saveScriptAPI(
        title || "Generated Script",
        generatedScript,
        generatedMetadata // Pass the saved metadata
      );

      toast({
        title: "Script saved! ✅",
        description: "Added to your saved dashboard.",
      });
      
    } catch (error) {
      console.error("Script Save Error:", error);
      toast({
        title: "Save Failed 🛑",
        description: error?.message || "Could not save script. Try again.",
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
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-green-800">
                Script Generator
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Transform your ideas into engaging, structured scripts
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left - Inputs */}
            <div className="space-y-6">
              <Card className="shadow-medium border-0 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-primary" />
                    Script Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-base font-medium">
                      Content Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., 5 Pixel Art Mistakes Beginners Make"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="shadow-soft mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contentType" className="text-base font-medium">
                        Content Type
                      </Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger className="shadow-soft mt-2">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube Video</SelectItem>
                          <SelectItem value="podcast">Podcast Episode</SelectItem>
                          <SelectItem value="instagram">Instagram Reel</SelectItem>
                          <SelectItem value="tiktok">TikTok Video</SelectItem>
                          <SelectItem value="presentation">Presentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="duration" className="text-base font-medium">
                        Target Duration (minutes)
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="5"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="shadow-soft mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="keyPoints" className="text-base font-medium">
                      Key Points to Cover (Optional)
                    </Label>
                    <Textarea
                      id="keyPoints"
                      placeholder="Enter each key point on a new line"
                      value={keyPoints}
                      onChange={(e) => setKeyPoints(e.target.value)}
                      className="shadow-soft mt-2 resize-none"
                      rows={4}
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
                        Writing Script...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 mr-2" />
                        Generate Script
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right - Output */}
            <div>
              {generatedScript ? (
                <Card className="shadow-medium border-0 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-growth-bloom" />
                        Generated Script
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={copyScript}
                          className="shadow-soft hover:shadow-medium transition-all"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={saveScript}
                          className="shadow-soft hover:shadow-medium transition-all"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={downloadScript}
                          className="shadow-soft hover:shadow-medium transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-6 shadow-soft">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                        {generatedScript}
                      </pre>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {generatedMetadata && generatedMetadata.contentType && (
                          <Badge className="bg-growth-seed text-primary shadow-soft">
                            {generatedMetadata.contentType.charAt(0).toUpperCase() + generatedMetadata.contentType.slice(1)}
                          </Badge>
                      )}
                      {generatedMetadata && generatedMetadata.duration && (
                        <Badge className="bg-growth-sprout text-primary shadow-soft">
                          {generatedMetadata.duration} minutes
                        </Badge>
                      )}
                      <Badge className="bg-growth-sapling text-primary shadow-soft">
                        Ready to Film
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-soft border-0 bg-card/30 backdrop-blur">
                  <CardContent className="p-6 flex items-center justify-center min-h-[400px]">
                    <div className="text-center text-muted-foreground">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Your generated script will appear here</p>
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

export default GenerateScripts;