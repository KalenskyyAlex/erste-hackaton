import {ProductRequest} from "@/app/api/product/common";

export async function POST(body: ProductRequest) {
    return Response.json("OK")
}