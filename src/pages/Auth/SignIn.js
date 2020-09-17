import React, {useState} from 'react';
import './Auth.scss';


const SignIn = () => {

    let registarData = {
        "email":"test2@test.test",
        "password":"password",
        "name":"name"
    };
    const signIn = () => {
        fetch('https://twilio-demo.nimbo.pro/api/register',{
            method: 'POST',
            body:JSON.stringify(registarData),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });
    }
    return  (
    <div className="SignIn">
        <h1>SignIn</h1>
        <button onClick={signIn}>Sign In</button>
    </div> 
    )
}

export default SignIn;
