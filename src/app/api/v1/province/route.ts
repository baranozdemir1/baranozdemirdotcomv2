import {NextRequest, NextResponse} from 'next/server'
import turkey from '@/data/turkey.json'

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

export async function POST(req: NextRequest) {
    const {province, district, town, list} = await req.json()

    const responseHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Change '*' to your specific domain if needed
    };

    if (list) {
        return new Response(JSON.stringify(turkey), {headers: responseHeaders})
    }

    if (!province && !district && !town) {
        return new Response(JSON.stringify({error: 'At least one of province, district or town is required'}), {
            status: 400,
            headers: responseHeaders
        })
    }

    const provinceData = province ? turkey.find((item) => item.province.toLowerCase() === province.toLowerCase()) : null

    if (province && !provinceData) {
        return new Response(JSON.stringify({error: 'Province not found'}), {
            status: 404,
            headers: responseHeaders
        })
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
        return new Response(JSON.stringify({error: 'District not found'}), {
            status: 404,
            headers: responseHeaders
        })
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
        return new Response(JSON.stringify({error: 'Town not found'}), {
            status: 404,
            headers: responseHeaders
        })
    }

    if (townData) {
        return new Response(JSON.stringify(townData), {headers: responseHeaders})
    } else if (districtData) {
        return new Response(JSON.stringify(districtData), {headers: responseHeaders})
    } else if (provinceData) {
        return new Response(JSON.stringify(provinceData), {headers: responseHeaders})
    }
}
