import DataReader from "../abstract.js";
import fs from 'fs';
import csv from 'csv-parser';


class CategoryReader extends DataReader {
    constructor(pathToData='public/data/category.csv') {
        super(pathToData); // Specify the path to Product.csv
    }

    readData() {
        return new Promise((resolve, reject) => {
            const categories = [];

            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on("data", (row) => {
                    // Assuming CSV rows have 'name', 'price', 'frequency', and 'category' fields
                    categories.push({
                        category_id : parseInt(row.category_id),
                        category_name : row.category_name,
                    });
                })
                .on("end", () => {
                    console.log("CSV file successfully processed");
                    resolve(categories); // Resolve the promise with the parsed products array
                })
                .on("error", (error) => {
                    console.error("Error reading the CSV file:", error);
                    reject(error);
                });
        });
    }
}

export default CategoryReader;