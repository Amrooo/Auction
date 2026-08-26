import { NextResponse } from 'next/server'

export async function GET() {
    const schema = {
        title: "Saaed Auction Admin Vehicle Ingestion & Push-to-Live Web Service",
        version: "1.0.0",
        description: "Official REST Web Service API documentation and schema specification for Google AI Studio / Admin Systems to push single/bulk vehicles and publish them live to the Saaed Auction website.",
        endpoints: [
            {
                path: "/api/vehicles",
                method: "GET",
                description: "List vehicles with filtering (status=live, draft, approved, all).",
                queryParams: {
                    status: "draft | pending_approval | approved | live | paused | ended | all (default: all)",
                    sourceEntity: "dmt | abu-dhabi-mobility | dubai-police | abu-dhabi-police | dubai-customs | saaed",
                    category: "motors | real estate | jewelry | plates | watches | general",
                    search: "string (matches title, make, model, vin, lotNumber)",
                    featured: "boolean (true | false)"
                }
            },
            {
                path: "/api/vehicles",
                method: "POST",
                description: "Ingest a single vehicle (draft or live).",
                requestBodyExample: {
                    vin: "W1N463***291",
                    title: "2024 Mercedes-AMG G63",
                    titleAr: "مرسيدس AMG G63 2024",
                    make: "Mercedes-Benz",
                    model: "G63 AMG",
                    year: 2024,
                    trim: "Grand Edition",
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
                    startingBid: 800000,
                    minimumIncrement: 5000,
                    currentBid: 950000,
                    depositRequiredAed: 47500,
                    status: "live",
                    startDate: "2026-08-26T10:00:00Z",
                    endDate: "2026-08-26T18:00:00Z",
                    isFeatured: true,
                    thumbnail: "https://example.com/photo.jpg",
                    images: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
                    sourceEntity: {
                        id: "abu-dhabi-mobility"
                    },
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
                        summaryEn: "This lot is currently undervalued by 8% compared to similar G63 Grand Edition models.",
                        summaryAr: "هذا العرض مقيّم بأقل من قيمته بنسبة ٨٪ مقارنةً بطرازات G63 المماثلة."
                    }
                }
            },
            {
                path: "/api/vehicles/bulk",
                method: "POST",
                description: "Ingest batch of vehicles from Excel parser or Google AI Studio payload.",
                requestBodyExample: {
                    vehicles: [
                        {
                            vin: "ZHWUB1***842",
                            make: "Lamborghini",
                            model: "Urus",
                            year: 2022,
                            startingBid: 950000,
                            minimumIncrement: 10000,
                            status: "live",
                            sourceEntity: { id: "dubai-police" }
                        }
                    ]
                }
            },
            {
                path: "/api/vehicles/[id]/status",
                method: "PATCH",
                description: "Approve draft vehicle and push it to live auction website.",
                requestBodyExample: {
                    action: "push_to_live"
                }
            },
            {
                path: "/api/vehicles/[id]/bid",
                method: "POST",
                description: "Submit live bid from user.",
                requestBodyExample: {
                    amount: 960000,
                    bidderName: "Bidder #7701"
                }
            }
        ],
        excelColumnMappingGuide: {
            "VIN / Chassis Number": "vin",
            "Lot Number": "lotNumber",
            "Vehicle Title": "title",
            "Vehicle Title (Arabic)": "titleAr",
            "Make / Manufacturer": "make",
            "Model": "model",
            "Year": "year",
            "Trim / Edition": "trim",
            "Body Type": "bodyType",
            "Mileage (KM)": "mileageKm",
            "Exterior Color": "exteriorColor",
            "Interior Color": "interiorColor",
            "Engine Spec": "engine",
            "Horsepower (HP)": "powerHp",
            "Transmission": "transmission",
            "Starting Bid (AED)": "startingBid",
            "Bid Increment (AED)": "minimumIncrement",
            "Current Bid (AED)": "currentBid",
            "Deposit (AED)": "depositRequiredAed",
            "Source Entity ID (dmt, abu-dhabi-mobility, dubai-police, abu-dhabi-police, dubai-customs, saaed)": "sourceEntity.id",
            "Inspection Grade": "inspection.grade",
            "Main Image URL": "thumbnail",
            "Image Gallery URLs (comma-separated)": "images",
            "Status (draft / approved / live)": "status",
            "Auction Start Date (ISO)": "startDate",
            "Auction End Date (ISO)": "endDate"
        },
        supportedSourceEntities: [
            { id: "dmt", name: "Department of Municipalities & Transport", arabicName: "دائرة البلديات والنقل", logo: "/images/dmt-logo.png" },
            { id: "abu-dhabi-mobility", name: "Abu Dhabi Mobility", arabicName: "أبوظبي للتنقل", logo: "/images/abu-dhabi-mobility.png" },
            { id: "dubai-police", name: "Dubai Police", arabicName: "شرطة دبي", logo: "/images/dubai-police.png" },
            { id: "abu-dhabi-police", name: "Abu Dhabi Police", arabicName: "شرطة أبوظبي", logo: "/images/abu-dhabi-police-transparent.png" },
            { id: "dubai-customs", name: "Dubai Customs", arabicName: "جمارك دبي", logo: "/images/dubai-customs.png" },
            { id: "saaed", name: "Saaed Traffic Systems", arabicName: "شركة ساعد للأنظمة المرورية", logo: "/images/saaed-logo.png" }
        ]
    }

    return NextResponse.json(schema, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
