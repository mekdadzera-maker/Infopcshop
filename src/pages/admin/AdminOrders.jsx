import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Phone, MapPin, Truck, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { WILAYAS } from '@/lib/wilayas';

const STATUS_CONFIG = {
  pending_confirmation: { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700 border-red-200' },
};

export default function AdminOrders() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => base44.entities.Order.list('-created_date', 500),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Order.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'Statut mis à jour' });
    },
  });

  const filtered = orders.filter(o => {
    const matchSearch = !search ||
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone?.includes(search) ||
      o.id?.includes(search);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getWilayaName = (code) => WILAYAS.find(w => w.code === code)?.name || code;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Commandes ({orders.length})</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher par nom, téléphone..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {Object.entries(STATUS_CONFIG).map(([key, val]) => (
              <SelectItem key={key} value={key}>{val.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filtered.map(order => {
          const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending_confirmation;
          return (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">#{order.id?.slice(-6)}</span>
                      <Badge className={`${status.color} border text-xs`}>{status.label}</Badge>
                    </div>
                    <p className="font-semibold">{order.customer_name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <a href={`tel:${order.customer_phone}`} className="flex items-center gap-1 text-primary hover:underline">
                        <Phone className="w-3 h-3" /> {order.customer_phone}
                      </a>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {getWilayaName(order.wilaya)}
                      </span>
                    </div>
                    {order.address && (
                      <p className="text-xs text-muted-foreground mt-1">{order.address}</p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      {order.shipping_method === 'home_delivery' ? (
                        <><Truck className="w-3 h-3" /> Livraison à domicile</>
                      ) : (
                        <><Building2 className="w-3 h-3" /> Stop-Desk</>
                      )}
                      <span className="ml-1">• Livraison: {order.shipping_fee?.toLocaleString('fr-DZ')} DA</span>
                    </div>
                    {order.notes && <p className="text-xs italic text-muted-foreground mt-1">Note: {order.notes}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.created_date && format(new Date(order.created_date), 'dd MMM yyyy à HH:mm', { locale: fr })}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="font-display text-xl font-bold">{order.total?.toLocaleString('fr-DZ')} DA</span>
                    <Select value={order.status} onValueChange={v => updateMutation.mutate({ id: order.id, status: v })}>
                      <SelectTrigger className="w-44 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                          <SelectItem key={key} value={key}>{val.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="space-y-2">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded bg-muted overflow-hidden shrink-0">
                        {item.product_image && <img src={item.product_image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <span className="flex-1 line-clamp-1">{item.quantity}x {item.product_name}</span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString('fr-DZ')} DA</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            Aucune commande trouvée
          </div>
        )}
      </div>
    </div>
  );
}