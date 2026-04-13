import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ImagePlus, Bold, Italic } from "lucide-react";

interface CardData {
  title: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
  fontSize?: number;
  fontWeight?: string;
  italic?: boolean;
  textColor?: string;
  bgColor?: string;
}

interface CardEditorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (card: CardData) => void;
  title?: string;
  showTags?: boolean;
  initial?: CardData;
}

export default function CardEditorModal({ open, onClose, onSave, title = "Add New Card", showTags, initial }: CardEditorModalProps) {
  const defaults: CardData = { title: "", description: "", image: "", tags: [], fontSize: 16, fontWeight: "normal", italic: false, textColor: "#1a1a2e", bgColor: "#ffffff" };
  const [form, setForm] = useState<CardData>({ ...defaults, ...initial });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (open) setForm({ ...defaults, ...initial });
  }, [open, initial]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm((f) => ({ ...f, tags: [...(f.tags || []), tagInput.trim()] }));
      setTagInput("");
    }
  };

  const removeTag = (i: number) => {
    setForm((f) => ({ ...f, tags: (f.tags || []).filter((_, idx) => idx !== i) }));
  };

  const weightCycle = () => {
    const map: Record<string, string> = { "300": "normal", normal: "bold", bold: "300" };
    setForm((f) => ({ ...f, fontWeight: map[f.fontWeight || "normal"] || "normal" }));
  };

  const weightLabel = form.fontWeight === "300" ? "Light" : form.fontWeight === "bold" ? "Bold" : "Regular";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* LEFT – Form */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="font-display">{title}</DialogTitle>
            </DialogHeader>

            {/* Image */}
            <div>
              <Label>Image</Label>
              <div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center">
                {form.image ? (
                  <img src={form.image} alt="" className="w-full h-28 object-cover rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus size={24} />
                    <span className="text-sm">Upload image</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 text-sm" />
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1.5" rows={3} />
            </div>
            <div>
              <Label>Link (URL)</Label>
              <Input value={form.link || ""} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://example.com" className="mt-1.5" />
            </div>
            <div className="space-y-3 border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Style Controls</p>

              <div>
                <Label>Font Size ({form.fontSize}px)</Label>
                <Slider value={[form.fontSize || 16]} min={12} max={32} step={1} onValueChange={([v]) => setForm({ ...form, fontSize: v })} className="mt-1.5" />
              </div>

              <div className="flex items-center gap-2">
                <Button type="button" variant={form.fontWeight === "bold" ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={weightCycle} title={weightLabel}>
                  <Bold size={14} />
                </Button>
                <span className="text-xs text-muted-foreground">{weightLabel}</span>

                <Button type="button" variant={form.italic ? "default" : "outline"} size="icon" className="h-8 w-8 ml-2" onClick={() => setForm({ ...form, italic: !form.italic })}>
                  <Italic size={14} />
                </Button>
                <span className="text-xs text-muted-foreground">{form.italic ? "On" : "Off"}</span>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Text Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="color" value={form.textColor || "#1a1a2e"} onChange={(e) => setForm({ ...form, textColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                    <span className="text-xs text-muted-foreground">{form.textColor}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="color" value={form.bgColor || "#ffffff"} onChange={(e) => setForm({ ...form, bgColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                    <span className="text-xs text-muted-foreground">{form.bgColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {showTags && (
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add tag" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                  <Button variant="outline" size="sm" onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(form.tags || []).map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full border border-primary/40 text-primary bg-primary/5 flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(i)} className="hover:text-destructive">×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button onClick={() => { onSave(form); onClose(); }} className="flex-1" disabled={!form.title}>
                {initial ? "Save Changes" : "Create Card"}
              </Button>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </div>
          </div>

          {/* RIGHT – Live Preview */}
          <div className="bg-muted/30 p-6 flex flex-col items-center justify-center border-l border-border min-h-[400px]">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Live Preview</p>
            <div className="w-full max-w-xs rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: form.bgColor || "#ffffff" }}>
              {form.image && (
                <div className="h-40 overflow-hidden">
                  <img src={form.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5" style={{ color: form.textColor || "#1a1a2e" }}>
                <h4 style={{ fontSize: `${form.fontSize || 16}px`, fontWeight: form.fontWeight || "normal", fontStyle: form.italic ? "italic" : "normal" }}>
                  {form.title || "Card Title"}
                </h4>
                <p className="mt-2 text-sm opacity-80 leading-relaxed" style={{ fontStyle: form.italic ? "italic" : "normal" }}>
                  {form.description || "Card description will appear here..."}
                </p>
                {showTags && (form.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(form.tags || []).map((tag, i) => (
                      <span key={i} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/40 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
