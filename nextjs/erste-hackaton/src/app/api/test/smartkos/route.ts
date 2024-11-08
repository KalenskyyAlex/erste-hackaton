import ReceiptReader from "@/app/api/util/modules/receipt";
import ProductItemReader from "@/app/api/util/modules/proditem";
import SmartKosSigma from "@/app/api/util/smartkos/smartkosSigma";
import ProductReader from "@/app/api/util/modules/prod";

/*interface OrgEntity {
    id: number,
    name: string,
    category: string
}

interface ProductEntity {
    // id: number,
    // name: string,
    // item_type: string,
    // price: number,
    // vat_rate: number,
    // organization_id: number,
    // org_unit_id: number,
    // created_date: string,
    // last_modified_date:string,
    // created_by: string,
    // last_modified_by: string,
    // is_overridden: string,
    // category_id: number
    id: number,
    name: string
    price: number,
    frequency: number,
    category: string
}

interface ReceiptEntity {
    id: number,
    receipt_id: string,
    issue_date: string,
    organization_id: number,
    user_id: number,
    total_price: number
}

interface ProdRecEntity {
    quantity: number,
    product_id: number,
    fs_receipt_id: number
}

const userId = 7;
const orgId = 1;*/


export async function GET() {
    /*const receipts: ReceiptEntity[] = await (new ReceiptReader()).readData();
    const recProdIds: ProdRecEntity[] = await (new ProductItemReader()).readData();
    const products: ProductEntity[] = await (new ProductReader()).readData();

    const user_receipts = receipts.filter(entry =>
        entry.user_id === userId && entry.organization_id === orgId
    );

    const receiptIds = user_receipts.map(receipt => receipt.id);

    const user_prods_ids = recProdIds.filter(entry =>
        receiptIds.includes(entry.fs_receipt_id)
    ).map(obj => obj.product_id);

    const user_prods = products.filter(entry => user_prods_ids.includes(parseInt(entry.id)))*/


    return Response.json(new SmartKosSigma().get());
}
