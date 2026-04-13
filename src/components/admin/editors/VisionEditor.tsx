import { useState } from "react";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CardEditorModal from "./CardEditorModal";

export default function VisionEditor() {
  const { vision, updateVision } = useContentStore();
  const [draft, setDraft] = useState({ ...vision, cards: [...vision.cards] });
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    updateVision(draft);
    toast({ title: "Vision section updated!" });
  };

  const deleteCard = (id: string) => {
    setDraft({ ...draft, cards: draft.cards.filter((c) => c.id !== id) });
  };

  const openEdit = (i: number) => {
    setEditIndex(i);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditIndex(null);
    setModalOpen(true);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Section Header</h3>
        <div>
          <Label>Heading</Label>
          <Input value={draft.heading} onChange={(e) => setDraft({ ...draft, heading: e.target.value })} className="mt-1.5" />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="mt-1.5" rows={3} />
        </div>
      </div>

      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Cards ({draft.cards.length})</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={openAdd}>
            <Plus size={14} /> Add New Card
          </Button>
        </div>

        <div className="space-y-3">
          {draft.cards.map((card, i) => (
            <div key={card.id} className="flex items-center gap-4 p-3 border border-border rounded-xl relative group">
              {card.image && <img src={card.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{card.title}</p>
                <p className="text-xs text-muted-foreground truncate">{card.description}</p>
              </div>
              <Button variant="outline" size="icon" onClick={() => openEdit(i)} className="shrink-0 h-8 w-8 rounded-full shadow-sm hover:scale-110 transition-transform">
                <Pencil size={14} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteCard(card.id)} className="shrink-0 text-destructive hover:text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save size={18} /> Update Vision Section
      </Button>

      <CardEditorModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditIndex(null); }}
        initial={editIndex !== null ? draft.cards[editIndex] : undefined}
        title={editIndex !== null ? "Edit Vision Card" : "Add New Card"}
        onSave={(card) => {
          if (editIndex !== null) {
            const updated = [...draft.cards];
            updated[editIndex] = { ...updated[editIndex], ...card };
            setDraft({ ...draft, cards: updated });
          } else {
            setDraft({ ...draft, cards: [...draft.cards, { ...card, id: `v${Date.now()}` }] });
          }
        }}
      />
    </div>
  );
}
