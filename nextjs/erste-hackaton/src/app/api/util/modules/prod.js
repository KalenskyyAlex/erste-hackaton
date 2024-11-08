import DataReader from "../abstract.js";
import fs from 'fs';
import csv from 'csv-parser';


class ProductReader extends DataReader {
  constructor(pathToData='public/data/products.csv') {
    super(pathToData); // Specify the path to Product.csv
  }

  // Implementation of the readData method
  readData() {
    return new Promise((resolve, reject) => {
      const products = [];

      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on("data", (row) => {
          // Assuming CSV rows have 'name', 'price', 'frequency', and 'category' fields
          products.push({
            id: row.id,
            name: row.name.trim(),
            price: parseFloat(row.price),
            frequency: parseInt(row.frequency),
            category: row.category,
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          resolve(products); // Resolve the promise with the parsed products array
        })
        .on("error", (error) => {
          console.error("Error reading the CSV file:", error);
          reject(error);
        });
    });
  }
}

export default ProductReader;