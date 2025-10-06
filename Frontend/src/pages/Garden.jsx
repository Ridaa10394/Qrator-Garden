import { useState } from "react";
import Navigation from "@/components/Navigation";
import ContentCalendar from "@/components/ContentCalender";
import ProgressCard from "@/components/ProgressCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Sprout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Garden = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaDescription, setNewIdeaDescription] = useState("");
  const [ideas, setIdeas] = useState([
    {
      id: "1",
      title: "Pixel Art Tutorial Series",
      description: "Complete beginner's guide to creating beautiful pixel art",
      currentStage: 2,
      createdAt: new Date(2024, 8, 20)
    },
    {
      id: "2",
      title: "Garden Design Tips",
      description: "How to create cozy outdoor spaces on any budget",
      currentStage: 0,
      createdAt: new Date(2024, 8, 25)
    },
    {
      id: "3",
      title: "Content Planning Workflow",
      description: "My complete system for organizing creative projects",
      currentStage: 4,
      createdAt: new Date(2024, 8, 15)
    }
  ]);

  const handleStageUpdate = (id, newStage) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, currentStage: newStage } : idea
      )
    );

    toast({
      title: "Growth achieved! 🌱",
      description: "Your content idea has advanced to the next stage."
    });
  };

  const handleAddIdea = () => {
    if (!newIdeaTitle.trim()) {
      toast({
        title: "Title required 🌱",
        description: "Please enter a title for your content idea.",
        variant: "destructive"
      });
      return;
    }

    const newIdea = {
      id: Date.now().toString(),
      title: newIdeaTitle,
      description:
        newIdeaDescription || "A fresh seed waiting to be developed",
      currentStage: 0,
      createdAt: new Date()
    };

    setIdeas((prev) => [newIdea, ...prev]);
    setNewIdeaTitle("");
    setNewIdeaDescription("");
    setIsDialogOpen(false);

    toast({
      title: "New seed planted! 🌱",
      description: "Your new content idea is ready to grow."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Calendar */}
          <div className="lg:col-span-4">
            <ContentCalendar />
          </div>

          {/* Main Content - Progress Cards */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Welcome to Your Garden 🌻
                  </h1>
                  <p className="text-muted-foreground">
                    Watch your content ideas grow from seeds to full harvest
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="shadow-medium hover:shadow-strong transition-all">
                      <Plus className="w-4 h-4 mr-2" />
                      Plant New Idea
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Plant a New Content Seed 🌱</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="idea-title">Title</Label>
                        <Input
                          id="idea-title"
                          placeholder="Enter your content idea title"
                          value={newIdeaTitle}
                          onChange={(e) => setNewIdeaTitle(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="idea-description">
                          Description (Optional)
                        </Label>
                        <Textarea
                          id="idea-description"
                          placeholder="Describe your content idea..."
                          value={newIdeaDescription}
                          onChange={(e) =>
                            setNewIdeaDescription(e.target.value)
                          }
                          className="mt-1 resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddIdea}>
                          <Plus className="w-4 h-4 mr-2" />
                          Plant Seed
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="shadow-soft border-0 bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {ideas.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ideas Planted
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-0 bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-growth-sprout">
                      {ideas.filter((idea) => idea.currentStage >= 1).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sprouting
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-0 bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-growth-bloom">
                      {ideas.filter((idea) => idea.currentStage >= 3).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Blooming
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-0 bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-growth-harvest">
                      {ideas.filter((idea) => idea.currentStage === 4).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Harvested
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Progress Cards Grid */}
            <div className="space-y-6">
              {ideas.length === 0 ? (
                <Card className="shadow-soft border-0 bg-card/50 text-center py-12">
                  <CardContent>
                    <Sprout className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Your garden is empty
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Plant your first content idea and watch it grow through
                      all stages
                    </p>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="shadow-medium">
                          <Plus className="w-4 h-4 mr-2" />
                          Plant Your First Seed
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            Plant a New Content Seed 🌱
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="idea-title">Title</Label>
                            <Input
                              id="idea-title"
                              placeholder="Enter your content idea title"
                              value={newIdeaTitle}
                              onChange={(e) =>
                                setNewIdeaTitle(e.target.value)
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="idea-description">
                              Description (Optional)
                            </Label>
                            <Textarea
                              id="idea-description"
                              placeholder="Describe your content idea..."
                              value={newIdeaDescription}
                              onChange={(e) =>
                                setNewIdeaDescription(e.target.value)
                              }
                              className="mt-1 resize-none"
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleAddIdea}>
                              <Plus className="w-4 h-4 mr-2" />
                              Plant Seed
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {ideas.map((idea) => (
                    <ProgressCard
                      key={idea.id}
                      idea={idea}
                      onStageUpdate={handleStageUpdate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garden;
