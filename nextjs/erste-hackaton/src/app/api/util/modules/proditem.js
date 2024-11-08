import DataReader from "../abstract.js";
import fs from 'fs';
import csv from 'csv-parser';


class ProdItemReader extends DataReader {
    constructor(pathToData='public/data/product_item.csv') {
        super(pathToData); // Specify the path to Product.csv
    }

    // Implementation of the readData method
    readData() {
        return new Promise((resolve, reject) => {
            const proditems = [];

            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on("data", (row) => {
                    proditems.push({
                        quantity : parseInt(row.quantity),
                        product_id : parseInt(row.product_id),
                        fs_receipt_id : parseInt(row.fs_receipt_id),
                    });
                })
                .on("end", () => {
                    console.log("CSV file successfully processed");
                    resolve(proditems); // Resolve the promise with the parsed products array
                })
                .on("error", (error) => {
                    console.error("Error reading the CSV file:", error);
                    reject(error);
                });
        });
    }
}

export default ProdItemReader;