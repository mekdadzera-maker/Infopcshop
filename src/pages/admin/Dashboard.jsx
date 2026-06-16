import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Clock, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { data: products = [] } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => base44.entities.Product.list('-created_date', 500),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => base44.entities.Order.list('-created_date', 500),
  });

  const pendingOrders = orders.filter(o => o.status === 'pending_confirmation');
  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + (o.total || 0), 0);

  const stats = [
    { label: 'Produits', value: products.length, icon: Package, color: 'text-blue-600 bg-blue-100' },
    { label: 'Commandes', value: orders.length, icon: ShoppingCart, color: 'text-purple-600 bg-purple-100' },
    { label: 'En attente', value: pendingOrders.length, icon: Clock, color: 'text-amber-600 bg-amber-100' },
    { label: 'Revenus (livrées)', value: `${totalRevenue.toLocaleString('fr-DZ')} DA`, icon: TrendingUp, color: 'text-green-600 bg-green-100' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="font-display text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent pending orders */}
      {pendingOrders.length > 0 && (
        <div className="mt-8">
          <h2 className="font-heading font-semibold mb-4">Commandes en attente ({pendingOrders.length})</h2>
          <div className="space-y-3">
            {pendingOrders.slice(0, 5).map(order => (
              <Card key={order.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer_phone} • {order.items?.length} article(s)</p>
                  </div>
                  <span className="font-display font-bold">{order.total?.toLocaleString('fr-DZ')} DA</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}