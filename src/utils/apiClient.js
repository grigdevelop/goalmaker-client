class ApiClient{

    constructor(){
        this.token = '';
    }

    setHttpClient(httpClient){
        this.httpClient = httpClient;
    }

    post(url, data){
        return this.httpClient.post(url, data);
    }

    setAuthToken(token){
        this.token = token;
    }

    hasToken(){
        if(this.token){
            return true;
        }
        return false;
    }
}

let client = new ApiClient();
export default client;
