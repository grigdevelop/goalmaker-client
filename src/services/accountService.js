import HttpMock from "./../utils/httpMock";
import { Data } from "./../utils/mockDb";
import TokenHelper from './../utils/tokenHelper';

class AccountService{
    

    Login(username, password){
        return HttpMock.post(() => {
            let user = Data('users').find(u => u.username === username && u.password === password);
            if(!user){
                throw new Error("username or password invalid");
            }
            HttpMock.setToken(TokenHelper.token(user));
            return user;
        });
    }

    IsAuthenticated(){
        //TODO: later, may be good idea to always validate token
        let hasToken = HttpMock.hasToken();
        return hasToken;        
    }

}

export default AccountService;