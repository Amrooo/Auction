"use client"

import { useState } from "react"
import {
    BrainCircuit,
    Zap,
    ShieldAlert,
    LineChart,
    Save,
    RotateCcw,
    Gauge,
    Eye,
    Target
} from "lucide-react"

export function AIControlHub() {
    const [settings, setSettings] = useState({
        predictionSensitivity: 85,
        autoBidThrottle: 120,
        botThreshold: 92,
        marketVolatility: 45
    })

    return (
        <div className="mt-10 space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <BrainCircuit className="w-8 h-8 text-accent" />
                        AI Neural Configuration
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Adjust real-time predictive models & bidding automation</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 transition-all cursor-pointer">
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-accent text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-accent/20 hover:scale-105 transition-all cursor-pointer">
                        <Save className="w-4 h-4" /> Save Config
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Prediction Sensitivity */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-8 group transition-all hover:border-accent/20 dark:hover:border-accent/40 shadow-sm hover:shadow-xl dark:shadow-none overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[60px]" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                                <Target className="w-7 h-7 text-accent" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Market Intelligence</h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Prediction Accuracy: 98.4%</p>
                            </div>
                        </div>
                        <div className="text-4xl font-black text-accent tabular-nums tracking-tighter">{settings.predictionSensitivity}%</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-widest">
                            <span>Conservative</span>
                            <span>Aggressive</span>
                        </div>
                        <input
                            type="range"
                            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent transition-all"
                            value={settings.predictionSensitivity}
                            onChange={(e) => setSettings({ ...settings, predictionSensitivity: parseInt(e.target.value) })}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic underline decoration-slate-200 dark:decoration-white/5 underline-offset-4">AI determines the confidence threshold for "Undervalued" asset flags.</p>
                    </div>
                </div>

                {/* Automation Throttle */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-8 group transition-all hover:border-indigo-500/20 shadow-sm hover:shadow-xl dark:shadow-none relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-[60px]" />
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                <Zap className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Bidding Engine</h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Latency: 1.2ms (Ultrafast)</p>
                            </div>
                        </div>
                        <div className="text-4xl font-black text-indigo-500 dark:text-indigo-400 tabular-nums tracking-tighter">{settings.autoBidThrottle}ms</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-widest">
                            <span>Low Traffic</span>
                            <span>Surge Ready</span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="500"
                            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            value={settings.autoBidThrottle}
                            onChange={(e) => setSettings({ ...settings, autoBidThrottle: parseInt(e.target.value) })}
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic underline decoration-slate-200 dark:decoration-white/5 underline-offset-4">Controls the frequency of AI-recommended bid adjustments during peak hours.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                    { title: 'Anomalies Detection', icon: ShieldAlert, active: true, color: 'text-green-500' },
                    { title: 'Live Price Prediction', icon: LineChart, active: true, color: 'text-indigo-500' },
                    { title: 'User Behavioral Analysis', icon: Eye, active: true, color: 'text-amber-500' },
                ].map((tool, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm active:scale-95">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-white/5 ${tool.color} border border-slate-100 dark:border-transparent group-hover:scale-110 transition-transform`}>
                                <tool.icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-black text-slate-900 dark:text-slate-200 tracking-tight">{tool.title}</span>
                        </div>
                        <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-white/5 transition-colors group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                            <div className="w-4 h-4 bg-accent rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)] transform translate-x-4 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
