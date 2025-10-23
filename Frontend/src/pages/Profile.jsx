import React, { useState, useEffect, useContext } from "react";
import Navigation from "@/components/Navigation.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Edit3, Save, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast.js";
import { getProfile, updateProfile } from "@/apiCalls/profileAPI.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.jsx";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // ✅ Use AuthContext for logout

  const [profile, setProfile] = useState({ name: "", email: "", bio: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfile();
        setProfile(user);
      } catch (error) {
        toast({
          title: "Error fetching profile",
          description: error.message || "Could not fetch profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

  // Save profile edits
  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(profile);
      setProfile(updatedUser);
      setIsEditing(false);
      toast({
        title: "Profile updated! 🌿",
        description: "Your garden profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "Could not update profile",
        variant: "destructive",
      });
    }
  };

  // Logout using AuthContext
  const handleLogout = () => {
    logout(); // Updates AuthContext and sets isAuthenticated = false
    navigate("/login"); // Redirect to login page
  };

  if (isLoading) return <div>Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-earth">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Your Garden Profile 🌻
              </h1>
              <p className="text-muted-foreground">
                Manage your creative space and track your growth journey
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
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
                    <Label htmlFor="bio">MOTO</Label>
                    {isEditing ? (
                      <Textarea
                        id="moto"
                        value={profile.moto}
                        onChange={(e) =>
                          setProfile({ ...profile, moto: e.target.value })
                        }
                        className="shadow-soft resize-none"
                        rows={3}
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.moto}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  );
};

export default Profile;
