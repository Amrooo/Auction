import { NextRequest, NextResponse } from 'next/server'
import { VehicleService, Vehicle } from '@/lib/vehicles-store'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        let items: Partial<Vehicle>[] = []
        if (Array.isArray(body)) {
            items = body
        } else if (body && Array.isArray(body.vehicles)) {
            items = body.vehicles
        } else if (body && Array.isArray(body.rows)) {
            items = body.rows
        } else {
            return NextResponse.json({
                success: false,
                error: 'Invalid payload format. Expected an array of vehicle objects or `{ vehicles: [...] }`.'
            }, { status: 400 })
        }

        if (items.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Empty vehicle list provided.'
            }, { status: 400 })
        }

        const result = VehicleService.bulkCreate(items)

        return NextResponse.json({
            success: true,
            message: `Successfully ingested and created ${result.count} vehicle lots.`,
            count: result.count,
            vehicles: result.created
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message || 'Failed to process bulk vehicle creation'
        }, { status: 500 })
    }
}
