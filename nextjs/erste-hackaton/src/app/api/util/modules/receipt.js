import DataReader from "../abstract.js";
import fs from 'fs';
import csv from 'csv-parser';

class ReceiptReader extends DataReader {
    constructor(pathToData='public/data/receipts.csv') {
        super(pathToData); // Specify the path to Product.csv
    }

    // Implementation of the readData method
    readData() {
        return new Promise((resolve, reject) => {
            const receipts = [];

            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on("data", (row) => {
                    receipts.push({
                        id: parseInt(row.id),
                        receipt_id : parseInt(row.receipt_id),
                        issue_date : row.issue_date,
                        organization_id : parseInt(row.organization_id),
                        user_id: parseInt(row.user_id)
                    });
                })
                .on("end", () => {
                    console.log("CSV file successfully processed");
                    resolve(receipts); // Resolve the promise with the parsed products array
                })
                .on("error", (error) => {
                    console.error("Error reading the CSV file:", error);
                    reject(error);
                });
        });
    }
}

export default ReceiptReader;