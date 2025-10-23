import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Circle, Sprout, TreePine, Flower, Trophy, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { name: "Idea", icon: Circle, color: "bg-growth-seed", description: "Plant the seed" },
  { name: "Script", icon: Sprout, color: "bg-growth-sprout", description: "First growth" },
  { name: "Video", icon: TreePine, color: "bg-growth-sapling", description: "Strong roots" },
  { name: "Editing", icon: Flower, color: "bg-growth-bloom", description: "Beautiful bloom" },
  { name: "SEO", icon: Trophy, color: "bg-growth-harvest", description: "Ready to harvest" },
];

const ProgressCard = ({ idea, onStageUpdate, onDelete }) => {
  const [isAdvancing, setIsAdvancing] = useState(false);

  const handleAdvanceStage = () => {
    if (idea.currentStage < stages.length - 1) {
      setIsAdvancing(true);
      setTimeout(() => {
        onStageUpdate(idea.id, idea.currentStage + 1);
        setIsAdvancing(false);
      }, 500);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${idea.title}"?`)) {
      onDelete(idea.id);
    }
  };

  const currentStageData = stages[idea.currentStage];
  const CurrentIcon = currentStageData.icon;
  const progressPercentage = ((idea.currentStage + 1) / stages.length) * 100;

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all border-0 bg-card/50 backdrop-blur aspect-square flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div
              className={cn(
                "p-3 rounded-full shadow-soft transition-all",
                currentStageData.color,
                isAdvancing && "animate-pulse"
              )}
            >
              <CurrentIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{idea.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="shrink-0">
              {currentStageData.name}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Growth Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-muted/50" />
        </div>

        {/* Stage Indicators */}
        <div className="flex justify-between items-center">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isPast = index < idea.currentStage;
            const isCurrent = index === idea.currentStage;
            const isFuture = index > idea.currentStage;

            return (
              <div
                key={stage.name}
                className="flex flex-col items-center gap-1"
                title={stage.description}
              >
                <div
                  className={cn(
                    "p-2 rounded-full transition-all",
                    isPast && "bg-primary text-primary-foreground shadow-soft",
                    isCurrent && cn(stage.color, "shadow-medium"),
                    isFuture && "bg-muted/50 text-muted-foreground"
                  )}
                >
                  <StageIcon className="w-3 h-3" />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    isPast && "text-primary",
                    isCurrent && "text-foreground",
                    isFuture && "text-muted-foreground"
                  )}
                >
                  {stage.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {idea.currentStage < stages.length - 1 && (
          <Button
            onClick={handleAdvanceStage}
            disabled={isAdvancing}
            className="w-full shadow-soft hover:shadow-medium transition-all"
            variant={idea.currentStage === stages.length - 2 ? "default" : "secondary"}
          >
            {isAdvancing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Growing...
              </div>
            ) : (
              <>
                {idea.currentStage === stages.length - 2
                  ? "🎉 Ready to Harvest!"
                  : `Grow to ${stages[idea.currentStage + 1].name}`}
              </>
            )}
          </Button>
        )}

        {idea.currentStage === stages.length - 1 && (
          <div className="text-center p-4 bg-gradient-garden rounded-lg">
            <Trophy className="w-8 h-8 text-primary-foreground mx-auto mb-2" />
            <p className="text-primary-foreground font-semibold">🎉 Content Harvested!</p>
            <p className="text-primary-foreground/80 text-sm">
              Your idea has grown into amazing content
            </p>
          </div>
        )}

        {/* Creation Date */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
          Planted on {idea.createdAt.toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;

