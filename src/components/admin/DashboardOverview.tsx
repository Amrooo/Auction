"use client"

import {
    TrendingUp,
    Gavel as TotalBids,
    DollarSign as Revenue,
    Users as ActiveUsers,
    Activity as ActiveAuctions,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    ShieldCheck as BotDetection,
    Layers,
    Clock,
    Zap as FastSales,
    BrainCircuit as ActiveAI
} from "lucide-react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts"
import { cn } from "@/lib/utils"

const data = [
    { name: 'Mon', revenue: 450000, bids: 1200, users: 4500 },
    { name: 'Tue', revenue: 620000, bids: 1540, users: 5100 },
    { name: 'Wed', revenue: 580000, bids: 1100, users: 4800 },
    { name: 'Thu', revenue: 940000, bids: 2100, users: 6200 },
    { name: 'Fri', revenue: 1200000, bids: 3400, users: 7800 },
    { name: 'Sat', revenue: 850000, bids: 2800, users: 8100 },
    { name: 'Sun', revenue: 780000, bids: 1900, users: 7200 },
]

export function DashboardOverview() {
    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header / Intro */}
            <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6`}>
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">Command Center</h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                        AI Analytics indicate high-demand surge in <span className="text-slate-900 dark:text-white font-bold underline decoration-accent underline-offset-4">Classic Motors</span> today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm rounded-2xl">
                        {['Day', 'Week', 'Month', 'Year'].map((tab) => (
                            <button
                                key={tab}
                                className={cn(
                                    "px-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl",
                                    tab === 'Week' ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: 'AED 42.8M', trend: '+12.5%', icon: Revenue, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                    { label: 'Total Bids', value: '84,120', trend: '+24.1%', icon: TotalBids, color: 'text-accent', bg: 'bg-accent/10' },
                    { label: 'Active Auctions', value: '1,248', trend: '-2.4%', icon: ActiveAuctions, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Conversion Rate', value: '92.4%', trend: '+5.2%', icon: FastSales, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-slate-300 dark:hover:border-white/10 shadow-sm hover:shadow-xl dark:shadow-none overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 dark:opacity-20 transition-opacity group-hover:opacity-30 dark:group-hover:opacity-40 pointer-events-none ${stat.bg}`} />
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-0.5 text-xs font-black uppercase px-2 py-1 rounded-full",
                                stat.trend.startsWith('+') ? "text-green-600 dark:text-green-500 bg-green-500/10" : "text-red-600 dark:text-red-500 bg-red-500/10"
                            )}>
                                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="space-y-1 relative z-10">
                            <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</h3>
                            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Overview Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-sm hover:shadow-xl dark:shadow-none transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/10 transition-colors" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                Revenue Performance
                            </h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">AI Forecast: Revenue predicted to grow 15% next week</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider text-slate-500">
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Actual</div>
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-700" /> Forecast</div>
                        </div>
                    </div>

                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }}
                                    tickFormatter={(val) => `AED ${val / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#64748B', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '8px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#DC2626"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Bidding Insight Card */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-600/20 flex-1 cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                            <ActiveAI className="w-32 h-32 opacity-10" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <ActiveAI className="w-6 h-6 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black tracking-tight leading-none uppercase italic underline decoration-white/20 underline-offset-8 mb-4">AI Market Signal</h3>
                                <p className="text-sm font-bold opacity-80 leading-relaxed">System has detected <span className="text-green-300 font-extrabold">24 high-yield assets</span> currently undervalued by more than 15%. </p>
                            </div>
                            <button className="px-6 py-2.5 rounded-full bg-white text-indigo-900 text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all outline-none">
                                Review AI Alerts
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm dark:shadow-xl flex-1 relative overflow-hidden group hover:shadow-xl transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full" />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="space-y-1">
                                <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                                    <BotDetection className="w-4 h-4 text-green-500" />
                                    Bot Security Score
                                </h4>
                                <div className="flex items-end gap-3 mt-4">
                                    <p className="text-6xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">99.8%</p>
                                    <span className="text-green-500 font-black text-xs uppercase mb-1">Secure</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Active mitigations: 42</span>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => <div key={i} className={`w-6 h-6 rounded-full border-2 border-slate-950 flex items-center justify-center bg-slate-800 text-[8px] font-bold`}>#{i}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent AI Activity Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 uppercase italic leading-none">
                        <Clock className="w-5 h-5 text-accent" />
                        Real-Time Command Center Log
                    </h2>
                    <button className="text-xs font-black uppercase text-accent hover:underline underline-offset-4 tracking-widest">View System Log</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/5 text-[10px] text-slate-600 font-black uppercase tracking-widest text-left">
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Description</th>
                                <th className="px-8 py-4 text-right">Category</th>
                                <th className="px-8 py-4 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { status: 'AI ALERT', desc: 'Predictive Price Surge detected for License Plate 8888 UAE', category: 'Plates', time: '14:24:12', type: 'alert' },
                                { status: 'SECURED', desc: 'Auto-bid bot blocked from auction Lot #912A', category: 'Security', time: '14:21:05', type: 'success' },
                                { status: 'SYSTEM', desc: 'High traffic detected from Dubai region. Autoscaling enabled.', category: 'Infra', time: '14:18:42', type: 'msg' },
                                { status: 'AI RECOMMEND', desc: 'AI recommends promoting 2022 Porsche 911 GT3 to featured', category: 'Growth', time: '14:12:30', type: 'ai' },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-colors cursor-pointer">
                                    <td className="px-8 py-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/5",
                                            row.type === 'alert' ? "text-accent border-accent/20 bg-accent/5" :
                                                row.type === 'success' ? "text-green-500 border-green-500/20 bg-green-500/5" :
                                                    row.type === 'ai' ? "text-indigo-400 border-indigo-500/20 bg-indigo-500/5" : "text-slate-400"
                                        )}>
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                row.type === 'alert' ? "bg-accent animate-ping" :
                                                    row.type === 'success' ? "bg-green-500" :
                                                        row.type === 'ai' ? "bg-indigo-400 animate-pulse" : "bg-slate-400"
                                            )} />
                                            {row.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{row.desc}</p>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{row.category}</span>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <span className="text-[10px] text-slate-600 font-black tabular-nums">{row.time}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
