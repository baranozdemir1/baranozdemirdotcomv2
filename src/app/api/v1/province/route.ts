import {type NextRequest} from 'next/server'
import turkey from '@/data/turkey.json'

function setCorsHeaders(response, req) {
    const allowedOrigins = ['https://flower.weblimes.com', 'https://flower2.weblimes.com'];
    const requestOrigin = req.headers.get('Origin');
    if (allowedOrigins.includes(requestOrigin)) {
        response.headers.set('Access-Control-Allow-Origin', requestOrigin)
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    return response
}

export async function OPTIONS() {
    const response = new NextResponse(null, {status: 204})
    const req = new NextRequest()
    return setCorsHeaders(response, req)
}

export async function POST(req: NextRequest) {
    const {province, district, town, list} = await req.json()

    if (list) {
        const res = new Response(JSON.stringify(turkey), {headers: {'Content-Type': 'application/json'}})
        return setCorsHeaders(res, req)
    }

    if (!province && !district && !town) {
        const res = new Response(JSON.stringify({error: 'At least one of province, district or town is required'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'}
        })
        return setCorsHeaders(res, req)
    }

    const provinceData = province ? turkey.find((item) => item.province.toLowerCase() === province.toLowerCase()) : null

    if (province && !provinceData) {
        const res = new Response(JSON.stringify({error: 'Province not found'}), {
            status: 404,
            headers: {'Content-Type': 'application/json'}
        })
        return setCorsHeaders(res, req)
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
        const res = new Response(JSON.stringify({error: 'District not found'}), {
            status: 404,
            headers: {'Content-Type': 'application/json'}
        })
        return setCorsHeaders(res, req)
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
        const res = new Response(JSON.stringify({error: 'Town not found'}), {
            status: 404,
            headers: {'Content-Type': 'application/json'}
        })
        return setCorsHeaders(res, req)
    }

    if (townData) {
        const res = new Response(JSON.stringify(townData), {headers: {'Content-Type': 'application/json'}})
        return setCorsHeaders(res, req)
    } else if (districtData) {
        const res = new Response(JSON.stringify(districtData), {headers: {'Content-Type': 'application/json'}})
        return setCorsHeaders(res, req)
    } else if (provinceData) {
        const res = new Response(JSON.stringify(provinceData), {headers: {'Content-Type': 'application/json'}})
        return setCorsHeaders(res, req)
    }
}
