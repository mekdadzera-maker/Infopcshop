import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, ChevronLeft, Check, Minus, Plus, Truck, Banknote, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/cartStore.jsx';
import { toast } from '@/components/ui/use-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => base44.entities.Product.filter({ id }),
    select: (data) => data?.[0],
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">Produit introuvable</p>
        <Link to="/products"><Button variant="link">Retour aux produits</Button></Link>
      </div>
    );
  }

  const allImages = [product.image_url, ...(product.gallery_urls || [])].filter(Boolean);
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const handleAdd = () => {
    addItem(product, qty);
    toast({ title: 'Ajouté au panier', description: `${qty}x ${product.name}` });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/products" className="hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Produits
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden mb-4">
            {allImages.length > 0 ? (
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Pas d'image
              </div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {allImages.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                    selectedImage === i ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
            <Badge variant="outline">{product.category}</Badge>
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-display text-3xl font-bold text-primary">
              {product.price?.toLocaleString('fr-DZ')} DA
            </span>
            {product.original_price && (
              <span className="text-lg text-muted-foreground line-through">
                {product.original_price?.toLocaleString('fr-DZ')} DA
              </span>
            )}
            {discount > 0 && (
              <Badge className="bg-green-500 text-white">-{discount}%</Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description || product.short_description || 'Pas de description disponible.'}
          </p>

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6">
            {product.in_stock ? (
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 gap-1">
                <Check className="w-3 h-3" /> En stock
              </Badge>
            ) : (
              <Badge variant="destructive">Rupture de stock</Badge>
            )}
          </div>

          {/* Quantity & Add to cart */}
          {product.in_stock && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(qty + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1 gap-2 font-semibold" onClick={handleAdd}>
                <ShoppingCart className="w-5 h-5" /> Ajouter au panier
              </Button>
            </div>
          )}

          <Separator className="my-6" />

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-primary" />
              <span>Livraison nationale</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Banknote className="w-4 h-4 text-primary" />
              <span>Paiement à la livraison</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span>Garantie incluse</span>
            </div>
          </div>

          {/* Specs */}
          {product.specs?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-heading font-semibold mb-3">Caractéristiques</h3>
              <div className="bg-muted rounded-xl p-4 space-y-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}