import ReceiptReader from "@/app/api/util/modules/receipt";
import ProductReader from "@/app/api/util/modules/prod";
import {NextRequest} from "next/server";

interface UserHistoryRequest {
    userId: number;
    // page: number;
}

interface ReceiptEntry {
    id: number,
    receipt_id: string,
    issue_date: string,
    organization_id: number,
    user_id: number,
    total_price: number
}

export async function POST(body_: NextRequest) {
    const body = await body_.json();
    console.log(body);
    const receipts: [ReceiptEntry] = await (new ReceiptReader()).readData();
    const products = await (new ProductReader()).readData();

    console.log(body.userId);
    const user_receipts = receipts.filter(entry => entry.user_id === body.userId)

    const by_months = user_receipts.reduce((acc: any, receipt) => {
        // Extract month and year from the issue_date
        const [_, month, year] = receipt.issue_date.split(" ")[0].split(".");
        const monthYear = `${month}.${year}`;

        // Initialize the month-year key if it doesn't exist
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }

        let receipt_reduced: any = {}
        receipt_reduced.id = receipt.id;
        receipt_reduced.issue_date = receipt.issue_date;
        receipt_reduced.organization_id = receipt.organization_id;
        receipt_reduced.total_price = receipt.total_price;
        // Add the receipt to the appropriate month-year group
        acc[monthYear].push(receipt_reduced);

        return acc;
    }, {});
    return Response.json(by_months);
}