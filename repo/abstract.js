// Abstract class DataReader
export default class DataReader {
  constructor(filePath) {
    if (new.target === DataReader) {
      throw new TypeError("Cannot instantiate an abstract class.");
    }
    this.filePath = filePath;
  }

  // Abstract method to read data, to be implemented in the subclass
  readData() {
    throw new Error("Method 'readData()' must be implemented.");
  }
}