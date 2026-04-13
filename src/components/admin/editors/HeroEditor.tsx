import { useState } from "react";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Save, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HeroEditor() {
  const { hero, updateHero } = useContentStore();
  const [draft, setDraft] = useState({ ...hero });
  const { toast } = useToast();

  const handleSave = () => {
    updateHero(draft);
    toast({ title: "Hero section updated!", description: "Changes are now live on the landing page." });
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="neu-card p-6 space-y-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Hero Text</h3>

        <div className="space-y-4">
          <div>
            <Label>Title Line 1</Label>
            <Input value={draft.title1} onChange={(e) => setDraft({ ...draft, title1: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>Title Line 2</Label>
            <Input value={draft.title2} onChange={(e) => setDraft({ ...draft, title2: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Textarea value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} className="mt-1.5" rows={3} />
          </div>
        </div>
      </div>

      <div className="neu-card p-6 space-y-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Overlay Settings</h3>
        <div>
          <Label>Overlay Opacity: {draft.overlayOpacity}%</Label>
          <Slider
            value={[draft.overlayOpacity]}
            onValueChange={([v]) => setDraft({ ...draft, overlayOpacity: v })}
            min={0} max={100} step={5}
            className="mt-3"
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Live Preview</h3>
        <div className="relative rounded-xl overflow-hidden h-64 bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/40" />
          <div className={`absolute inset-0`} style={{ background: `rgba(0,0,0,${draft.overlayOpacity / 100})` }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-2xl font-bold text-white">{draft.title1}</h1>
            <h1 className="text-2xl font-bold text-primary">{draft.title2}</h1>
            <p className="text-white/80 text-sm mt-2 max-w-md">{draft.subtitle}</p>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save size={18} />
        Update Hero Section
      </Button>
    </div>
  );
}
