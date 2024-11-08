import ReceiptReader from "@/app/api/util/modules/receipt";
import ProductReader from "@/app/api/util/modules/prod";
import ProdItemReader from "@/app/api/util/modules/proditem";
import OrgReader from "@/app/api/util/modules/org";
import {NextRequest} from "next/server";

interface UserInfoRequest {
    userId: number;
    receiptId: number;
}

export async function POST(body_: NextRequest) {
    const body: UserInfoRequest = await body_.json();
    const receipts : any[] = await (new ReceiptReader()).readData()
    const product_items = await (new ProdItemReader()).readData();
    const products = await (new ProductReader()).readData();


    const receipt : any = receipts.filter(entry => entry.id === body.receiptId)

    const organizations: any[] = await (new OrgReader()).readData()
    const organization = organizations.filter(entry => {
        return entry.id == receipt[0].organization_id
    })

    const products_receipt_ids = product_items
        .filter((entry: any) => entry.fs_receipt_id == receipt[0].id)
        .map((entry: any) => entry.product_id)

    const products_receipt: any = [];

    products_receipt_ids.forEach((index: number) => {
        products_receipt.push(products[index]);
    })

    const response: any = {
        organization: organization[0],
        products: products_receipt
    }

    return Response.json(response)
}