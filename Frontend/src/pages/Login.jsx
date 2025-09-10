import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add authentication logic when backend is connected
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="iso-block pixel-border bg-card">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary iso-block pixel-glow">
                <Sprout className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              🌱 Welcome Back, Gardener!
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to tend your content garden
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-mono text-sm">
                  📧 Email Seed
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pixel-border font-mono bg-input"
                  placeholder="your@garden.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-mono text-sm">
                  🔑 Secret Growth Code
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pixel-border font-mono bg-input pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-primary hover:text-primary/80 font-mono underline-offset-4 hover:underline"
                >
                  🌿 Forgot your code?
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full iso-block pixel-border bg-primary hover:bg-primary/90 font-mono text-lg py-6"
              >
                🚪 Enter Garden
              </Button>

              <div className="text-center text-sm text-muted-foreground font-mono">
                New gardener?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  🌱 Plant your first seed
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground font-mono text-sm underline-offset-4 hover:underline"
          >
            ← Back to Garden View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
