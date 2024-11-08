import DataReader from "../abstract.js";
import fs from 'fs';
import csv from 'csv-parser';


class CatProdReader extends DataReader {
    constructor(pathToData='public/data/category_to_product.csv') {
        super(pathToData); // Specify the path to Product.csv
    }

    // Implementation of the readData method
    readData() {
        return new Promise((resolve, reject) => {
            const categorypords = [];

            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on("data", (row) => {
                    // Assuming CSV rows have 'name', 'price', 'frequency', and 'category' fields
                    categorypords.push({
                        product_id: parseInt(row.product_id),
                        category_id: parseInt(row.category_id),
                    });
                })
                .on("end", () => {
                    console.log("CSV file successfully processed");
                    resolve(categorypords); // Resolve the promise with the parsed products array
                })
                .on("error", (error) => {
                    console.error("Error reading the CSV file:", error);
                    reject(error);
                });
        });
    }
}

export default CatProdReader;