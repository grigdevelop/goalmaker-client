class HttpMock {

  constructor(){
    this.token = '';
  }

 post(callback) {
    return new Promise((res, rej) => {
      try {
        setTimeout(res(callback()), 1000);
      } catch (error) {
        rej(error);
      }
    });
  }

  get(callback) {
    return new Promise((res, rej) => {
      try {
        setTimeout(res(callback()), 1000);
      } catch (error) {
        rej(error);
      }
    });
  }

  setToken(token){
    this.token = token;
  }

  hasToken(){
    if(this.token){
      return true;
    }
    return false;
  }
}

let httpMock = new HttpMock();

export default httpMock;
