import { useState, useEffect } from "react";
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
import { Plus, Sprout, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getIdeas, createIdea, updateIdeaStage, deleteIdea, getUserStats } from "@/apiCalls/ideaAPI";

const Garden = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaDescription, setNewIdeaDescription] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [stats, setStats] = useState({
    totalIdeas: 0,
    sprouting: 0,
    blooming: 0,
    harvested: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch ideas and stats on component mount
  useEffect(() => {
    fetchIdeas();
    fetchStats();
  }, []);

  const fetchIdeas = async () => {
    try {
      setIsLoading(true);
      const fetchedIdeas = await getIdeas();
      // Transform backend data to match frontend format
      const transformedIdeas = fetchedIdeas.map(idea => ({
        id: idea._id,
        title: idea.title,
        description: idea.description || "A fresh seed waiting to be developed",
        currentStage: idea.currentStage,
        createdAt: new Date(idea.createdAt)
      }));
      setIdeas(transformedIdeas);
    } catch (error) {
      toast({
        title: "Failed to load ideas 🌱",
        description: error.message || "Could not fetch your ideas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const fetchedStats = await getUserStats();
      setStats(fetchedStats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleStageUpdate = async (id, newStage) => {
    try {
      const updatedIdea = await updateIdeaStage(id, newStage);
      
      // Update local state
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id ? { ...idea, currentStage: newStage } : idea
        )
      );

      // Refresh stats
      fetchStats();

      toast({
        title: "Growth achieved! 🌱",
        description: "Your content idea has advanced to the next stage."
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "Could not update stage",
        variant: "destructive"
      });
    }
  };

  const handleAddIdea = async () => {
    if (!newIdeaTitle.trim()) {
      toast({
        title: "Title required 🌱",
        description: "Please enter a title for your content idea.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newIdea = await createIdea({
        title: newIdeaTitle,
        description: newIdeaDescription || "A fresh seed waiting to be developed"
      });

      // Transform and add to local state
      const transformedIdea = {
        id: newIdea._id,
        title: newIdea.title,
        description: newIdea.description,
        currentStage: newIdea.currentStage,
        createdAt: new Date(newIdea.createdAt)
      };

      setIdeas((prev) => [transformedIdea, ...prev]);
      
      // Clear form
      setNewIdeaTitle("");
      setNewIdeaDescription("");
      setIsDialogOpen(false);

      // Refresh stats
      fetchStats();

      toast({
        title: "New seed planted! 🌱",
        description: "Your new content idea is ready to grow."
      });
    } catch (error) {
      toast({
        title: "Failed to create idea",
        description: error.message || "Could not save your idea",
        variant: "destructive"
      });
    }
  };

  const handleDeleteIdea = async (id) => {
    try {
      await deleteIdea(id);
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
      fetchStats();
      
      toast({
        title: "Idea removed 🗑️",
        description: "The idea has been deleted from your garden."
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error.message || "Could not delete idea",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-earth">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your garden...</p>
          </div>
        </div>
      </div>
    );
  }

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
                      {stats.totalIdeas}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ideas Planted
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-0 bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-growth-sprout">
                      {stats.sprouting}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sprouting
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-0 bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-growth-bloom">
                      {stats.blooming}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Blooming
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-0 bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-growth-harvest">
                      {stats.harvested}
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
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="shadow-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Plant Your First Seed
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {ideas.map((idea) => (
                    <ProgressCard
                      key={idea.id}
                      idea={idea}
                      onStageUpdate={handleStageUpdate}
                      onDelete={handleDeleteIdea}
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
