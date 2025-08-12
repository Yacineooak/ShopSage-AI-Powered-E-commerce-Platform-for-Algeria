import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package,
  Activity,
  Eye,
  RefreshCw,
  Calendar,
  Download,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AnimatedCounter } from '../components/ui/animated-counter';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

// Mock data for the dashboard
const dashboardStats = {
  totalRevenue: 284750,
  totalOrders: 1284,
  totalCustomers: 3847,
  totalProducts: 892,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  customersGrowth: 15.2,
  productsGrowth: 4.1
};

const recentOrders = [
  { id: '#3847', customer: 'Sarah Johnson', product: 'Wireless Headphones', amount: 129.99, status: 'completed', time: '2 min ago' },
  { id: '#3846', customer: 'Mike Chen', product: 'Smart Watch', amount: 399.99, status: 'processing', time: '5 min ago' },
  { id: '#3845', customer: 'Emma Davis', product: 'Yoga Mat Premium', amount: 59.99, status: 'shipped', time: '12 min ago' },
  { id: '#3844', customer: 'John Smith', product: 'Coffee Mug Set', amount: 24.99, status: 'completed', time: '18 min ago' },
  { id: '#3843', customer: 'Lisa Brown', product: 'LED Desk Lamp', amount: 49.99, status: 'pending', time: '25 min ago' }
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 342, revenue: 44458, growth: 23.5 },
  { name: 'Smart Watch Series 9', sales: 187, revenue: 74813, growth: 15.2 },
  { name: 'Yoga Mat Premium', sales: 298, revenue: 17878, growth: 8.7 },
  { name: 'Coffee Mug Set', sales: 421, revenue: 10524, growth: -2.1 },
  { name: 'LED Desk Lamp', sales: 156, revenue: 7794, growth: 12.3 }
];

const salesData = [
  { month: 'Jan', sales: 65000, orders: 890 },
  { month: 'Feb', sales: 59000, orders: 756 },
  { month: 'Mar', sales: 80000, orders: 1023 },
  { month: 'Apr', sales: 81000, orders: 1087 },
  { month: 'May', sales: 56000, orders: 734 },
  { month: 'Jun', sales: 95000, orders: 1284 }
];

export default function Admin() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-center space-x-2">
                <AnimatedCounter 
                  value={value} 
                  prefix={prefix}
                  suffix={suffix}
                  decimals={prefix === '$' ? 0 : 0}
                  className="text-2xl font-bold"
                />
                <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {Math.abs(change)}%
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={dashboardStats.totalRevenue}
            change={dashboardStats.revenueGrowth}
            icon={DollarSign}
            prefix="$"
          />
          <StatCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            change={dashboardStats.ordersGrowth}
            icon={ShoppingCart}
          />
          <StatCard
            title="Total Customers"
            value={dashboardStats.totalCustomers}
            change={dashboardStats.customersGrowth}
            icon={Users}
          />
          <StatCard
            title="Total Products"
            value={dashboardStats.totalProducts}
            change={dashboardStats.productsGrowth}
            icon={Package}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Sales Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between space-x-2">
                  {salesData.map((data, index) => (
                    <motion.div
                      key={data.month}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.sales / 100000) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t min-h-[20px] relative group"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded">
                        ${data.sales.toLocaleString()}
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                        {data.month}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Top Products
                  </span>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span>{product.sales} sales</span>
                        <span>${product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className={`flex items-center text-xs ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(product.growth)}%
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Orders
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search orders..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {recentOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 font-mono text-sm">{order.id}</td>
                        <td className="py-3">{order.customer}</td>
                        <td className="py-3">{order.product}</td>
                        <td className="py-3 font-medium">${order.amount}</td>
                        <td className="py-3">
                          <Badge 
                            variant={
                              order.status === 'completed' ? 'default' :
                              order.status === 'processing' ? 'secondary' :
                              order.status === 'shipped' ? 'outline' : 'destructive'
                            }
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted-foreground text-sm">{order.time}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
