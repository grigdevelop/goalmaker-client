class TokenHelper{
    
    static token(user){
        return user.username + "|" + user.id;
    }

    /**
     * Get user info from token 
     * @param {string} token Token
     */
    static unToken(token){
        let ua = token.split('|');
        return {
            username: ua[0],
            id: ua[1]
        }
    }
}

export default TokenHelper;