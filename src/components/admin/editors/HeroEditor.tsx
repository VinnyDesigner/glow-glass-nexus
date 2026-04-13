import { useState } from "react";
import { useContentStore, HeroTextStyle } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Save, ImagePlus, Bold, Italic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBgDefault from "@/assets/hero-bg.png";

function TextStyleControls({ label, style, onChange }: { label: string; style: HeroTextStyle; onChange: (s: HeroTextStyle) => void }) {
  const weightCycle = () => {
    const map: Record<string, string> = { "300": "normal", normal: "bold", bold: "300" };
    onChange({ ...style, fontWeight: map[style.fontWeight || "normal"] || "normal" });
  };
  const weightLabel = style.fontWeight === "300" ? "Light" : style.fontWeight === "bold" ? "Bold" : "Regular";

  return (
    <div className="space-y-3 p-4 border border-border rounded-xl">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <div>
        <Label>Font Size ({style.fontSize || 16}px)</Label>
        <Slider value={[style.fontSize || 16]} min={12} max={96} step={1} onValueChange={([v]) => onChange({ ...style, fontSize: v })} className="mt-1.5" />
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant={style.fontWeight === "bold" ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={weightCycle} title={weightLabel}>
          <Bold size={14} />
        </Button>
        <span className="text-xs text-muted-foreground">{weightLabel}</span>
        <Button type="button" variant={style.italic ? "default" : "outline"} size="icon" className="h-8 w-8 ml-2" onClick={() => onChange({ ...style, italic: !style.italic })}>
          <Italic size={14} />
        </Button>
        <span className="text-xs text-muted-foreground">{style.italic ? "On" : "Off"}</span>
      </div>
      <div>
        <Label>Text Color</Label>
        <div className="flex items-center gap-2 mt-1">
          <input type="color" value={style.color || "#ffffff"} onChange={(e) => onChange({ ...style, color: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
          <span className="text-xs text-muted-foreground">{style.color || "#ffffff"}</span>
          <Button type="button" variant="ghost" size="sm" className="text-xs h-6 ml-auto" onClick={() => onChange({ ...style, color: "#ffffff" })}>White</Button>
          <Button type="button" variant="ghost" size="sm" className="text-xs h-6 text-[#FF3B30]" onClick={() => onChange({ ...style, color: "#FF3B30" })}>Red</Button>
        </div>
      </div>
    </div>
  );
}

export default function HeroEditor() {
  const { hero, updateHero } = useContentStore();
  const [draft, setDraft] = useState({
    ...hero,
    title1Style: hero.title1Style || { fontSize: 72, fontWeight: "bold", italic: false, color: "#ffffff" },
    title2Style: hero.title2Style || { fontSize: 72, fontWeight: "bold", italic: false, color: "#FF3B30" },
    subtitleStyle: hero.subtitleStyle || { fontSize: 20, fontWeight: "normal", italic: false, color: "#ffffffcc" },
  });
  const { toast } = useToast();

  const handleSave = () => {
    updateHero(draft);
    toast({ title: "Hero section updated!", description: "Changes are now live on the landing page." });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setDraft((d) => ({ ...d, backgroundImage: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const bgImage = draft.backgroundImage || heroBgDefault;

  return (
    <div className="max-w-4xl">
      {/* Live Preview - Sticky */}
      <div className="neu-card p-6 space-y-4 sticky top-0 z-20 bg-card shadow-md">
        <h3 className="font-display text-lg font-semibold text-foreground">Live Preview</h3>
        <div className="relative rounded-xl overflow-hidden" style={{ height: 320 }}>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${draft.overlayOpacity / 100})` }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 transition-all duration-300">
            <h1
              style={{
                fontSize: `${Math.min(draft.title1Style.fontSize || 72, 48)}px`,
                fontWeight: draft.title1Style.fontWeight || "bold",
                fontStyle: draft.title1Style.italic ? "italic" : "normal",
                color: draft.title1Style.color || "#ffffff",
              }}
              className="font-display leading-tight"
            >
              {draft.title1}
            </h1>
            <h1
              style={{
                fontSize: `${Math.min(draft.title2Style.fontSize || 72, 48)}px`,
                fontWeight: draft.title2Style.fontWeight || "bold",
                fontStyle: draft.title2Style.italic ? "italic" : "normal",
                color: draft.title2Style.color || "#FF3B30",
              }}
              className="font-display leading-tight"
            >
              {draft.title2}
            </h1>
            <p
              className="max-w-md mt-3 leading-relaxed"
              style={{
                fontSize: `${Math.min(draft.subtitleStyle.fontSize || 20, 16)}px`,
                fontWeight: draft.subtitleStyle.fontWeight || "normal",
                fontStyle: draft.subtitleStyle.italic ? "italic" : "normal",
                color: draft.subtitleStyle.color || "#ffffffcc",
              }}
            >
              {draft.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Background Image</h3>
        <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
          {bgImage && <img src={bgImage} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />}
          <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-primary hover:underline">
            <ImagePlus size={16} />
            {draft.backgroundImage ? "Replace Image" : "Upload Hero Image"}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
        <div>
          <Label>Overlay Opacity: {draft.overlayOpacity}%</Label>
          <Slider value={[draft.overlayOpacity]} onValueChange={([v]) => setDraft({ ...draft, overlayOpacity: v })} min={0} max={100} step={5} className="mt-3" />
        </div>
      </div>

      {/* Hero Text */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Hero Text</h3>
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

      {/* Text Style Controls */}
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Text Styling</h3>
        <TextStyleControls label="Title Line 1" style={draft.title1Style} onChange={(s) => setDraft({ ...draft, title1Style: s })} />
        <TextStyleControls label="Title Line 2" style={draft.title2Style} onChange={(s) => setDraft({ ...draft, title2Style: s })} />
        <TextStyleControls label="Subtitle" style={draft.subtitleStyle} onChange={(s) => setDraft({ ...draft, subtitleStyle: s })} />
      </div>

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save size={18} /> Update Hero Section
      </Button>
    </div>
  );
}
