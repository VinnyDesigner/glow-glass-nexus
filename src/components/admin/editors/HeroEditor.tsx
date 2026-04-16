import { useState } from "react";
import { useContentStore, HeroTextStyle, defaultHero } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Save, ImagePlus, Bold, Italic, RotateCcw, X, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";
import heroSlide4 from "@/assets/hero-slide-4.png";
import heroSlide5 from "@/assets/hero-slide-5.png";
import ResetConfirmModal from "../ResetConfirmModal";

const DEFAULT_SLIDES = [heroSlide1, heroSlide2, heroSlide3, heroSlide4, heroSlide5];

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
    heroImages: hero.heroImages && hero.heroImages.length > 0 ? hero.heroImages : [],
    title1Style: hero.title1Style || { fontSize: 72, fontWeight: "bold", italic: false, color: "#ffffff" },
    title2Style: hero.title2Style || { fontSize: 72, fontWeight: "bold", italic: false, color: "#FF3B30" },
    subtitleStyle: hero.subtitleStyle || { fontSize: 20, fontWeight: "normal", italic: false, color: "#ffffffcc" },
  });
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const currentSlides = draft.heroImages.length > 0 ? draft.heroImages : DEFAULT_SLIDES;

  const handleSave = () => {
    updateHero(draft);
    toast({ title: "Hero section updated!", description: "Changes are now live on the landing page." });
  };

  const handleReset = () => {
    const resetData = {
      ...defaultHero,
      heroImages: [] as string[],
      title1Style: { fontSize: 72, fontWeight: "bold", italic: false, color: "#ffffff" },
      title2Style: { fontSize: 72, fontWeight: "bold", italic: false, color: "#FF3B30" },
      subtitleStyle: { fontSize: 20, fontWeight: "normal", italic: false, color: "#ffffffcc" },
    };
    setDraft(resetData);
    updateHero(defaultHero);
    toast({ title: "Page reset to default successfully" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = 5 - draft.heroImages.length;
    const toAdd = files.slice(0, remaining);
    
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDraft((d) => ({
          ...d,
          heroImages: [...d.heroImages, ev.target?.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setDraft((d) => {
      const images = [...d.heroImages];
      images[index] = DEFAULT_SLIDES[index];
      // If all images match defaults, clear custom array
      const allDefault = images.every((img, i) => img === DEFAULT_SLIDES[i]);
      return { ...d, heroImages: allDefault ? [] : images };
    });
  };

  return (
    <div className="max-w-4xl">
      {/* Sticky Live Preview */}
      <div className="sticky top-0 z-20 pb-6 backdrop-blur-xl bg-background/80 -mx-6 px-6 pt-6 rounded-b-2xl">
        <div className="neu-card p-6 space-y-4 shadow-lg">
          <h3 className="font-display text-lg font-semibold text-foreground">Live Preview</h3>
          <div className="relative rounded-xl overflow-hidden" style={{ height: 320 }}>
            <img src={currentSlides[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${draft.overlayOpacity / 100})` }} />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <div className="backdrop-blur-md bg-white/[0.06] border border-white/[0.12] rounded-xl px-6 py-8">
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
            {/* Preview dots */}
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {currentSlides.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 0 ? "hsl(348, 83%, 40%)" : "rgba(255,255,255,0.4)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-2">
        {/* Carousel Images */}
        <div className="neu-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Carousel Images</h3>
            <span className="text-sm text-muted-foreground">{draft.heroImages.length}/5 custom</span>
          </div>
          <p className="text-sm text-muted-foreground">Upload up to 5 images for the hero carousel. When empty, default Bahrain images are used.</p>
          
          {/* Image grid - always show 5 slots */}
          <div className="grid grid-cols-5 gap-3">
            {currentSlides.map((img, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-border aspect-[4/3]">
                <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <label className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex flex-col items-center gap-1">
                    <div className="bg-white/90 rounded-full p-2">
                      <ImagePlus size={16} className="text-foreground" />
                    </div>
                    <span className="text-[10px] text-white font-medium">Replace</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setDraft((d) => {
                            const images = d.heroImages.length > 0 ? [...d.heroImages] : [...DEFAULT_SLIDES];
                            images[i] = ev.target?.result as string;
                            return { ...d, heroImages: images };
                          });
                        };
                        reader.readAsDataURL(file);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">{i + 1}</span>
                {draft.heroImages.length > 0 && draft.heroImages[i] && (
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-white rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
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

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} className="gap-2" size="lg">
            <Save size={18} /> Update Hero Section
          </Button>
          <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors" onClick={() => setResetOpen(true)}>
            <RotateCcw size={18} /> Reset Changes
          </Button>
        </div>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={handleReset} />
    </div>
  );
}
