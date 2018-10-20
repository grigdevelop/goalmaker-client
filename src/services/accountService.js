import apiClient from "./../utils/apiClient";
import TokenHelper from './../utils/tokenHelper';

class AccountService{
    

    Login(username, password){
        return apiClient.post('account/login',{username, password});
    }

    AuthorizeUser(user){
        apiClient.setAuthToken(TokenHelper.token(user));
    }

    IsAuthenticated(){
        //TODO: later, may be good idea to always validate token
        let hasToken = apiClient.hasToken();
        return hasToken;        
    }

}

export default AccountService;