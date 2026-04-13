import { useState } from "react";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DataServicesEditor() {
  const { dataServices, updateDataServices } = useContentStore();
  const [draft, setDraft] = useState({ ...dataServices, entities: [...dataServices.entities] });
  const [modalOpen, setModalOpen] = useState(false);
  const [newEntity, setNewEntity] = useState({ name: "", logo: "", link: "" });
  const { toast } = useToast();

  const handleSave = () => {
    updateDataServices(draft);
    toast({ title: "Data Services section updated!" });
  };

  const deleteEntity = (id: string) => {
    setDraft({ ...draft, entities: draft.entities.filter((e) => e.id !== id) });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewEntity({ ...newEntity, logo: ev.target?.result as string });
    reader.readAsDataURL(file);
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
          <Input value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="mt-1.5" />
        </div>
      </div>

      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Entity Logos ({draft.entities.length})</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Add Logo
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {draft.entities.map((entity) => (
            <div key={entity.id} className="relative group neu-card aspect-square flex items-center justify-center p-4">
              <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteEntity(entity.id)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive h-7 w-7"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save size={18} /> Update Data Services
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Add Logo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Entity Name</Label>
              <Input value={newEntity.name} onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Logo</Label>
              <div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center">
                {newEntity.logo ? (
                  <img src={newEntity.logo} alt="" className="w-20 h-20 mx-auto object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus size={24} />
                    <span className="text-sm">Upload logo</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="mt-2 text-sm" />
              </div>
            </div>
            <div>
              <Label>Link URL</Label>
              <Input value={newEntity.link} onChange={(e) => setNewEntity({ ...newEntity, link: e.target.value })} className="mt-1.5" placeholder="https://..." />
            </div>
            {newEntity.logo && (
              <div className="neu-card aspect-square max-w-[120px] mx-auto flex items-center justify-center p-4">
                <img src={newEntity.logo} alt="" className="w-full h-full object-contain" />
              </div>
            )}
            <Button className="w-full" disabled={!newEntity.name || !newEntity.logo} onClick={() => {
              setDraft({ ...draft, entities: [...draft.entities, { ...newEntity, id: `d${Date.now()}` }] });
              setNewEntity({ name: "", logo: "", link: "" });
              setModalOpen(false);
            }}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
