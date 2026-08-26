import { NextRequest, NextResponse } from 'next/server'
import { VehicleService } from '@/lib/vehicles-store'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const vehicle = VehicleService.getById(id)

        if (!vehicle) {
            return NextResponse.json({
                success: false,
                error: `Vehicle with id or lot number '${id}' not found.`
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: vehicle
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message || 'Failed to fetch vehicle'
        }, { status: 500 })
    }
}
