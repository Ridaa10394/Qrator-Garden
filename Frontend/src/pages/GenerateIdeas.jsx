import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles, RefreshCw, Copy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createIdea, generateIdeas } from "@/apiCalls/ideaAPI";

const GenerateIdeas = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required 🌱",
        description: "Please enter a topic to generate ideas for.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const ideas = await generateIdeas(topic, audience);
      setGeneratedIdeas(ideas);
      toast({
        title: "Ideas bloomed! 🌸",
        description: "Fresh content ideas are ready for planting.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to generate ideas",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyIdea = (idea) => {
    navigator.clipboard.writeText(idea.description || idea.title);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Idea copied and ready to plant in your garden.",
    });
  };

  const saveIdea = async (idea) => {
    try {
      // Save to backend DB
      await createIdea(idea);

      toast({
        title: "Idea saved! 💾",
        description: "Added to your saved dashboard.",
      });
    } catch (err) {
      toast({
        title: "Idea already exists ⚠️",
        description: err.message || "This idea is already in your dashboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-garden rounded-full p-3">
                <Lightbulb className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-green-800">
                Idea Generator
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Plant seeds of inspiration with AI-powered content ideas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left - Inputs */}
            <div className="space-y-6">
              <Card className="shadow-medium border-0 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    What would you like to create content about?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="topic" className="text-base font-medium">
                      Topic or Niche
                    </Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Pixel Art, Gardening"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="shadow-soft mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="audience" className="text-base font-medium">
                      Target Audience (Optional)
                    </Label>
                    <Input
                      id="audience"
                      placeholder="e.g., Beginners"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="shadow-soft mt-2"
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
                        Growing Ideas...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Fresh Ideas
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right - Output */}
            <div>
              {generatedIdeas.length > 0 ? (
                <Card className="shadow-medium border-0 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-growth-bloom" />
                      Fresh Ideas for "{topic}"
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generatedIdeas.map((idea, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-card shadow-soft border"
                      >
                        <Badge className="mb-2">Idea #{index + 1}</Badge>

                        {/* CRITICAL FIX: Explicitly check and display the title and description */}
                        {idea.title && (
                          <h3 className="text-lg font-semibold mb-1 text-green-700">
                            {idea.title}
                          </h3>
                        )}
                        {idea.description && (
                          <p className="text-sm mb-3 text-gray-700">
                            {idea.description}
                          </p>
                        )}

                        {/* Fallback in case only one property (e.g., description) came through, 
        which might happen if parsing fails partially. */}
                        {!idea.title && !idea.description && (
                          <p className="text-sm mb-3 text-gray-700">
                            {typeof idea === "string"
                              ? idea
                              : JSON.stringify(idea)}
                          </p>
                        )}

                        {/* Ensure copyIdea and saveIdea receive the full object */}
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyIdea(idea)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveIdea(idea)}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-soft border-0 bg-card/30 backdrop-blur">
                  <CardContent className="p-6 flex items-center justify-center min-h-[400px]">
                    <div className="text-center text-muted-foreground">
                      <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">
                        Your generated ideas will appear here
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

export default GenerateIdeas;
