import ProductReader from './repo/moduls/prod.js'

(async () => {
  const productReader = new ProductReader("./data/Optimized_Products.csv");

  try {
    const products = await productReader.readData();
    console.log("Products:", products);
  } catch (error) {
    console.error("Failed to read products:", error);
  }
})();
