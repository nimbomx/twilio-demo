import React, {useContext, useState} from 'react';
import {MyContext} from '../../App'
import './Auth.scss';


const LogIn = () => {
     const {baseURL,isAuth, setIsAuth, setToken,setUser} = useContext(MyContext)
    let credentials = {
        "email":"test2@test.test",
        "password":"password"
    };

    const logIn = () => {
        fetch(baseURL + 'login',{
            method: 'POST',
            body:JSON.stringify(credentials),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            setIsAuth(true)
            setToken(myJson.token)
            setUser(myJson.user)
        });
    }


    return  (

            <div className="LogIn">
                <h1>LogIn</h1>
        {isAuth && "Auth"}
                <button onClick={logIn}>Log In</button>
            </div> 

    )
}

export default LogIn;
