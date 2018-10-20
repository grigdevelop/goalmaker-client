class ApiClient{

    setHttpClient(httpClient){
        this.httpClient = httpClient;
    }

    post(url, data){
        return this.httpClient.post(url, data);
    }
}

let client = new ApiClient();
export default client;
