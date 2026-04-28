import { useState } from "react";
import { useContentStore, defaultFooter } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResetConfirmModal from "../ResetConfirmModal";

export default function FooterEditor() {
  const { footer, updateFooter } = useContentStore();
  const [draft, setDraft] = useState({
    quickLinks: [...footer.quickLinks],
    externalLinks: [...footer.externalLinks],
    socialLinks: [...footer.socialLinks],
  });
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updateFooter(draft);
    toast({ title: "Footer updated!" });
  };

  const handleReset = () => {
    const resetData = {
      quickLinks: [...defaultFooter.quickLinks],
      externalLinks: [...defaultFooter.externalLinks],
      socialLinks: [...defaultFooter.socialLinks],
    };
    setDraft(resetData);
    updateFooter(defaultFooter);
    toast({ title: "Page reset to default successfully" });
  };

  const addQuickLink = () => {
    setDraft({ ...draft, quickLinks: [...draft.quickLinks, { id: `ql${Date.now()}`, label: "", label_ar: "", href: "" }] });
  };

  const addExternalLink = () => {
    setDraft({ ...draft, externalLinks: [...draft.externalLinks, { id: `el${Date.now()}`, label: "", label_ar: "", href: "" }] });
  };

  const updateQuickLink = (id: string, field: string, value: string) => {
    setDraft({ ...draft, quickLinks: draft.quickLinks.map((l) => l.id === id ? { ...l, [field]: value } : l) });
  };

  const updateExternalLink = (id: string, field: string, value: string) => {
    setDraft({ ...draft, externalLinks: draft.externalLinks.map((l) => l.id === id ? { ...l, [field]: value } : l) });
  };

  const updateSocial = (platform: string, href: string) => {
    setDraft({ ...draft, socialLinks: draft.socialLinks.map((s) => s.platform === platform ? { ...s, href } : s) });
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Quick Links */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Quick Links</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={addQuickLink}>
            <Plus size={14} /> Add Link
          </Button>
        </div>
        {draft.quickLinks.map((link) => (
          <div key={link.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_auto] items-center gap-3">
            <Input placeholder="Label (EN)" value={link.label} onChange={(e) => updateQuickLink(link.id, "label", e.target.value)} />
            <Input dir="rtl" placeholder="التسمية (AR)" value={link.label_ar || ""} onChange={(e) => updateQuickLink(link.id, "label_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
            <Input placeholder="URL" value={link.href} onChange={(e) => updateQuickLink(link.id, "href", e.target.value)} />
            <Button variant="ghost" size="icon" onClick={() => setDraft({ ...draft, quickLinks: draft.quickLinks.filter((l) => l.id !== link.id) })} className="text-destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      {/* External Links */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">External Links</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={addExternalLink}>
            <Plus size={14} /> Add Link
          </Button>
        </div>
        {draft.externalLinks.map((link) => (
          <div key={link.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_auto] items-center gap-3">
            <Input placeholder="Label (EN)" value={link.label} onChange={(e) => updateExternalLink(link.id, "label", e.target.value)} />
            <Input dir="rtl" placeholder="التسمية (AR)" value={link.label_ar || ""} onChange={(e) => updateExternalLink(link.id, "label_ar", e.target.value)} style={{ fontFamily: "'Cairo','Tajawal',sans-serif" }} />
            <Input placeholder="URL" value={link.href} onChange={(e) => updateExternalLink(link.id, "href", e.target.value)} />
            <Button variant="ghost" size="icon" onClick={() => setDraft({ ...draft, externalLinks: draft.externalLinks.filter((l) => l.id !== link.id) })} className="text-destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Social Media</h3>
        {draft.socialLinks.map((social) => (
          <div key={social.platform} className="flex items-center gap-3">
            <Label className="w-24 shrink-0">{social.platform}</Label>
            <Input placeholder="URL" value={social.href} onChange={(e) => updateSocial(social.platform, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update Footer
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset Changes
        </Button>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
