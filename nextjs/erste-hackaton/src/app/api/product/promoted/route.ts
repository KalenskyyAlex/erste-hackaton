import ProductReader from "@/app/api/util/modules/prod";

export async function POST() {
    const products = await (new ProductReader()).readData()

    const organization_id = Math.round(Math.random() * 245);

    let products_organization = products.filter((entry: any) => {
        return entry.organization_id === organization_id
    })

    if (products_organization.length === 0) {
        products_organization = products.slice(20, 25)
    }

    const selected_products: any = []
    const selected_indexes = Array.from({ length: Math.min(products_organization.length, 5) }, () => Math.round(Math.random() * products_organization.length));
    selected_indexes.forEach((index: number) => {
        selected_products.push(products_organization[index])
        const index_of = products_organization.indexOf(products_organization[index])
        products_organization.splice(1, index_of)
    })

    return Response.json(selected_products.filter((item: any) => item != null))
}