import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Sprout, Calendar, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import garden from "../assets/garden1.jpeg"


const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sprout className="w-8 h-8 text-primary" />
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-garden bg-clip-text text-transparent">
                Pixel Garden
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Nurture your content ideas from seed to harvest in your own cozy digital garden. 
              Plan, grow, and cultivate amazing content with the magic of pixel-perfect organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto shadow-medium hover:shadow-strong transition-all">
                  <Leaf className="w-5 h-5 mr-2" />
                  Start Growing
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-soft">
                  Plant Your Garden
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src={garden}
              alt="Cozy pixel garden with sprouting plants and cottage"
              className="rounded-2xl shadow-strong w-full h-auto"
            />
            <div className="absolute -top-4 -right-4 bg-gradient-garden rounded-full p-6 shadow-medium">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need to Grow Great Content
          </h2>
          <p className="text-muted-foreground text-lg">
            From tiny seeds of ideas to fully bloomed masterpieces
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 shadow-soft hover:shadow-medium transition-all border-0 bg-card/50 backdrop-blur">
            <div className="bg-growth-seed rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Content Calendar</h3>
            <p className="text-muted-foreground">
              Plant your ideas in the perfect season. Organize and schedule your content with our intuitive calendar system.
            </p>
          </Card>

          <Card className="p-8 shadow-soft hover:shadow-medium transition-all border-0 bg-card/50 backdrop-blur">
            <div className="bg-growth-sprout rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Sprout className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Growth Tracking</h3>
            <p className="text-muted-foreground">
              Watch your ideas grow through 5 stages: Idea → Script → Video → Editing → SEO. Each step brings you closer to harvest.
            </p>
          </Card>

          <Card className="p-8 shadow-soft hover:shadow-medium transition-all border-0 bg-card/50 backdrop-blur">
            <div className="bg-growth-bloom rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI Assistance</h3>
            <p className="text-muted-foreground">
              Get help generating ideas, scripts, and SEO strategies. Let AI be your gardening assistant in the creative process.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;
