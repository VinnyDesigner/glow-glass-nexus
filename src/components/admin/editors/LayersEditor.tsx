import { useState } from "react";
import { useContentStore, defaultLayers, type LayerCard } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Pencil, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResetConfirmModal from "../ResetConfirmModal";

export default function LayersEditor() {
  const { layers, updateLayers } = useContentStore();
  const [draft, setDraft] = useState({ ...layers, cards: [...layers.cards] });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<LayerCard>({ id: "", title: "", image: "", link: "" });
  const [resetOpen, setResetOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const { toast } = useToast();

  const handleSave = () => {
    updateLayers(draft);
    toast({ title: "Layers section updated!" });
  };

  const handleReset = () => {
    const resetData = { ...defaultLayers, cards: [...defaultLayers.cards] };
    setDraft(resetData);
    updateLayers(defaultLayers);
    toast({ title: "Page reset to default successfully" });
  };

  const deleteCard = (id: string) => {
    setDraft({ ...draft, cards: draft.cards.filter((c) => c.id !== id) });
  };

  const openAdd = () => {
    setEditForm({ id: "", title: "", image: "", link: "" });
    setModalMode("add");
    setEditIndex(-1);
  };

  const openEdit = (i: number) => {
    setEditForm({ ...draft.cards[i] });
    setModalMode("edit");
    setEditIndex(i);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditForm((f) => ({ ...f, image: (ev.target?.result as string) || "" }));
    };
    reader.readAsDataURL(file);
  };

  const saveCard = () => {
    if (modalMode === "add") {
      setDraft({
        ...draft,
        cards: [...draft.cards, { ...editForm, id: `l${Date.now()}` }],
      });
    } else if (editIndex !== null && editIndex >= 0) {
      const updated = [...draft.cards];
      updated[editIndex] = { ...updated[editIndex], ...editForm };
      setDraft({ ...draft, cards: updated });
    }
    setEditIndex(null);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Section Header</h3>
        <div>
          <Label>Heading</Label>
          <Input
            value={draft.heading}
            onChange={(e) => setDraft({ ...draft, heading: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="mt-1.5"
            rows={2}
          />
        </div>
      </div>

      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">
            Layer Cards ({draft.cards.length})
          </h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={openAdd}>
            <Plus size={14} /> Add Layer
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {draft.cards.map((card, i) => (
            <div
              key={card.id}
              className="flex items-center gap-3 p-3 border border-border rounded-xl"
            >
              {card.image && (
                <img src={card.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{card.title}</p>
                <p className="text-xs text-muted-foreground truncate">{card.link || "No link"}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => openEdit(i)}
                className="shrink-0 h-8 w-8 rounded-full"
              >
                <Pencil size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteCard(card.id)}
                className="shrink-0 text-destructive hover:text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2" size="lg">
          <Save size={18} /> Update Layers Section
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
          onClick={() => setResetOpen(true)}
        >
          <RotateCcw size={18} /> Reset Changes
        </Button>
      </div>

      {/* Add/Edit Layer Modal */}
      <Dialog open={editIndex !== null} onOpenChange={() => setEditIndex(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {modalMode === "add" ? "Add Layer Card" : "Edit Layer Card"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="mt-1.5"
                placeholder="ADDRESSES"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="mt-1.5"
                placeholder="https://..."
              />
              <div className="mt-2">
                <Label className="text-xs text-muted-foreground">Or upload an image</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
              </div>
              {editForm.image && (
                <img
                  src={editForm.image}
                  alt="preview"
                  className="mt-3 w-full h-32 object-cover rounded-lg border border-border"
                />
              )}
            </div>
            <div>
              <Label>Link (optional)</Label>
              <Input
                value={editForm.link || ""}
                onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                className="mt-1.5"
                placeholder="https://..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={saveCard}
                className="flex-1"
                disabled={!editForm.title || !editForm.image}
              >
                {modalMode === "add" ? "Add Card" : "Update Card"}
              </Button>
              <Button variant="outline" onClick={() => setEditIndex(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ResetConfirmModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}
