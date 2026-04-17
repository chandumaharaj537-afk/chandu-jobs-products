import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  ROLE_LABELS,
  type RoleKey,
  backendToRole,
  roleToBackend,
  useMyProfile,
  useUpsertProfile,
} from "@/hooks/useQueries";
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Globe,
  Info,
  Loader2,
  LogIn,
  Mail,
  Save,
  ShoppingBag,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Role icon map ─────────────────────────────────────────────────────────────

const ROLE_ICONS: Record<RoleKey, React.ReactNode> = {
  jobSeeker: <Briefcase size={14} />,
  employer: <Briefcase size={14} />,
  seller: <ShoppingBag size={14} />,
};

// ─── Profile Preview Card ──────────────────────────────────────────────────────

interface PreviewCardProps {
  name: string;
  role: RoleKey;
  contactInfo: string;
  bio: string;
  principal: string | null;
}

function ProfilePreviewCard({
  name,
  role,
  contactInfo,
  bio,
  principal,
}: PreviewCardProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";
  const isEmail = contactInfo.includes("@");

  return (
    <div className="card-royal p-6 sticky top-24">
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-4">
        Preview
      </p>

      {/* Avatar */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center text-2xl font-display font-bold text-primary mb-3 shadow-lg">
          {initials}
        </div>
        <h3 className="font-display text-xl font-bold text-foreground leading-tight">
          {name || (
            <span className="text-muted-foreground italic text-base">
              Your Name
            </span>
          )}
        </h3>
        <div className="mt-2">
          <Badge variant="secondary" className="gap-1.5 text-xs">
            {ROLE_ICONS[role]}
            {ROLE_LABELS[role]}
          </Badge>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Bio */}
      {bio ? (
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
          {bio}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground italic mb-4">
          No bio provided
        </p>
      )}

      {/* Contact info */}
      {contactInfo && (
        <div className="flex items-center gap-2 text-sm text-foreground">
          {isEmail ? (
            <Mail size={13} className="text-muted-foreground shrink-0" />
          ) : (
            <Globe size={13} className="text-muted-foreground shrink-0" />
          )}
          <span className="truncate">{contactInfo}</span>
        </div>
      )}

      {/* Principal */}
      {principal && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-[10px] text-muted-foreground font-mono truncate">
            {principal}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Profile() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    login,
    principal,
  } = useAuth();
  const { data: existingProfile, isLoading: profileLoading } = useMyProfile();
  const {
    mutateAsync: upsertProfile,
    isPending: isSaving,
    isSuccess: savedOk,
    isError: saveError,
  } = useUpsertProfile();

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState<RoleKey>("jobSeeker");
  const [contactInfo, setContactInfo] = useState("");
  const [bio, setBio] = useState("");

  // Pre-fill from existing profile
  useEffect(() => {
    if (existingProfile) {
      setName(existingProfile.name || "");
      setRole(backendToRole(existingProfile.role));
      setContactInfo(existingProfile.contactInfo || "");
      setBio(existingProfile.bio || "");
    }
  }, [existingProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertProfile({
      name: name.trim(),
      role: roleToBackend(role),
      contactInfo: contactInfo.trim(),
      bio: bio.trim(),
    });
  };

  // ── Auth loading ───────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <Layout>
        <div
          className="py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground"
          data-ocid="profile.loading_state"
        >
          <Loader2 size={28} className="animate-spin text-primary" />
          <p className="text-sm">Connecting…</p>
        </div>
      </Layout>
    );
  }

  // ── Not authenticated ──────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <Layout>
        <div
          className="py-24 text-center max-w-md mx-auto"
          data-ocid="profile.unauthenticated_state"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <LogIn size={32} className="text-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Sign in to view your Profile
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Set up your profile to appear as a trusted employer, job seeker, or
            seller on the platform.
          </p>
          <Button
            onClick={login}
            size="lg"
            className="gap-2"
            data-ocid="profile.signin_button"
          >
            <LogIn size={16} />
            Sign In with Internet Identity
          </Button>
        </div>
      </Layout>
    );
  }

  // ── Authenticated ──────────────────────────────────────────────────────────
  return (
    <Layout>
      <div className="py-8" data-ocid="profile.page">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <User size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              My Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              {existingProfile
                ? "Update your account information"
                : "Complete your profile to get started"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Form ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {profileLoading ? (
              <div
                className="card-elevated p-6 space-y-5"
                data-ocid="profile.loading_state"
              >
                {[1, 2, 3, 4].map((k) => (
                  <div key={k} className="space-y-2">
                    <div className="h-4 w-24 bg-muted/60 rounded animate-pulse" />
                    <div className="h-10 w-full bg-muted/40 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-elevated p-6 space-y-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chandu Kumar"
                    required
                    data-ocid="profile.name_input"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label>
                    Account Role <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={role}
                    onValueChange={(v) => setRole(v as RoleKey)}
                  >
                    <SelectTrigger data-ocid="profile.role_select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(ROLE_LABELS) as RoleKey[]).map((r) => (
                        <SelectItem key={r} value={r}>
                          <span className="flex items-center gap-2">
                            {ROLE_ICONS[r]}
                            {ROLE_LABELS[r]}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Info size={11} />
                    Determines how you appear to others on the platform
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <Label htmlFor="contactInfo">
                    Contact Info <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="your@email.com or +91 98765 43210"
                    required
                    data-ocid="profile.contact_input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Visible to others who view your listings
                  </p>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell others about yourself — your experience, skills, what you're looking for…"
                    rows={4}
                    data-ocid="profile.bio_textarea"
                  />
                </div>

                <Separator />

                {/* Status & Submit */}
                <div className="flex items-center gap-3">
                  {savedOk && (
                    <span
                      className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium"
                      data-ocid="profile.success_state"
                    >
                      <CheckCircle2 size={15} />
                      Profile saved successfully!
                    </span>
                  )}
                  {saveError && (
                    <span
                      className="flex items-center gap-1.5 text-sm text-destructive"
                      data-ocid="profile.error_state"
                    >
                      <AlertCircle size={15} />
                      Save failed. Please try again.
                    </span>
                  )}
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="gap-2 ml-auto"
                    data-ocid="profile.save_button"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Saving…
                      </>
                    ) : (
                      <>
                        <Save size={14} /> Save Profile
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* ── Preview ────────────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <ProfilePreviewCard
              name={name}
              role={role}
              contactInfo={contactInfo}
              bio={bio}
              principal={principal}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
