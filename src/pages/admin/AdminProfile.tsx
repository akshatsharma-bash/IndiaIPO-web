import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { authApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Lock, Shield, Loader2 } from "lucide-react";

const AdminProfile = () => {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must be the same.",
        variant: "destructive"
      });
      return;
    }

    if ((formData.newPassword || formData.email !== user?.email) && !formData.currentPassword) {
      toast({
        title: "Current password required",
        description: "Please enter your current password to change email or password.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, string> = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.currentPassword) {
        payload.currentPassword = formData.currentPassword;
      }
      if (formData.newPassword) {
        payload.newPassword = formData.newPassword;
      }

      await authApi.updateProfile(payload);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));

      // If email/password changed, we might need to re-login to get fresh token
      if (formData.newPassword || formData.email !== user?.email) {
         window.location.reload();
      }
      
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Admin Profile & Security
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account settings, update email and password securely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border border-border shadow-sm">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-9"
                  placeholder="Admin Name"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9 bg-muted text-muted-foreground cursor-not-allowed"
                  placeholder="admin@indiaipo.in"
                  readOnly
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold border-b pb-2">Security Updates</h3>
            <p className="text-xs text-muted-foreground">
              To change your email or password, you must enter your current password.
            </p>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="pl-9"
                  placeholder="Enter current password to make changes"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
