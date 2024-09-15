import {NextRequest, NextResponse} from 'next/server'
import turkey from '@/data/turkey.json'

export async function OPTIONS(request: NextRequest) {
    return new NextResponse('', {
        status: 200
    })
}

export async function POST(req: NextRequest) {
    const {province, district, town, list} = await req.json()

    if (list) {
        return new Response(JSON.stringify(turkey), {headers: {'Content-Type': 'application/json'}})
    }

    if (!province && !district && !town) {
        return new Response(JSON.stringify({error: 'At least one of province, district or town is required'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'}
        })
    }

    const provinceData = province ? turkey.find((item) => item.province.toLowerCase() === province.toLowerCase()) : null

    if (province && !provinceData) {
        return new Response(JSON.stringify({error: 'Province not found'}), {
            status: 404,
            headers: {'Content-Type': 'application/json'}
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
            headers: {'Content-Type': 'application/json'}
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
            headers: {'Content-Type': 'application/json'}
        })
    }

    if (townData) {
        return new Response(JSON.stringify(townData), {headers: {'Content-Type': 'application/json'}})
    } else if (districtData) {
        return new Response(JSON.stringify(districtData), {headers: {'Content-Type': 'application/json'}})
    } else if (provinceData) {
        return new Response(JSON.stringify(provinceData), {headers: {'Content-Type': 'application/json'}})
    }
}
