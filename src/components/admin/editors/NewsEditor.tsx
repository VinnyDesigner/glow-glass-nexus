import { useState } from "react";
import { useContentStore, NewsItem, defaultNews } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, ImagePlus, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResetConfirmModal from "../ResetConfirmModal";

export default function NewsEditor() {
  const { news, updateNews } = useContentStore();
  const [draft, setDraft] = useState(news);
  const [resetOpen, setResetOpen] = useState(false);
  const { toast } = useToast();

  const updateItem = (id: string, patch: Partial<NewsItem>) => {
    setDraft({ ...draft, items: draft.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) });
  };

  const addItem = () => {
    setDraft({
      ...draft,
      items: [
        ...draft.items,
        { id: `n${Date.now()}`, title: "New article", excerpt: "Short summary...", date: new Date().toLocaleDateString(), image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "#" },
      ],
    });
  };

  const removeItem = (id: string) => setDraft({ ...draft, items: draft.items.filter((i) => i.id !== id) });

  const handleImage = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => updateItem(id, { image: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateNews(draft);
    toast({ title: "News updated", description: "Changes are now live on the landing page." });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="neu-card p-6 space-y-4 bg-card rounded-2xl border border-border">
        <h3 className="font-display text-lg font-semibold text-foreground">Section Header</h3>
        <div>
          <Label>Heading</Label>
          <Input value={draft.heading} onChange={(e) => setDraft({ ...draft, heading: e.target.value })} className="mt-1.5" />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={2} className="mt-1.5" />
        </div>
      </div>

      <div className="space-y-4">
        {draft.items.map((item) => (
          <div key={item.id} className="p-5 bg-card rounded-2xl border border-border space-y-3">
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-border shrink-0 group">
                <img src={item.image} alt="" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center cursor-pointer transition-colors">
                  <ImagePlus size={18} className="text-white opacity-0 group-hover:opacity-100" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(item.id, e.target.files[0])} />
                </label>
              </div>
              <div className="flex-1 space-y-2">
                <Input value={item.title} onChange={(e) => updateItem(item.id, { title: e.target.value })} placeholder="Title" />
                <Textarea value={item.excerpt} onChange={(e) => updateItem(item.id, { excerpt: e.target.value })} placeholder="Excerpt" rows={2} />
                <div className="grid grid-cols-2 gap-2">
                  <Input value={item.date} onChange={(e) => updateItem(item.id, { date: e.target.value })} placeholder="Date" />
                  <Input value={item.link || ""} onChange={(e) => updateItem(item.id, { link: e.target.value })} placeholder="Link (https://...)" />
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addItem} className="gap-2">
          <Plus size={16} /> Add News Item
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save size={18} /> Update News Section
        </Button>
        <Button variant="outline" size="lg" className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive" onClick={() => setResetOpen(true)}>
          <RotateCcw size={18} /> Reset
        </Button>
      </div>

      <ResetConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={() => { setDraft(defaultNews); updateNews(defaultNews); toast({ title: "News reset to default" }); }} />
    </div>
  );
}
