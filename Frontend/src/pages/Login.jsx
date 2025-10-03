import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back to your garden! 🌱",
        description: "Ready to nurture some amazing content today?",
      });
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-strong border-0 bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Garden
          </Link>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-garden rounded-full p-4 ">
              <Sprout className="w-8 h-8 text-green-800" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-garden bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Return to your cozy pixel garden and continue growing amazing content
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@garden.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow-soft"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow-soft"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full shadow-medium hover:shadow-strong transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Entering Garden...
                </div>
              ) : (
                "Enter Your Garden"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have a garden yet?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Plant your first seed
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

