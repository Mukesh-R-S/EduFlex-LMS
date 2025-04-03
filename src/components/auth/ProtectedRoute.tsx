
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      try {
        // Get profile data from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          
          // If the profile doesn't exist, create one
          if (error.code === 'PGRST116') {
            const { data: userData } = await supabase.auth.getUser();
            
            if (userData.user) {
              const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert([{ 
                  id: userData.user.id,
                  name: userData.user.user_metadata?.name || userData.user.email?.split('@')[0] || 'User',
                  email: userData.user.email
                }])
                .select('*')
                .single();
                
              if (insertError) {
                console.error('Error creating profile:', insertError);
                toast.error('Failed to create user profile');
              } else {
                setProfile(newProfile);
              }
            }
          } else {
            toast.error('Failed to load user profile');
          }
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Show loading state when either auth or profile is loading
  if (authLoading || profileLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
