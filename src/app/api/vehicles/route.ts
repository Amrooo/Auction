import { NextRequest, NextResponse } from 'next/server'
import { VehicleService, VehicleStatus } from '@/lib/vehicles-store'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status') as VehicleStatus | 'all' | null
        const sourceEntity = searchParams.get('sourceEntity') || undefined
        const category = searchParams.get('category') || undefined
        const search = searchParams.get('search') || undefined
        const isFeaturedParam = searchParams.get('featured')
        const isFeatured = isFeaturedParam !== null ? isFeaturedParam === 'true' : undefined

        const vehicles = VehicleService.getAll({
            status: status || 'all',
            sourceEntity,
            category,
            search,
            isFeatured
        })

        return NextResponse.json({
            success: true,
            count: vehicles.length,
            data: vehicles
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message || 'Failed to fetch vehicles' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { success: false, error: 'Invalid request body. Expected vehicle JSON payload.' },
                { status: 400 }
            )
        }

        // Create vehicle with validation & defaults
        const newVehicle = VehicleService.create(body)

        return NextResponse.json({
            success: true,
            message: `Vehicle '${newVehicle.title}' (${newVehicle.lotNumber}) created successfully.`,
            vehicle: newVehicle
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message || 'Failed to create vehicle' },
            { status: 500 }
        )
    }
}
