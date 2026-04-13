import { useState } from "react";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AboutEditor() {
  const { about, updateAbout } = useContentStore();
  const [draft, setDraft] = useState({ ...about, stats: [...about.stats] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newStat, setNewStat] = useState({ target: "", suffix: "", label: "" });
  const { toast } = useToast();

  const handleSave = () => {
    updateAbout(draft);
    toast({ title: "About section updated!" });
  };

  const deleteStat = (id: string) => {
    setDraft({ ...draft, stats: draft.stats.filter((s) => s.id !== id) });
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="neu-card p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold">Section Content</h3>
        <div>
          <Label>Heading</Label>
          <Input value={draft.heading} onChange={(e) => setDraft({ ...draft, heading: e.target.value })} className="mt-1.5" />
        </div>
        <div>
          <Label>Description (Paragraph 1)</Label>
          <Textarea value={draft.description1} onChange={(e) => setDraft({ ...draft, description1: e.target.value })} className="mt-1.5" rows={3} />
        </div>
        <div>
          <Label>Description (Paragraph 2)</Label>
          <Textarea value={draft.description2} onChange={(e) => setDraft({ ...draft, description2: e.target.value })} className="mt-1.5" rows={3} />
        </div>
      </div>

      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Stats Cards ({draft.stats.length})</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Stat Card
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {draft.stats.map((stat) => (
            <div key={stat.id} className="flex items-center justify-between p-3 border border-border rounded-xl">
              <div>
                <p className="font-bold text-lg">{stat.target}{stat.suffix}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteStat(stat.id)} className="text-destructive hover:text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save size={18} /> Update About Section
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Add Stat Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Value (e.g., 50)</Label>
              <Input value={newStat.target} onChange={(e) => setNewStat({ ...newStat, target: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Suffix (e.g., +, /7, .9%)</Label>
              <Input value={newStat.suffix} onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Label</Label>
              <Input value={newStat.label} onChange={(e) => setNewStat({ ...newStat, label: e.target.value })} className="mt-1.5" />
            </div>
            <Button className="w-full" disabled={!newStat.target || !newStat.label} onClick={() => {
              setDraft({ ...draft, stats: [...draft.stats, { ...newStat, id: `s${Date.now()}` }] });
              setNewStat({ target: "", suffix: "", label: "" });
              setModalOpen(false);
            }}>
              Create Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
