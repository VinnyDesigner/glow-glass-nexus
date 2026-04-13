import { useState } from "react";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Save, Plus, Trash2, Pencil, Bold, Italic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StatEdit {
  target: string;
  suffix: string;
  label: string;
  fontSize?: number;
  fontWeight?: string;
  italic?: boolean;
  textColor?: string;
  bgColor?: string;
}

export default function AboutEditor() {
  const { about, updateAbout } = useContentStore();
  const [draft, setDraft] = useState({ ...about, stats: [...about.stats] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newStat, setNewStat] = useState({ target: "", suffix: "", label: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<StatEdit>({ target: "", suffix: "", label: "" });
  const { toast } = useToast();

  const handleSave = () => {
    updateAbout(draft);
    toast({ title: "About section updated!" });
  };

  const deleteStat = (id: string) => {
    setDraft({ ...draft, stats: draft.stats.filter((s) => s.id !== id) });
  };

  const openEdit = (i: number) => {
    const s = draft.stats[i];
    setEditForm({
      target: s.target,
      suffix: s.suffix || "",
      label: s.label,
      fontSize: (s as any).fontSize || 40,
      fontWeight: (s as any).fontWeight || "bold",
      italic: (s as any).italic || false,
      textColor: (s as any).textColor || "",
      bgColor: (s as any).bgColor || "",
    });
    setEditIndex(i);
  };

  const saveEdit = () => {
    if (editIndex === null) return;
    const updated = [...draft.stats];
    updated[editIndex] = { ...updated[editIndex], ...editForm };
    setDraft({ ...draft, stats: updated });
    setEditIndex(null);
  };

  const weightCycle = () => {
    const map: Record<string, string> = { "300": "normal", normal: "bold", bold: "300" };
    setEditForm((f) => ({ ...f, fontWeight: map[f.fontWeight || "normal"] || "normal" }));
  };
  const weightLabel = editForm.fontWeight === "300" ? "Light" : editForm.fontWeight === "bold" ? "Bold" : "Regular";

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
          {draft.stats.map((stat, i) => (
            <div key={stat.id} className="relative flex items-center justify-between p-3 border border-border rounded-xl group">
              <div>
                <p className="font-bold text-lg">{stat.target}{stat.suffix}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={() => openEdit(i)} className="h-7 w-7 rounded-full shadow-sm hover:scale-110 transition-transform hover:bg-primary/10">
                  <Pencil size={14} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteStat(stat.id)} className="h-7 w-7 text-destructive hover:text-destructive">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save size={18} /> Update About Section
      </Button>

      {/* Add Stat Modal */}
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

      {/* Edit Stat Modal */}
      <Dialog open={editIndex !== null} onOpenChange={() => setEditIndex(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left – Form */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="font-display">Edit Stat Card</DialogTitle>
              </DialogHeader>

              <div>
                <Label>Value</Label>
                <Input value={editForm.target} onChange={(e) => setEditForm({ ...editForm, target: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Suffix</Label>
                <Input value={editForm.suffix} onChange={(e) => setEditForm({ ...editForm, suffix: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Label</Label>
                <Input value={editForm.label} onChange={(e) => setEditForm({ ...editForm, label: e.target.value })} className="mt-1.5" />
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Style Controls</p>

                <div>
                  <Label>Font Size ({editForm.fontSize || 40}px)</Label>
                  <Slider value={[editForm.fontSize || 40]} min={16} max={64} step={1} onValueChange={([v]) => setEditForm({ ...editForm, fontSize: v })} className="mt-1.5" />
                </div>

                <div className="flex items-center gap-2">
                  <Button type="button" variant={editForm.fontWeight === "bold" ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={weightCycle} title={weightLabel}>
                    <Bold size={14} />
                  </Button>
                  <span className="text-xs text-muted-foreground">{weightLabel}</span>
                  <Button type="button" variant={editForm.italic ? "default" : "outline"} size="icon" className="h-8 w-8 ml-2" onClick={() => setEditForm({ ...editForm, italic: !editForm.italic })}>
                    <Italic size={14} />
                  </Button>
                  <span className="text-xs text-muted-foreground">{editForm.italic ? "On" : "Off"}</span>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Text Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <input type="color" value={editForm.textColor || "#6366f1"} onChange={(e) => setEditForm({ ...editForm, textColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                      <span className="text-xs text-muted-foreground">{editForm.textColor || "Default"}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label>Background Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <input type="color" value={editForm.bgColor || "#ffffff"} onChange={(e) => setEditForm({ ...editForm, bgColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                      <span className="text-xs text-muted-foreground">{editForm.bgColor || "Default"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={saveEdit} className="flex-1" disabled={!editForm.target || !editForm.label}>
                  Update Card
                </Button>
                <Button variant="outline" onClick={() => setEditIndex(null)}>Cancel</Button>
              </div>
            </div>

            {/* Right – Live Preview */}
            <div className="bg-muted/30 p-6 flex flex-col items-center justify-center border-l border-border min-h-[400px]">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Live Preview</p>
              <div
                className="w-40 h-40 rounded-2xl flex flex-col items-center justify-center shadow-lg"
                style={{ backgroundColor: editForm.bgColor || "hsl(var(--card))" }}
              >
                <div
                  style={{
                    fontSize: `${editForm.fontSize || 40}px`,
                    fontWeight: editForm.fontWeight || "bold",
                    fontStyle: editForm.italic ? "italic" : "normal",
                    color: editForm.textColor || undefined,
                  }}
                  className="gradient-text leading-tight"
                >
                  {editForm.target || "0"}{editForm.suffix}
                </div>
                <div className="text-muted-foreground text-sm mt-2">{editForm.label || "Label"}</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
