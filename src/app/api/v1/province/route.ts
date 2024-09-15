import {type NextRequest} from 'next/server'
import turkey from '@/data/turkey.json'

export const dynamic = 'force-static'

export async function POST(req: NextRequest) {
    const {province, district, town} = await req.json()

    if (!province && !district && !town) {
        return new Response.json({error: 'At least one of province, district or town is required'}, {status: 400})
    }

    const provinceData = province ? turkey.find((item) => item.province.toLowerCase() === province.toLowerCase()) : null

    if (province && !provinceData) {
        return new Response.json({error: 'Province not found'}, {status: 404})
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
        return new Response.json({error: 'District not found'}, {status: 404})
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
        return new Response.json({error: 'Town not found'}, {status: 404})
    }

    if (townData) {
        return new Response.json(townData)
    } else if (districtData) {
        return new Response.json(districtData)
    } else if (provinceData) {
        return new Response.json(provinceData)
    }
}
