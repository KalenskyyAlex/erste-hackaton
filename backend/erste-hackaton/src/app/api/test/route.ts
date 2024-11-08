import ProductReader from "@/app/api/util/modules/prod";

export async function GET() {
    const productReader = new ProductReader("public/data/products.csv");

    try {
        const products = await productReader.readData();
        console.log("Products:", products);
    } catch (error) {
        console.error("Failed to read products:", error);
    }

    return Response.json("OK")
}