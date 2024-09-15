import {NextRequest, NextResponse} from 'next/server'
import turkey from '@/data/turkey.json'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'], // İzin verilen HTTP metotları
    origin: '*', // Tüm sitelerden gelen istekler için izin. Belirli bir site için URL belirtebilirsiniz.
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
})

function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',  // Change '*' to your specific domain if needed
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

export async function POST(req: NextRequest, res: NextResponse) {
    await runMiddleware(req, res, cors)

    const {province, district, town, list} = await req.json()

    const responseHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Change '*' to your specific domain if needed
    };

    if (list) {
        return new Response(JSON.stringify(turkey))
    }

    if (!province && !district && !town) {
        return new Response(JSON.stringify({error: 'At least one of province, district or town is required'}))
    }

    const provinceData = province ? turkey.find((item) => item.province.toLowerCase() === province.toLowerCase()) : null

    if (province && !provinceData) {
        return new Response(JSON.stringify({error: 'Province not found'}))
    }

    let districtData = null
    if (district) {
        if (provinceData && provinceData.districts) {
            districtData = provinceData.districts.find((item) => item.district.toLowerCase() === district.toLowerCase())
        } else if (!province) {
            for (const provinceItem of turkey) {
                districtData = provinceItem.districts.find((item) => item.district.toLowerCase() === district.toLowerCase())
                if (districtData) break
            }
        }
    }

    if (district && !districtData) {
        return new Response(JSON.stringify({error: 'District not found'}))
    }

    let townData = null
    if (town) {
        if (districtData && districtData.towns) {
            townData = districtData.towns.find((item) => item.town.toLowerCase() === town.toLowerCase())
        } else if (!district) {
            for (const provinceItem of turkey) {
                for (const distItem of provinceItem.districts) {
                    townData = distItem.towns.find((item) => item.town.toLowerCase() === town.toLowerCase())
                    if (townData) break
                }
                if (townData) break
            }
        }
    }

    if (town && !townData) {
        return new Response(JSON.stringify({error: 'Town not found'}))
    }

    if (townData) {
        return new Response(JSON.stringify(townData))
    } else if (districtData) {
        return new Response(JSON.stringify(districtData))
    } else if (provinceData) {
        return new Response(JSON.stringify(provinceData))
    }
}
