import { useState } from "react";
import { useContentStore, defaultMapView } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ImagePlus, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResetConfirmModal from "../ResetConfirmModal";

export default function MapViewEditor() {
  const { mapView, updateMapView } = useContentStore();
  const [draft, setDraft] = useState(mapView);
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => setDraft({ ...draft, previewImage: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateMapView(draft);
    toast({ title: "Map View section updated" });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="p-6 bg-card rounded-2xl border border-border space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Content</h3>
        <div>
          <Label>Heading</Label>
          <Input value={draft.heading} onChange={(e) => setDraft({ ...draft, heading: e.target.value })} className="mt-1.5" />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} className="mt-1.5" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>CTA Label</Label>
            <Input value={draft.ctaLabel} onChange={(e) => setDraft({ ...draft, ctaLabel: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>CTA Link (route or URL)</Label>
            <Input value={draft.ctaHref} onChange={(e) => setDraft({ ...draft, ctaHref: e.target.value })} className="mt-1.5" placeholder="/map or https://..." />
          </div>
        </div>
        <div>
          <Label>Preview Image</Label>
          <div className="mt-2 relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border group">
            <img src={draft.previewImage} alt="" className="w-full h-full object-cover" />
            <label className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center cursor-pointer transition-colors">
              <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100">
                <ImagePlus size={20} />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])} />
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save size={18} /> Update Map Section
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset
        </Button>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={() => { setDraft(defaultMapView); updateMapView(defaultMapView); toast({ title: "Map View reset to default" }); }} />
    </div>
  );
}
