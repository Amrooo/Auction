import { NextRequest, NextResponse } from 'next/server'
import { VehicleService, VehicleStatus } from '@/lib/vehicles-store'

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const body = await request.json()

        let targetStatus: VehicleStatus | null = null

        if (body.status) {
            targetStatus = body.status
        } else if (body.action) {
            switch (body.action.toLowerCase()) {
                case 'approve':
                    targetStatus = 'approved'
                    break
                case 'push_to_live':
                case 'live':
                    targetStatus = 'live'
                    break
                case 'pause':
                    targetStatus = 'paused'
                    break
                case 'end':
                case 'complete':
                    targetStatus = 'ended'
                    break
                case 'cancel':
                    targetStatus = 'cancelled'
                    break
                default:
                    targetStatus = body.action
            }
        }

        if (!targetStatus) {
            return NextResponse.json({
                success: false,
                error: 'Missing `status` or `action` in payload. Example: `{ status: "live" }` or `{ action: "push_to_live" }`'
            }, { status: 400 })
        }

        const updated = VehicleService.updateStatus(id, targetStatus)

        if (!updated) {
            return NextResponse.json({
                success: false,
                error: `Vehicle '${id}' not found.`
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: `Vehicle '${updated.title}' (${updated.lotNumber}) status changed to '${updated.status}'. ${updated.status === 'live' ? 'Now visible on live website for bidding!' : ''}`,
            vehicle: updated
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message || 'Failed to update vehicle status'
        }, { status: 500 })
    }
}
