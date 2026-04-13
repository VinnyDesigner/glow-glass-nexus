import { useState } from "react";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FooterEditor() {
  const { footer, updateFooter } = useContentStore();
  const [draft, setDraft] = useState({
    quickLinks: [...footer.quickLinks],
    externalLinks: [...footer.externalLinks],
    socialLinks: [...footer.socialLinks],
  });
  const { toast } = useToast();

  const handleSave = () => {
    updateFooter(draft);
    toast({ title: "Footer updated!" });
  };

  const addQuickLink = () => {
    setDraft({ ...draft, quickLinks: [...draft.quickLinks, { id: `ql${Date.now()}`, label: "", href: "" }] });
  };

  const addExternalLink = () => {
    setDraft({ ...draft, externalLinks: [...draft.externalLinks, { id: `el${Date.now()}`, label: "", href: "" }] });
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
          <div key={link.id} className="flex items-center gap-3">
            <Input placeholder="Label" value={link.label} onChange={(e) => updateQuickLink(link.id, "label", e.target.value)} className="flex-1" />
            <Input placeholder="URL" value={link.href} onChange={(e) => updateQuickLink(link.id, "href", e.target.value)} className="flex-1" />
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
          <div key={link.id} className="flex items-center gap-3">
            <Input placeholder="Label" value={link.label} onChange={(e) => updateExternalLink(link.id, "label", e.target.value)} className="flex-1" />
            <Input placeholder="URL" value={link.href} onChange={(e) => updateExternalLink(link.id, "href", e.target.value)} className="flex-1" />
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

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save size={18} /> Update Footer
      </Button>
    </div>
  );
}
