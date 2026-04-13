import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";

interface CardEditorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (card: { title: string; description: string; image: string; tags?: string[] }) => void;
  title?: string;
  showTags?: boolean;
  initial?: { title: string; description: string; image: string; tags?: string[] };
}

export default function CardEditorModal({ open, onClose, onSave, title = "Add New Card", showTags, initial }: CardEditorModalProps) {
  const [form, setForm] = useState(initial || { title: "", description: "", image: "", tags: [] as string[] });
  const [tagInput, setTagInput] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm({ ...form, image: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (i: number) => {
    setForm({ ...form, tags: (form.tags || []).filter((_, idx) => idx !== i) });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Image</Label>
            <div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center">
              {form.image ? (
                <img src={form.image} alt="" className="w-full h-32 object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus size={24} />
                  <span className="text-sm">Upload image</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 text-sm" />
            </div>
          </div>
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1.5" rows={3} />
          </div>
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

          {/* Live Preview */}
          {form.title && (
            <div className="border rounded-xl overflow-hidden">
              <p className="text-xs font-medium text-muted-foreground px-3 pt-2">Preview</p>
              {form.image && <img src={form.image} alt="" className="w-full h-24 object-cover" />}
              <div className="p-3">
                <h4 className="font-semibold text-sm">{form.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{form.description}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={() => { onSave(form); onClose(); }} className="flex-1" disabled={!form.title}>
              {initial ? "Save Changes" : "Create Card"}
            </Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
