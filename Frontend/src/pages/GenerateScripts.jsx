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

const GenerateScripts = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("");
  const [duration, setDuration] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");

  const handleGenerate = () => {
    if (!title.trim() || !contentType) {
      toast({
        title: "Details needed 🌱",
        description: "Please fill in the title and content type to generate a script.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const script = `# ${title}

## Introduction (0:00 - 0:30)
Hey everyone! Welcome back to my channel. Today we're diving into "${title}" - something I'm really excited to share with you because [personal connection/hook].

If you're new here, I create content about [your niche] to help you [main benefit]. Make sure to subscribe and hit that notification bell!

## Main Content (0:30 - ${duration ? `${parseInt(duration) - 1}:00` : "4:00"})

### Key Point 1: [First Major Point]
${keyPoints.split('\n')[0] || "Let's start with the fundamentals..."}

[Explain with examples, visuals, or demonstrations]

### Key Point 2: [Second Major Point] 
${keyPoints.split('\n')[1] || "Moving on to the next important aspect..."}

[Provide actionable tips or step-by-step guidance]

### Key Point 3: [Third Major Point]
${keyPoints.split('\n')[2] || "Finally, let's talk about..."}

[Share personal experience or case study]

## Conclusion (${duration ? `${parseInt(duration) - 1}:00` : "4:00"} - ${duration || "5:00"})
So there you have it - everything you need to know about "${title}". 

The key takeaways are:
1. [First takeaway]
2. [Second takeaway] 
3. [Third takeaway]

What's your experience with this topic? Let me know in the comments below! If this video helped you, please give it a thumbs up and consider subscribing for more content like this.

Next week, I'll be covering [related topic], so make sure you're subscribed to catch that. Until then, keep creating amazing content!

---

## Call-to-Action Notes:
- Subscribe button appears at [timestamp]
- End screen promotes [related video/playlist]
- Pin comment asking engaging question
- Description includes relevant links and timestamps`;

      setGeneratedScript(script);
      setIsGenerating(false);

      toast({
        title: "Script ready! 📝",
        description: "Your content script has been generated and is ready to use.",
      });
    }, 3000);
  };

  const copyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Script copied and ready to use for filming.",
    });
  };

  const downloadScript = () => {
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

  const saveScript = () => {
    const saved = JSON.parse(localStorage.getItem("pixelGardenSaved") || "[]");
    const newItem = {
      id: Date.now().toString(),
      type: "script",
      title: title || "Generated Script",
      content: generatedScript,
      createdAt: new Date().toISOString(),
    };

    saved.push(newItem);
    localStorage.setItem("pixelGardenSaved", JSON.stringify(saved));

    toast({
      title: "Script saved! 💾",
      description: "Added to your saved dashboard.",
    });
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
                      <Badge className="bg-growth-seed text-primary shadow-soft">
                        {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                      </Badge>
                      {duration && (
                        <Badge className="bg-growth-sprout text-primary shadow-soft">
                          {duration} minutes
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
