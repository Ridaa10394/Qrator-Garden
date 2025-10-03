import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/apiCalls/authCalls.js";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user ={
      name,
      email,
      password

    }

    // Simulate signup process
    try {
      const data = await signUp(user);
      toast({
        title: "Welcome back to your garden! 🌱",
        description: "Now please log in to start nurturing your amazing content.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "SignUp failed",
        description: error.message || error || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            <div className="bg-gradient-garden rounded-full p-4">
              <Sprout className="w-8 h-8  text-green-800" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-garden bg-clip-text text-transparent">
            Plant Your Garden
          </CardTitle>
          <CardDescription>
            Create your cozy pixel garden and start growing amazing content
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Gardener Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your creative name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow-soft"
              />
            </div>

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
                  Planting Seeds...
                </div>
              ) : (
                "Create My Garden"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have a garden?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Return to your garden
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
