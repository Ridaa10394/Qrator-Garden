import React, { useState } from "react";
import Navigation from "@/components/Navigation.jsx"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit3,
  Save,
  Sprout,
  Trophy,
  Target,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast.js";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Creative Gardener",
    email: "gardener@pixelgarden.com",
    bio: "Passionate content creator who loves nurturing ideas from tiny seeds into amazing content. Pixel art enthusiast and garden lover! 🌱",
    
  });

  const stats = [
    { label: "Ideas Planted", value: "23", icon: Sprout, color: "text-growth-seed" },
    { label: "Content Harvested", value: "12", icon: Trophy, color: "text-growth-harvest" },
    { label: "Days Streaking", value: "7", icon: Target, color: "text-primary" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated! 🌿",
      description: "Your garden profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Garden Profile 🌻
            </h1>
            <p className="text-muted-foreground">
              Manage your creative space and track your growth journey
            </p>
          </div>

          {/* Profile Card */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Info
                </CardTitle>
                <Button
                  variant={isEditing ? "default" : "secondary"}
                  size="sm"
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className="shadow-soft"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <div className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4 shadow-medium">
                    <AvatarImage src="" alt="Profile Picture" />
                    <AvatarFallback className="bg-gradient-garden text-primary-foreground text-3xl">
                      <User className="w-16 h-16" />
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="secondary" size="sm" className="shadow-soft">
                      Change Avatar
                    </Button>
                  )}
                </div>

                {/* Profile Details */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Gardener Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          className="shadow-soft"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          className="shadow-soft"
                        />
                      ) : (
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {profile.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                        className="shadow-soft resize-none"
                        rows={3}
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                  </div>

                  
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="shadow-soft border-0 bg-card/50 backdrop-blur"
                >
                  <CardContent className="p-6 text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
