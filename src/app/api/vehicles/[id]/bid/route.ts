import { NextRequest, NextResponse } from 'next/server'
import { VehicleService } from '@/lib/vehicles-store'

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const body = await request.json()

        const amount = Number(body.amount)
        const bidderName = body.bidderName || 'Registered Bidder'

        if (!amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json({
                success: false,
                error: 'Invalid bid amount provided.'
            }, { status: 400 })
        }

        const result = VehicleService.placeBid(id, amount, bidderName)

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: result.error
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: `Bid of AED ${amount.toLocaleString()} placed successfully.`,
            vehicle: result.vehicle
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message || 'Failed to submit bid'
        }, { status: 500 })
    }
}
