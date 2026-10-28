import fs from 'fs'
import path from 'path'

export type VehicleStatus = 'draft' | 'pending_approval' | 'approved' | 'live' | 'paused' | 'ended' | 'sold' | 'cancelled' | 'disputed'

export type EntityId = 'dmt' | 'abu-dhabi-mobility' | 'dubai-police' | 'abu-dhabi-police' | 'dubai-customs' | 'saaed' | 'sharjah-police' | 'other'

export interface SourceEntity {
    id: EntityId
    name: string
    arabicName: string
    logo: string
}

export interface InspectionReport {
    grade: string // e.g. "A+", "4.8/5", "Clean"
    chassisCondition: string
    engineCondition: string
    transmissionCondition: string
    bodyCondition: string
    interiorCondition: string
    tiresCondition: string
    reportUrl?: string
    notes?: string
    inspectionDate?: string
}

export interface AIInsight {
    badge?: string // e.g. "Rare Spec", "Best Value", "High Demand"
    marketValuationAed: number
    valuationDeltaPercent: number // e.g. -8 (means 8% undervalued)
    demandLevel: 'Low' | 'Moderate' | 'High' | 'Very High'
    priceTrend: 'Rising' | 'Stable' | 'Falling'
    summaryEn: string
    summaryAr: string
}

export interface VehicleLocation {
    branchNameEn: string
    branchNameAr: string
    yardName: string
    addressEn: string
    addressAr: string
    latitude: number
    longitude: number
    googleMapsUrl: string
}

export interface VehicleBid {
    id: string
    bidderName: string
    amount: number
    timestamp: string
}

export interface Vehicle {
    id: string
    lotNumber: string
    vin: string
    title: string
    titleAr?: string
    make: string
    model: string
    year: number
    trim?: string
    bodyType?: string
    category: 'motors' | 'real estate' | 'jewelry' | 'plates' | 'watches' | 'general'
    mileageKm: number
    exteriorColor: string
    exteriorColorAr?: string
    interiorColor: string
    interiorColorAr?: string
    engine: string
    engineAr?: string
    powerHp: number
    transmission: string
    transmissionAr?: string
    acceleration0100?: string
    fuelType?: string
    
    // Financials & Bidding
    startingBid: number
    minimumIncrement: number
    reservePrice?: number
    currentBid: number
    buyNowPrice?: number
    depositRequiredAed: number
    bidsCount: number
    bidsHistory?: VehicleBid[]
    
    // Timings & Status
    status: VehicleStatus
    startDate: string
    endDate: string
    extensionsCount?: number
    isFeatured?: boolean
    
    // Visual Assets
    thumbnail: string
    images: string[]
    videoUrl?: string
    
    // Entity & Location
    sourceEntity: SourceEntity
    location: VehicleLocation
    
    // Inspection & AI
    inspection?: InspectionReport
    aiInsight?: AIInsight
    
    // Custom Terms or Notes
    notes?: string
    notesAr?: string
    createdAt: string
    updatedAt: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'vehicles.json')

export const KNOWN_ENTITIES: Record<EntityId, SourceEntity> = {
    'dmt': {
        id: 'dmt',
        name: 'Department of Municipalities & Transport',
        arabicName: 'دائرة البلديات والنقل',
        logo: '/images/dmt-logo.png'
    },
    'abu-dhabi-mobility': {
        id: 'abu-dhabi-mobility',
        name: 'Abu Dhabi Mobility',
        arabicName: 'أبوظبي للتنقل',
        logo: '/images/abu-dhabi-mobility.png'
    },
    'dubai-police': {
        id: 'dubai-police',
        name: 'Dubai Police',
        arabicName: 'شرطة دبي',
        logo: '/images/dubai-police.png'
    },
    'abu-dhabi-police': {
        id: 'abu-dhabi-police',
        name: 'Abu Dhabi Police',
        arabicName: 'شرطة أبوظبي',
        logo: '/images/abu-dhabi-police-transparent.png'
    },
    'dubai-customs': {
        id: 'dubai-customs',
        name: 'Dubai Customs',
        arabicName: 'جمارك دبي',
        logo: '/images/dubai-customs.png'
    },
    'saaed': {
        id: 'saaed',
        name: 'Saaed Traffic Systems',
        arabicName: 'شركة ساعد للأنظمة المرورية',
        logo: '/images/saaed-logo.png'
    },
    'sharjah-police': {
        id: 'sharjah-police',
        name: 'Sharjah Police',
        arabicName: 'شرطة الشارقة',
        logo: '/images/saaed-logo.png'
    },
    'other': {
        id: 'other',
        name: 'Government Entity',
        arabicName: 'جهة حكومية',
        logo: '/images/saaed-logo.png'
    }
}

const INITIAL_VEHICLES: Vehicle[] = [
    {
        id: "m1",
        lotNumber: "LOT-2024-001",
        vin: "W1N463***291",
        title: "2024 Mercedes-AMG G63",
        titleAr: "مرسيدس AMG G63 2024",
        make: "Mercedes-Benz",
        model: "G63 AMG",
        year: 2024,
        trim: "Grand Edition (1 of 1000)",
        bodyType: "SUV",
        category: "motors",
        mileageKm: 0,
        exteriorColor: "Night Black Magno",
        exteriorColorAr: "أسود ليلي مات",
        interiorColor: "Bengal Red / Black",
        interiorColorAr: "أحمر البنغال / أسود",
        engine: "4.0L V8 Biturbo",
        engineAr: "٤.٠ لتر V8 بيتوربو",
        powerHp: 577,
        transmission: "9-Speed Auto",
        transmissionAr: "أوتوماتيك ٩ سرعات",
        acceleration0100: "4.5s",
        fuelType: "Petrol",
        startingBid: 800000,
        minimumIncrement: 5000,
        currentBid: 950000,
        depositRequiredAed: 47500,
        bidsCount: 55,
        status: "live",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 4 * 3600 * 1000 + 20 * 60 * 1000).toISOString(),
        isFeatured: true,
        thumbnail: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2670&auto=format&fit=crop"
        ],
        sourceEntity: KNOWN_ENTITIES['abu-dhabi-mobility'],
        location: {
            branchNameEn: "Inspection Location Branch",
            branchNameAr: "فرع موقع المعاينة",
            yardName: "Emirates Auction Yard - Al Aweer Dubai",
            addressEn: "Al Aweer Auto Market, Dubai, UAE",
            addressAr: "سوق العوير للسيارات، دبي، الإمارات",
            latitude: 25.1764,
            longitude: 55.3908,
            googleMapsUrl: "https://maps.google.com/maps?q=25.1764,55.3908&t=k&z=17"
        },
        inspection: {
            grade: "A+",
            chassisCondition: "Flawless",
            engineCondition: "Brand New (0 km)",
            transmissionCondition: "Brand New",
            bodyCondition: "Factory Paint",
            interiorCondition: "Pristine",
            tiresCondition: "New 100%"
        },
        aiInsight: {
            badge: "Rare Spec",
            marketValuationAed: 1030000,
            valuationDeltaPercent: -8,
            demandLevel: "High",
            priceTrend: "Rising",
            summaryEn: "This lot is currently undervalued by 8% compared to similar G63 Grand Edition models. Demand is High, with prices trending upwards (+5%).",
            summaryAr: "هذا العرض مقيّم بأقل من قيمته بنسبة ٨٪ مقارنةً بطرازات G63 المماثلة. الطلب مرتفع، والأسعار في اتجاه تصاعدي (+٥٪)."
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "m2",
        lotNumber: "LOT-2024-002",
        vin: "ZHWUB1***842",
        title: "2022 Lamborghini Urus",
        titleAr: "لامبورغيني أوروس 2022",
        make: "Lamborghini",
        model: "Urus",
        year: 2022,
        trim: "Performante",
        bodyType: "SUV",
        category: "motors",
        mileageKm: 18500,
        exteriorColor: "Giallo Auge Yellow",
        exteriorColorAr: "أصفر جيالو",
        interiorColor: "Nero Ade Alcantara",
        interiorColorAr: "ألكانتارا أسود",
        engine: "4.0L Twin-Turbo V8",
        engineAr: "٤.٠ لتر توين تيربو V8",
        powerHp: 650,
        transmission: "8-Speed Automatic",
        transmissionAr: "أوتوماتيك ٨ سرعات",
        startingBid: 950000,
        minimumIncrement: 10000,
        currentBid: 1100000,
        depositRequiredAed: 55000,
        bidsCount: 32,
        status: "live",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 29 * 3600 * 1000).toISOString(),
        isFeatured: true,
        thumbnail: "https://images.unsplash.com/photo-1621609764095-b22d11ad25ac?q=80&w=2592&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1621609764095-b22d11ad25ac?q=80&w=2592&auto=format&fit=crop"],
        sourceEntity: KNOWN_ENTITIES['dubai-police'],
        location: {
            branchNameEn: "Dubai Police Impound Yard",
            branchNameAr: "ساحة حجز شرطة دبي",
            yardName: "Al Qusais Yard, Dubai",
            addressEn: "Al Qusais Industrial Area, Dubai",
            addressAr: "منطقة القصيص الصناعية، دبي",
            latitude: 25.2811,
            longitude: 55.3789,
            googleMapsUrl: "https://maps.google.com/maps?q=25.2811,55.3789"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "m3",
        lotNumber: "LOT-2024-003",
        vin: "WBS43A***105",
        title: "2023 BMW M4 CSL",
        titleAr: "بي إم دبليو M4 CSL 2023",
        make: "BMW",
        model: "M4 CSL",
        year: 2023,
        trim: "CSL Coupe",
        bodyType: "Coupe",
        category: "motors",
        mileageKm: 4200,
        exteriorColor: "Frozen Brooklyn Grey",
        exteriorColorAr: "رمادي مجمد",
        interiorColor: "Carbon Full Bucket Black",
        interiorColorAr: "كربون أسود",
        engine: "3.0L Inline-6 Twin-Turbo",
        engineAr: "٣.٠ لتر ٦ أسطوانات",
        powerHp: 543,
        transmission: "8-Speed M Steptronic",
        transmissionAr: "أوتوماتيك ٨ سرعات",
        startingBid: 480000,
        minimumIncrement: 5000,
        currentBid: 550000,
        depositRequiredAed: 27500,
        bidsCount: 89,
        status: "live",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 6 * 3600 * 1000 + 15 * 60 * 1000).toISOString(),
        isFeatured: true,
        thumbnail: "https://images.unsplash.com/photo-1555215696-99ac45e75d74?q=80&w=2670&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1555215696-99ac45e75d74?q=80&w=2670&auto=format&fit=crop"],
        sourceEntity: KNOWN_ENTITIES['abu-dhabi-police'],
        location: {
            branchNameEn: "Abu Dhabi Police Impound Yard",
            branchNameAr: "ساحة حجز شرطة أبوظبي",
            yardName: "Mussafah Yard, Abu Dhabi",
            addressEn: "Mussafah Industrial, Abu Dhabi",
            addressAr: "مصفح الصناعية، أبوظبي",
            latitude: 24.3644,
            longitude: 54.4988,
            googleMapsUrl: "https://maps.google.com/maps?q=24.3644,54.4988"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "m4",
        lotNumber: "LOT-2024-004",
        vin: "ZFF88N***301",
        title: "2021 Ferrari F8 Tributo",
        titleAr: "فيراري F8 تريبوتو 2021",
        make: "Ferrari",
        model: "F8 Tributo",
        year: 2021,
        trim: "Tributo",
        bodyType: "Coupe",
        category: "motors",
        mileageKm: 9800,
        exteriorColor: "Rosso Corsa Red",
        exteriorColorAr: "أحمر روسو كورسا",
        interiorColor: "Cuoio Leather",
        interiorColorAr: "جلد بيج",
        engine: "3.9L Twin-Turbo V8",
        engineAr: "٣.٩ لتر توين تيربو V8",
        powerHp: 710,
        transmission: "7-Speed Dual Clutch",
        transmissionAr: "٧ سرعات ثنائي التعشيق",
        startingBid: 1100000,
        minimumIncrement: 10000,
        currentBid: 1250000,
        depositRequiredAed: 62500,
        bidsCount: 14,
        status: "live",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 60 * 3600 * 1000).toISOString(),
        isFeatured: true,
        thumbnail: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670&auto=format&fit=crop"],
        sourceEntity: KNOWN_ENTITIES['dmt'],
        location: {
            branchNameEn: "DMT Operations Yard",
            branchNameAr: "ساحة عمليات دائرة البلديات والنقل",
            yardName: "DMT Central Yard, Abu Dhabi",
            addressEn: "Al Falah, Abu Dhabi",
            addressAr: "الفلاح، أبوظبي",
            latitude: 24.4215,
            longitude: 54.6892,
            googleMapsUrl: "https://maps.google.com/maps?q=24.4215,54.6892"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "m5",
        lotNumber: "LOT-2024-005",
        vin: "JN8AY2***912",
        title: "2023 Nissan Patrol Nismo",
        titleAr: "نيسان باترول نيسمو 2023",
        make: "Nissan",
        model: "Patrol Nismo",
        year: 2023,
        trim: "Nismo",
        bodyType: "SUV",
        category: "motors",
        mileageKm: 24000,
        exteriorColor: "White Pearl",
        exteriorColorAr: "أبيض لؤلؤي",
        interiorColor: "Red / Black Leather",
        interiorColorAr: "جلد أحمر / أسود",
        engine: "5.6L V8 Nismo Tuned",
        engineAr: "٥.٦ لتر V8 نيسمو",
        powerHp: 428,
        transmission: "7-Speed Automatic",
        transmissionAr: "٧ سرعات أوتوماتيك",
        startingBid: 280000,
        minimumIncrement: 2000,
        currentBid: 320000,
        depositRequiredAed: 16000,
        bidsCount: 67,
        status: "live",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
        isFeatured: false,
        thumbnail: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop"],
        sourceEntity: KNOWN_ENTITIES['saaed'],
        location: {
            branchNameEn: "Saaed Al Aweer Branch",
            branchNameAr: "فرع ساعد - العوير",
            yardName: "Saaed Yard, Al Aweer",
            addressEn: "Al Aweer, Dubai",
            addressAr: "العوير، دبي",
            latitude: 25.1764,
            longitude: 55.3908,
            googleMapsUrl: "https://maps.google.com/maps?q=25.1764,55.3908"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]

function ensureDataFile(): Vehicle[] {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true })
        }
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_VEHICLES, null, 2), 'utf-8')
            return INITIAL_VEHICLES
        }
        const data = fs.readFileSync(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return INITIAL_VEHICLES
    }
}

function saveDataFile(vehicles: Vehicle[]): void {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true })
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(vehicles, null, 2), 'utf-8')
    } catch (e) {
        console.error("Error saving vehicles data:", e)
    }
}

export class VehicleService {
    static getAll(filters?: {
        status?: VehicleStatus | 'all'
        sourceEntity?: string
        category?: string
        search?: string
        isFeatured?: boolean
    }): Vehicle[] {
        let list = ensureDataFile()

        if (!filters) return list

        if (filters.status && filters.status !== 'all') {
            list = list.filter(v => v.status === filters.status)
        }

        if (filters.sourceEntity && filters.sourceEntity !== 'all') {
            list = list.filter(v => v.sourceEntity.id === filters.sourceEntity)
        }

        if (filters.category && filters.category !== 'all') {
            list = list.filter(v => v.category === filters.category)
        }

        if (filters.isFeatured !== undefined) {
            list = list.filter(v => v.isFeatured === filters.isFeatured)
        }

        if (filters.search) {
            const q = filters.search.toLowerCase()
            list = list.filter(v => 
                v.title.toLowerCase().includes(q) ||
                (v.titleAr && v.titleAr.includes(q)) ||
                v.vin.toLowerCase().includes(q) ||
                v.make.toLowerCase().includes(q) ||
                v.model.toLowerCase().includes(q) ||
                v.lotNumber.toLowerCase().includes(q)
            )
        }

        return list
    }

    static getById(id: string): Vehicle | null {
        const list = ensureDataFile()
        return list.find(v => v.id === id || v.lotNumber === id) || null
    }

    static create(input: Partial<Vehicle>): Vehicle {
        const list = ensureDataFile()
        const now = new Date().toISOString()
        const id = input.id || `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
        const lotNumber = input.lotNumber || `LOT-${new Date().getFullYear()}-${String(list.length + 1).padStart(3, '0')}`

        // Entity fallback
        let entity: SourceEntity = KNOWN_ENTITIES['saaed']
        if (input.sourceEntity?.id && KNOWN_ENTITIES[input.sourceEntity.id]) {
            entity = KNOWN_ENTITIES[input.sourceEntity.id]
        } else if (input.sourceEntity?.name) {
            entity = {
                id: (input.sourceEntity.id || 'other') as EntityId,
                name: input.sourceEntity.name,
                arabicName: input.sourceEntity.arabicName || input.sourceEntity.name,
                logo: input.sourceEntity.logo || '/images/saaed-logo.png'
            }
        }

        const newVehicle: Vehicle = {
            id,
            lotNumber,
            vin: input.vin || 'VIN-PENDING',
            title: input.title || `${input.year || ''} ${input.make || ''} ${input.model || ''}`.trim() || 'Untitled Lot',
            titleAr: input.titleAr,
            make: input.make || 'Unknown',
            model: input.model || 'Unknown',
            year: input.year || new Date().getFullYear(),
            trim: input.trim || '',
            bodyType: input.bodyType || 'Sedan',
            category: input.category || 'motors',
            mileageKm: Number(input.mileageKm) || 0,
            exteriorColor: input.exteriorColor || 'Unspecified',
            exteriorColorAr: input.exteriorColorAr,
            interiorColor: input.interiorColor || 'Unspecified',
            interiorColorAr: input.interiorColorAr,
            engine: input.engine || 'Standard',
            engineAr: input.engineAr,
            powerHp: Number(input.powerHp) || 0,
            transmission: input.transmission || 'Automatic',
            transmissionAr: input.transmissionAr,
            acceleration0100: input.acceleration0100,
            fuelType: input.fuelType || 'Petrol',
            startingBid: Number(input.startingBid) || 10000,
            minimumIncrement: Number(input.minimumIncrement) || 1000,
            reservePrice: input.reservePrice ? Number(input.reservePrice) : undefined,
            currentBid: Number(input.currentBid) || Number(input.startingBid) || 10000,
            buyNowPrice: input.buyNowPrice ? Number(input.buyNowPrice) : undefined,
            depositRequiredAed: Number(input.depositRequiredAed) || Math.round((Number(input.startingBid) || 10000) * 0.05),
            bidsCount: Number(input.bidsCount) || 0,
            bidsHistory: input.bidsHistory || [],
            status: input.status || 'draft',
            startDate: input.startDate || now,
            endDate: input.endDate || new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
            isFeatured: Boolean(input.isFeatured),
            thumbnail: input.thumbnail || input.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop',
            images: (input.images && input.images.length > 0) ? input.images : [input.thumbnail || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop'],
            videoUrl: input.videoUrl,
            sourceEntity: entity,
            location: input.location || {
                branchNameEn: "Saaed Main Auction Branch",
                branchNameAr: "فرع مزاد ساعد الرئيسي",
                yardName: "Al Aweer Yard",
                addressEn: "Al Aweer Auto Market, Dubai",
                addressAr: "سوق العوير للسيارات، دبي",
                latitude: 25.1764,
                longitude: 55.3908,
                googleMapsUrl: "https://maps.google.com/maps?q=25.1764,55.3908"
            },
            inspection: input.inspection,
            aiInsight: input.aiInsight,
            notes: input.notes,
            notesAr: input.notesAr,
            createdAt: now,
            updatedAt: now
        }

        list.unshift(newVehicle)
        saveDataFile(list)
        return newVehicle
    }

    static bulkCreate(vehiclesInput: Partial<Vehicle>[]): { created: Vehicle[]; count: number } {
        const created: Vehicle[] = []
        for (const item of vehiclesInput) {
            const v = this.create(item)
            created.push(v)
        }
        return { created, count: created.length }
    }

    static updateStatus(id: string, newStatus: VehicleStatus): Vehicle | null {
        const list = ensureDataFile()
        const index = list.findIndex(v => v.id === id || v.lotNumber === id)
        if (index === -1) return null

        list[index].status = newStatus
        list[index].updatedAt = new Date().toISOString()

        // If pushing to live, ensure startDate is now if in past or unassigned
        if (newStatus === 'live') {
            list[index].startDate = new Date().toISOString()
        }

        saveDataFile(list)
        return list[index]
    }

    static placeBid(id: string, amount: number, bidderName = 'Registered Bidder'): { success: boolean; vehicle?: Vehicle; error?: string; isBuyNow?: boolean } {
        const list = ensureDataFile()
        const index = list.findIndex(v => v.id === id || v.lotNumber === id)
        if (index === -1) return { success: false, error: 'Vehicle not found' }

        const vehicle = list[index]
        
        // 1. Concurrency / Database Lock Check for "Buy It Now" (FIFO)
        if (vehicle.status === 'sold' || vehicle.status === 'ended') {
            return { success: false, error: 'Auction has already ended or the vehicle was sold via Buy It Now.' }
        }
        
        if (vehicle.status !== 'live') {
            return { success: false, error: 'Auction is not currently live for bidding' }
        }

        const now = new Date()
        const endDate = new Date(vehicle.endDate)
        
        if (now > endDate) {
            vehicle.status = 'ended'
            saveDataFile(list)
            return { success: false, error: 'Auction time has expired' }
        }

        // Handle Buy It Now execution
        let isBuyNow = false
        if (vehicle.buyNowPrice && amount >= vehicle.buyNowPrice) {
            amount = vehicle.buyNowPrice
            vehicle.status = 'sold'
            isBuyNow = true
        } else if (amount < vehicle.currentBid + vehicle.minimumIncrement) {
            return {
                success: false,
                error: `Bid amount must be at least AED ${(vehicle.currentBid + vehicle.minimumIncrement).toLocaleString()}`
            }
        }

        // 2. Anti-Sniping (التمديد المضاد للقنص)
        // If within the last 2 minutes, extend by 2 minutes, up to max 10 times.
        if (!isBuyNow) {
            const timeRemainingMs = endDate.getTime() - now.getTime()
            if (timeRemainingMs > 0 && timeRemainingMs <= 2 * 60 * 1000) {
                vehicle.extensionsCount = vehicle.extensionsCount || 0
                if (vehicle.extensionsCount < 10) {
                    vehicle.endDate = new Date(endDate.getTime() + 2 * 60 * 1000).toISOString()
                    vehicle.extensionsCount++
                }
            }
        }

        const newBid: VehicleBid = {
            id: `bid_${Date.now()}`,
            bidderName,
            amount,
            timestamp: new Date().toISOString()
        }

        vehicle.currentBid = amount
        vehicle.bidsCount = (vehicle.bidsCount || 0) + 1
        vehicle.bidsHistory = vehicle.bidsHistory || []
        vehicle.bidsHistory.unshift(newBid)
        vehicle.updatedAt = new Date().toISOString()

        saveDataFile(list)
        return { success: true, vehicle, isBuyNow }
    }
}
