import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

function StarRating({ value, onChange, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={readonly ? 'cursor-default' : 'cursor-pointer'}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= (hovered || value) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ author_name: '', rating: 0, comment: '' });
  const [showForm, setShowForm] = useState(false);

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => base44.entities.Review.filter({ product_id: productId }, '-created_date', 50),
  });

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.Review.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      setForm({ author_name: '', rating: 0, comment: '' });
      setShowForm(false);
      toast({ title: 'Avis publié', description: 'Merci pour votre avis !' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.author_name || form.rating === 0) {
      toast({ title: 'Erreur', description: 'Veuillez saisir votre nom et une note.', variant: 'destructive' });
      return;
    }
    mutation.mutate({ ...form, product_id: productId });
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="mt-12">
      <Separator className="mb-8" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Avis clients</h2>
          {avgRating && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating value={Math.round(avgRating)} readonly />
              <span className="text-sm text-muted-foreground">{avgRating}/5 — {reviews.length} avis</span>
            </div>
          )}
        </div>
        <Button onClick={() => setShowForm(v => !v)} variant="outline">
          {showForm ? 'Annuler' : 'Laisser un avis'}
        </Button>
      </div>

      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          <h3 className="font-heading font-semibold">Votre avis</h3>
          <div>
            <Label>Nom *</Label>
            <Input
              value={form.author_name}
              onChange={e => setForm(p => ({ ...p, author_name: e.target.value }))}
              placeholder="Votre prénom"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Note *</Label>
            <div className="mt-1">
              <StarRating value={form.rating} onChange={r => setForm(p => ({ ...p, rating: r }))} />
            </div>
          </div>
          <div>
            <Label>Commentaire</Label>
            <Textarea
              value={form.comment}
              onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
              placeholder="Partagez votre expérience..."
              rows={3}
              className="mt-1"
            />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Publication...' : 'Publier l\'avis'}
          </Button>
        </form>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun avis pour l'instant. Soyez le premier !</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-heading font-semibold">{review.author_name}</p>
                  <StarRating value={review.rating} readonly />
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_date).toLocaleDateString('fr-DZ')}
                </span>
              </div>
              {review.comment && <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}