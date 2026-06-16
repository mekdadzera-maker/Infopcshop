import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Clock, CheckCircle, Truck as TruckIcon, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const STATUS_MAP = {
  pending_confirmation: { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle },
  shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: TruckIcon },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
};

export default function MyOrders() {
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders', user?.id],
    queryFn: () => base44.entities.Order.filter({ created_by_id: user.id }, '-created_date', 50),
    enabled: !!user?.id,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Mes commandes</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium">Aucune commande</p>
          <p className="text-muted-foreground">Vous n'avez pas encore passé de commande.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const status = STATUS_MAP[order.status] || STATUS_MAP.pending_confirmation;
            const StatusIcon = status.icon;
            return (
              <Card key={order.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Commande #{order.id?.slice(-6)}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.created_date && format(new Date(order.created_date), 'dd MMM yyyy à HH:mm', { locale: fr })}
                      </p>
                    </div>
                    <Badge className={`${status.color} border gap-1`}>
                      <StatusIcon className="w-3 h-3" /> {status.label}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                          {item.product_image && <img src={item.product_image} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <span className="flex-1 line-clamp-1">{item.quantity}x {item.product_name}</span>
                        <span className="font-medium">{(item.price * item.quantity).toLocaleString('fr-DZ')} DA</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {order.shipping_method === 'home_delivery' ? 'Livraison à domicile' : 'Stop-Desk'} • {order.wilaya}
                    </span>
                    <span className="font-display font-bold">{order.total?.toLocaleString('fr-DZ')} DA</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}