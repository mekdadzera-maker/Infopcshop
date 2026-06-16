import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Upload, Loader2, X, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CATEGORIES = ['Laptops', 'Desktops', 'Components', 'Peripherals', 'Networking', 'Storage', 'Accessories', 'Software', 'Printers', 'Surveillance'];

const defaultForm = {
  name: '', description: '', short_description: '', price: '', original_price: '',
  category: '', brand: '', image_url: '', gallery_urls: [], in_stock: true, featured: false,
  specs: [],
};

export default function ProductFormDialog({ open, onOpenChange, product }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(defaultForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        ...defaultForm,
        ...product,
        price: product.price?.toString() || '',
        original_price: product.original_price?.toString() || '',
        gallery_urls: product.gallery_urls || [],
        specs: product.specs || [],
      });
    } else {
      setForm(defaultForm);
    }
  }, [product, open]);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    if (field === 'image_url') {
      handleChange('image_url', file_url);
    } else {
      setForm(prev => ({ ...prev, gallery_urls: [...prev.gallery_urls, file_url] }));
    }
    setUploading(false);
  };

  const removeGalleryImage = (index) => {
    setForm(prev => ({ ...prev, gallery_urls: prev.gallery_urls.filter((_, i) => i !== index) }));
  };

  const addSpec = () => {
    setForm(prev => ({ ...prev, specs: [...prev.specs, { label: '', value: '' }] }));
  };

  const updateSpec = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      specs: prev.specs.map((s, i) => i === index ? { ...s, [field]: value } : s),
    }));
  };

  const removeSpec = (index) => {
    setForm(prev => ({ ...prev, specs: prev.specs.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast({ title: 'Erreur', description: 'Nom, prix et catégorie sont obligatoires.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const data = {
      ...form,
      price: parseFloat(form.price) || 0,
      original_price: form.original_price ? parseFloat(form.original_price) : undefined,
      specs: form.specs.filter(s => s.label && s.value),
    };

    if (product) {
      await base44.entities.Product.update(product.id, data);
      toast({ title: 'Produit mis à jour' });
    } else {
      await base44.entities.Product.create(data);
      toast({ title: 'Produit créé' });
    }
    queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    queryClient.invalidateQueries({ queryKey: ['products'] });
    queryClient.invalidateQueries({ queryKey: ['featured-products'] });
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Modifier le produit' : 'Nouveau produit'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Nom *</Label>
              <Input value={form.name} onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div>
              <Label>Marque</Label>
              <Input value={form.brand} onChange={e => handleChange('brand', e.target.value)} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Catégorie *</Label>
              <Select value={form.category} onValueChange={v => handleChange('category', v)}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Prix (DA) *</Label>
                <Input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} />
              </div>
              <div>
                <Label>Ancien prix</Label>
                <Input type="number" value={form.original_price} onChange={e => handleChange('original_price', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <Label>Description courte</Label>
            <Input value={form.short_description} onChange={e => handleChange('short_description', e.target.value)} />
          </div>
          <div>
            <Label>Description complète</Label>
            <Textarea value={form.description} onChange={e => handleChange('description', e.target.value)} rows={3} />
          </div>

          {/* Image */}
          <div>
            <Label>Image principale</Label>
            <div className="flex items-center gap-3 mt-1">
              {form.image_url && (
                <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition-colors text-sm">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? 'Upload...' : 'Choisir une image'}
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'image_url')} />
              </label>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <Label>Galerie (images supplémentaires)</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {form.gallery_urls.map((url, i) => (
                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-bl-lg p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="w-16 h-16 border border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <Plus className="w-5 h-5 text-muted-foreground" />
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'gallery')} />
              </label>
            </div>
          </div>

          {/* Specs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Caractéristiques</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSpec} className="gap-1">
                <Plus className="w-3 h-3" /> Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {form.specs.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <Input placeholder="Label" value={spec.label} onChange={e => updateSpec(i, 'label', e.target.value)} className="flex-1" />
                  <Input placeholder="Valeur" value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)} className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSpec(i)} className="shrink-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={form.in_stock} onCheckedChange={v => handleChange('in_stock', v)} />
              <Label>En stock</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.featured} onCheckedChange={v => handleChange('featured', v)} />
              <Label>Produit vedette</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={saving} className="gap-2">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {product ? 'Enregistrer' : 'Créer le produit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}