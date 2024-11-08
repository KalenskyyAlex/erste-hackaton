interface ProductPriceRequest {
    productId: number;
}

export async function POST(body: ProductPriceRequest) {
    return Response.json("OK")
}