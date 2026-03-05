import { DashboardOverview } from "@/components/admin/DashboardOverview"
import { AIControlHub } from "@/components/admin/AIControlHub"

export const metadata = {
    title: 'Admin Command Center | Antigravity AI',
    description: 'Monitor and manage auctions, bidding activity, and AI predictive models.',
}

export default function AdminDashboard() {
    return (
        <div className="max-w-[1600px] mx-auto space-y-16">
            <DashboardOverview />
            <AIControlHub />
        </div>
    )
}
