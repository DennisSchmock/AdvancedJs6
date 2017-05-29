import React from 'react'
import Auth from '../auth/auth'

const Home = ({reRender}) =>{

    function handleSubmit(evt){
        evt.preventDefault()
        const target = evt.target
        const password = target.password.value
        const userName = target.username.value
        Auth.sendLoginToServer(userName,password,function(token){
            if(token != null){
                Auth.authenticateUser(token,userName)
                reRender()
            }
            else{
                //Todo handle response
            }
        })
    }

    function logout(){
        Auth.logout()
        reRender()
    }

    if(!Auth.isUserAuthenticated()){
   return (

       <div>
           <h1>Login</h1>
           <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                   <label>Username:</label>
                   <input className="form-control" type="text" id="userName" value={this.state.userName} onChange={this.handleChange} />
               </div>
               <div className="form-group">
                   <label>Password:</label>
                   <input className="form-control" type="password" id="password" value={this.state.password} onChange={this.handleChange} />
               </div>
               <div className="form-group">
                   <input type="submit" value="Submit" />
               </div>
           </form>
       </div>
    )}

}
export default Home