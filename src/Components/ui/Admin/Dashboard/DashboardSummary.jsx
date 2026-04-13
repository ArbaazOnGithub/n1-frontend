import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../card';
import RecentOrdersTable from '../Orders/RecentOrdersTable';
import config from '@/config';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16'];

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <div className={`glass-card rounded-2xl p-6 flex items-center gap-4 border-l-4 ${color}`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-3xl font-extrabold text-slate-800">{value}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const DashboardSummary = () => {
  const [summary, setSummary] = useState({ totalUsers: 0, newUsers: 0, totalServices: 0, newOrders: 0 });
  const [allOrders, setAllOrders] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

        const [usersRes, newUsersRes, servicesRes, ordersRes] = await Promise.all([
          fetch(`${config.apiUrl}/api/users`, { headers }),
          fetch(`${config.apiUrl}/api/users/new-users`, { headers }),
          fetch(`${config.apiUrl}/api/services`, { headers }),
          fetch(`${config.apiUrl}/api/orders`, { headers }),
        ]);

        if (!usersRes.ok || !ordersRes.ok) throw new Error('Failed to fetch dashboard data');

        const [usersData, newUsersData, servicesData, ordersData] = await Promise.all([
          usersRes.json(), newUsersRes.json(), servicesRes.json(), ordersRes.json()
        ]);

        setSummary({
          totalUsers: usersData.length,
          newUsers: newUsersData.length,
          totalServices: servicesData.length,
          newOrders: ordersData.length,
        });

        setAllOrders(ordersData);

        // Build service popularity data
        const serviceCounts = {};
        ordersData.forEach(order => {
          const name = order.serviceType || 'Unknown';
          serviceCounts[name] = (serviceCounts[name] || 0) + 1;
        });
        setServiceData(
          Object.entries(serviceCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
        );

      } catch (error) {
        console.error('Error fetching summary data:', error);
        if (error.message.includes('No authentication token found') || error.message.includes('401')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [navigate]);

  // Build monthly orders trend from order dates
  const monthlyData = React.useMemo(() => {
    const counts = {};
    allOrders.forEach(order => {
      if (order.date) {
        const d = new Date(order.date);
        const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([month, orders]) => ({ month, orders })).slice(-6);
  }, [allOrders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="New Users Today" value={summary.newUsers} icon="👤" color="border-blue-500" subtitle="Registered today" />
        <StatCard title="Total Users" value={summary.totalUsers} icon="👥" color="border-violet-500" subtitle="All time" />
        <StatCard title="Total Services" value={summary.totalServices} icon="⚡" color="border-emerald-500" subtitle="Active services" />
        <StatCard title="Total Orders" value={summary.newOrders} icon="📋" color="border-amber-500" subtitle="All time orders" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Bar Chart */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-semibold text-slate-700 mb-4">📈 Monthly Orders Trend</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="orders" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-400 text-sm text-center py-10">Not enough order data yet.</p>
          )}
        </div>

        {/* Service Popularity Pie Chart */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-semibold text-slate-700 mb-4">🥧 Service Popularity</h3>
          {serviceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={serviceData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {serviceData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-400 text-sm text-center py-10">No orders placed yet.</p>
          )}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="glass-card rounded-2xl p-4">
        <h3 className="text-base font-semibold text-slate-700 mb-3 px-2">🗂️ Recent Orders</h3>
        <RecentOrdersTable />
      </div>
    </div>
  );
};

export default DashboardSummary;