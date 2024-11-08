import DataReader from "../abstract.js";
import fs from 'fs';
import csv from 'csv-parser';


class OrgReader extends DataReader {
    constructor(pathToData='public/data/organizations.csv') {
        super(pathToData); // Specify the path to Product.csv
    }

    // Implementation of the readData method
    readData() {
        return new Promise((resolve, reject) => {
            const organizations = [];

            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on("data", (row) => {
                    organizations.push({
                        id: parseInt(row.id),
                        name: row.name,
                        category: row.category,
                    });
                })
                .on("end", () => {
                    console.log("CSV file successfully processed");
                    resolve(organizations);
                })
                .on("error", (error) => {
                    console.error("Error reading the CSV file:", error);
                    reject(error);
                });
        });
    }
}

export default OrgReader;