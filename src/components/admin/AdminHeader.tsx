import { Search, Bell, Command, Settings } from "lucide-react"

export function AdminHeader() {
    return (
        <header className="h-20 bg-white/80 dark:bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 flex items-center px-8 justify-between relative z-50">
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Search bidding activity, users, or auctions..."
                        className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-2.5 w-full text-sm outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest shadow-sm">
                        <Command className="w-3 h-3" /> K
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-500 font-black uppercase tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        AI Guard Active
                    </div>
                </div>

                <div className="relative">
                    <button className="p-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm relative active:scale-95 group">
                        <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-[#0A0F1C] shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                    </button>
                </div>

                <div className="flex items-center gap-3 pl-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Amro</p>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tight leading-none mt-1">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-accent/20 ring-offset-2 ring-offset-slate-50 dark:ring-offset-[#0A0F1C] shadow-lg border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-800" />
                </div>
            </div>
        </header>
    )
}
