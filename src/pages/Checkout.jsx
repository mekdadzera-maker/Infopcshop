import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cartStore.jsx';
import { WILAYAS, getShippingFee } from '@/lib/wilayas';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Truck, Building2, Banknote, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    wilaya: '',
    address: '',
    shipping_method: 'stop_desk',
    notes: '',
  });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Panier vide</h1>
        <p className="text-muted-foreground mb-6">Ajoutez des produits avant de passer commande.</p>
        <Link to="/products"><Button>Voir les produits</Button></Link>
      </div>
    );
  }

  const shippingFee = form.wilaya ? getShippingFee(form.wilaya, form.shipping_method) : 0;
  const total = subtotal + shippingFee;

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer_name || !form.customer_phone || !form.wilaya) {
      toast({ title: 'Erreur', description: 'Veuillez remplir tous les champs obligatoires.', variant: 'destructive' });
      return;
    }
    if (form.shipping_method === 'home_delivery' && !form.address) {
      toast({ title: 'Erreur', description: 'Veuillez saisir votre adresse pour la livraison à domicile.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const order = await base44.entities.Order.create({
      ...form,
      shipping_fee: shippingFee,
      items: items.map(i => ({
        product_id: i.product_id,
        product_name: i.product_name,
        product_image: i.product_image,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal,
      total,
      status: 'pending_confirmation',
    });
    clearCart();
    navigate(`/order-success/${order.id}`);
    setLoading(false);
  };

  const selectedWilayaName = WILAYAS.find(w => w.code === form.wilaya)?.name || '';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="w-4 h-4" /> Retour au panier
      </Link>

      <h1 className="font-display text-3xl font-bold mb-8">Commande</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Customer info */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-heading font-semibold text-lg mb-4">Informations client</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nom complet *</Label>
                  <Input value={form.customer_name} onChange={e => handleChange('customer_name', e.target.value)} placeholder="Votre nom" />
                </div>
                <div>
                  <Label>Téléphone *</Label>
                  <Input value={form.customer_phone} onChange={e => handleChange('customer_phone', e.target.value)} placeholder="07XX XX XX XX" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Email (optionnel)</Label>
                  <Input value={form.customer_email} onChange={e => handleChange('customer_email', e.target.value)} placeholder="votre@email.com" />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-heading font-semibold text-lg mb-4">Livraison</h2>
              <div className="space-y-4">
                <div>
                  <Label>Wilaya *</Label>
                  <Select value={form.wilaya} onValueChange={v => handleChange('wilaya', v)}>
                    <SelectTrigger><SelectValue placeholder="Choisir votre wilaya" /></SelectTrigger>
                    <SelectContent>
                      {WILAYAS.map(w => (
                        <SelectItem key={w.code} value={w.code}>{w.code} - {w.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <RadioGroup value={form.shipping_method} onValueChange={v => handleChange('shipping_method', v)} className="grid sm:grid-cols-2 gap-3">
                  <Label
                    htmlFor="stop_desk"
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      form.shipping_method === 'stop_desk' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value="stop_desk" id="stop_desk" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">Stop-Desk / Bureau</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Récupérer au bureau de livraison</p>
                      {form.wilaya && (
                        <p className="text-sm font-semibold text-primary mt-1">{getShippingFee(form.wilaya, 'stop_desk').toLocaleString('fr-DZ')} DA</p>
                      )}
                    </div>
                  </Label>
                  <Label
                    htmlFor="home_delivery"
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      form.shipping_method === 'home_delivery' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value="home_delivery" id="home_delivery" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">Livraison à domicile</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Livré directement chez vous</p>
                      {form.wilaya && (
                        <p className="text-sm font-semibold text-primary mt-1">{getShippingFee(form.wilaya, 'home_delivery').toLocaleString('fr-DZ')} DA</p>
                      )}
                    </div>
                  </Label>
                </RadioGroup>

                {form.shipping_method === 'home_delivery' && (
                  <div>
                    <Label>Adresse de livraison *</Label>
                    <Textarea value={form.address} onChange={e => handleChange('address', e.target.value)} placeholder="Adresse complète" />
                  </div>
                )}

                <div>
                  <Label>Notes (optionnel)</Label>
                  <Textarea value={form.notes} onChange={e => handleChange('notes', e.target.value)} placeholder="Instructions spéciales..." rows={2} />
                </div>
              </div>
            </section>

            {/* Payment info */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-heading font-semibold text-lg mb-3">Paiement</h2>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-accent border border-primary/20">
                <Banknote className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm">Paiement à la livraison (COD)</p>
                  <p className="text-xs text-muted-foreground">الدفع عند الاستلام — Vous payez à la réception de votre commande</p>
                </div>
              </div>
            </section>
          </div>

          {/* Order summary */}
          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
            <h2 className="font-heading font-semibold mb-4">Résumé</h2>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">{item.quantity}x {item.product_name}</span>
                  <span className="font-medium shrink-0">{(item.price * item.quantity).toLocaleString('fr-DZ')} DA</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{subtotal.toLocaleString('fr-DZ')} DA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span>{form.wilaya ? `${shippingFee.toLocaleString('fr-DZ')} DA` : '—'}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="font-display text-xl text-primary">{total.toLocaleString('fr-DZ')} DA</span>
            </div>

            <Button type="submit" className="w-full mt-6 gap-2 font-semibold" size="lg" disabled={loading} onClick={handleSubmit}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Confirmer la commande
            </Button>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              En confirmant, votre commande sera en attente de vérification. Notre équipe vous contactera par téléphone.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}