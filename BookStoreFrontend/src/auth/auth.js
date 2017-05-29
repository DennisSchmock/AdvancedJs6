import axios from 'axios'

class Auth {

    static authenticateUser(token, userName) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName )
    }

     static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser(){
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
    }

    static getToken() {
        return localStorage.getItem('token');
    }
    
    static getUserName(){
        return localStorage.getItem('userName')
    }

    static sendLoginToServer(userName,password, callback){
        var url = "http://localhost:3001/api/login"
        axios.post(url,{userName:userName,password:password})
            .then((response) =>{
                var token = response.data.token
                callback(token)
            })
            .catch((error) =>{
                console.log(error)
                callback(null)
            })
    }

}

export default auth