import ReceiptReader from "@/app/api/util/modules/receipt";
import ProductReader from "@/app/api/util/modules/prod";
import {NextRequest} from "next/server";
import OrgReader from "@/app/api/util/modules/org";

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
    const receipts: [ReceiptEntry] = await (new ReceiptReader()).readData();
    const organizations: any[] = await (new OrgReader()).readData()

    console.log(body.userId);
    const user_receipts = receipts.filter(entry => entry.user_id === body.userId)

    const by_months = user_receipts.reduce((acc: any, receipt) => {
        const [_, month, year] = receipt.issue_date.split(" ")[0].split(".");
        const monthYear = `${month}.${year}`;

        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }

        const organization = organizations.filter(entry => {
            return entry.id == receipt.organization_id
        })

        let receipt_reduced: any = {}
        receipt_reduced.id = receipt.id;
        receipt_reduced.issue_date = receipt.issue_date;
        receipt_reduced.total_price = receipt.total_price;
        receipt_reduced.organization = organization;

        acc[monthYear].push(receipt_reduced);

        return acc;
    }, {});
    return Response.json(by_months);
}