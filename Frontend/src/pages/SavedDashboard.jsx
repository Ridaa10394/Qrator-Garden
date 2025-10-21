import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, FileText, Search, Trash2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const SavedDashboard = () => {
  const [savedItems, setSavedItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("pixelGardenSaved");
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  const deleteItem = (id) => {
    const updated = savedItems.filter((item) => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem("pixelGardenSaved", JSON.stringify(updated));
    toast({
      title: "Item deleted",
      description: "Successfully removed from saved items",
    });
  };

  const copyContent = (content) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const getItemsByType = (type) => savedItems.filter((item) => item.type === type);

  const renderItems = (items) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="text-muted-foreground">No saved items yet</div>
          <div className="text-sm text-muted-foreground mt-2">
            Generate content and click the save button to store it here
          </div>
        </div>
      ) : (
        items.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-soft transition-all border-border/50"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-foreground truncate">
                  {item.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyContent(item.content)}
                    className="h-8 w-8 hover:bg-accent"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteItem(item.id)}
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Saved on {new Date(item.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {item.content}
              </div>
              <Badge variant="outline" className="text-xs">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Badge>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800">
              Saved Content
            </h1>
            <p className="text-muted-foreground">
              Your collection of saved ideas, scripts, and SEO content
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                All ({savedItems.length})
              </TabsTrigger>
              <TabsTrigger value="ideas" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Ideas ({getItemsByType("idea").length})
              </TabsTrigger>
              <TabsTrigger value="scripts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Scripts ({getItemsByType("script").length})
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                SEO ({getItemsByType("seo").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {renderItems(savedItems)}
            </TabsContent>

            <TabsContent value="ideas" className="space-y-6">
              {renderItems(getItemsByType("idea"))}
            </TabsContent>

            <TabsContent value="scripts" className="space-y-6">
              {renderItems(getItemsByType("script"))}
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              {renderItems(getItemsByType("seo"))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SavedDashboard;
