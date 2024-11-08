interface ProductInfoRequest{
    productId: number;
}

export async function POST(body: ProductInfoRequest) {
    return Response.json("OK")
}