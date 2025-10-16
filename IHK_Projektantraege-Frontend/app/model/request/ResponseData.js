class ResponseData {
    #error;
    #data;
  
    constructor(error, data) {
      this.error = error;
      this.data = data;
    }
  
    get error() {
      return this.#error;
    }
  
    set error(value) {
      this.#error = value;
    }
  
    get data() {
      return this.#data;
    }
  
    set data(value) {
      this.#data = value;
    }
  }
  
  export default ResponseData;
  