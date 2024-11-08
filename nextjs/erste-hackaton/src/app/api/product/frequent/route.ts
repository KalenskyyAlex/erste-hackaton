import ProductReader from "@/app/api/util/modules/prod";

export async function POST() {
    const products = await (new ProductReader()).readData()
    const frequent_products:any = []

    const prod_ids = Array.from({ length: 10 }, () => Math.round(Math.random() * products.length));
    prod_ids.forEach((index: number) => {
        frequent_products.push(products[index])
    })

    return Response.json(frequent_products)
}