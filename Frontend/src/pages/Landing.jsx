import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Sparkles, Target, TrendingUp, Users, Zap, Calendar } from 'lucide-react';

const Landing = () => {
  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: `
          repeating-linear-gradient(
            90deg,
            hsl(var(--muted)) 0px,
            hsl(var(--muted)) 1px,
            transparent 1px,
            transparent 20px
          ),
          repeating-linear-gradient(
            0deg,
            hsl(var(--muted)) 0px,
            hsl(var(--muted)) 1px,
            transparent 1px,
            transparent 20px
          ),
          hsl(var(--background))
        `
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="iso-block bg-card border-4 border-border p-8 mb-8 inline-block">
            <div className="pixel-glow">
              <h1 className="text-6xl font-bold mb-4 uppercase tracking-wider text-primary">
                QRATOR GARDEN 🌱
              </h1>
            </div>
            <p className="text-xl font-bold uppercase tracking-wide text-muted-foreground mb-6">
              GROW YOUR CONTENT EMPIRE
            </p>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed">
              Transform your content ideas into thriving digital assets. Plant seeds, nurture sprouts, 
              and watch your content bloom from concept to publication in our gamified content garden.
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground border-4 border-border font-bold uppercase tracking-wide h-14 px-8 transition-colors  pixel-bounce"
              >
                🌱 PLANT
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline"
                size="lg"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-4 border-border font-bold uppercase tracking-wide h-14 px-8 transition-colors "
              >
                🚪 LOGIN
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 justify-items-center">
          <Card className="w-full max-w-sm iso-block bg-card border-4 border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary border-2 border-border flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold uppercase tracking-wide">IDEA TO BLOOM</h3>
            </div>
            <p className="text-muted-foreground">
              Transform raw ideas into polished content through our 4-stage growth system: 
              Seed → Sprout → Growing → Blooming
            </p>
          </Card>

          <Card className="w-full max-w-sm iso-block bg-card border-4 border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-growing border-2 border-border flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold uppercase tracking-wide">TRACK PROGRESS</h3>
            </div>
            <p className="text-muted-foreground">
              Monitor your content journey with visual progress indicators and celebrate 
              milestones as your garden flourishes.
            </p>
          </Card>

          <Card className="w-full max-w-sm iso-block bg-card border-4 border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent border-2 border-border flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-bold uppercase tracking-wide">BUILD STREAKS</h3>
            </div>
            <p className="text-muted-foreground">
              Maintain daily habits with streak tracking and gamified progression 
              to keep your content creation momentum.
            </p>
          </Card>

          <div className="md:col-span-2 lg:col-span-3 flex justify-center gap-6">
            <Card className="w-full max-w-sm iso-block bg-card border-4 border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-sprout border-2 border-border flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold uppercase tracking-wide">CONTENT TYPES</h3>
              </div>
              <p className="text-muted-foreground">
                Organize ideas, scripts, SEO content, and published pieces in one 
                unified digital garden ecosystem.
              </p>
            </Card>

            <Card className="w-full max-w-sm iso-block bg-card border-4 border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary border-2 border-border flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="font-bold uppercase tracking-wide">DAILY GOALS</h3>
              </div>
              <p className="text-muted-foreground">
                Set and achieve daily content goals with personalized tasks 
                tailored to your garden's growth stage.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="iso-block bg-card border-4 border-border p-8 inline-block">
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-4">
              Ready to Grow Your Content Garden?
            </h2>
            <p className="text-lg mb-6 max-w-md">
              Join creators who've already planted over 10,000 content seeds and watched them bloom.
            </p>
            <Link to="/signup">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/80 text-primary-foreground border-4 border-border font-bold uppercase tracking-wide h-14 px-8 transition-colors pixel-glow"
              >
                🌱 GET STARTED
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;
