import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles, RefreshCw, Copy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GenerateIdeas = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required 🌱",
        description: "Please enter a topic to generate ideas for.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const ideas = [
        `"${topic} Fundamentals: A Complete Beginner's Guide" - Start with the basics and build up foundational knowledge`,
        `"5 Common ${topic} Mistakes (And How to Avoid Them)" - Help your audience sidestep typical pitfalls`,
        `"${topic} vs. Alternative: Which is Better?" - Compare different approaches or tools in your niche`,
        `"My ${topic} Journey: What I Learned in 30 Days" - Share personal experience and growth`,
        `"${topic} Tools & Resources: My Current Stack" - Review and recommend helpful tools`,
        `"Advanced ${topic} Techniques for ${audience || "Creators"}" - Dive deep into expert-level strategies`,
      ];

      setGeneratedIdeas(ideas);
      setIsGenerating(false);

      toast({
        title: "Ideas bloomed! 🌸",
        description: "Fresh content ideas are ready for planting.",
      });
    }, 2000);
  };

  const copyIdea = (idea) => {
    navigator.clipboard.writeText(idea);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Idea copied and ready to plant in your garden.",
    });
  };

  const saveIdea = (idea) => {
    const saved = JSON.parse(localStorage.getItem("pixelGardenSaved") || "[]");
    const newItem = {
      id: Date.now().toString(),
      type: "idea",
      title: idea.split('"')[1] || idea.substring(0, 50) + "...",
      content: idea,
      createdAt: new Date().toISOString(),
    };

    saved.push(newItem);
    localStorage.setItem("pixelGardenSaved", JSON.stringify(saved));

    toast({
      title: "Idea saved! 💾",
      description: "Added to your saved dashboard.",
    });
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
                        <p className="text-sm mb-3">{idea}</p>
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
