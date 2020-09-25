import React, {useContext, useState} from 'react';
import {MyContext} from '../../App'
import './Auth.scss';


const LogIn = ({onShow}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

     const {baseURL,isAuth, setIsAuth, setToken,setUser} = useContext(MyContext)

    const logIn = evt => {
        evt.preventDefault();
        fetch(baseURL + 'login',{
            method: 'POST',
            body:JSON.stringify({
                email, password
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((response) => {
            return response.json();
        })
        .catch(e => {

            console.log(e)
            return;
        })
        .then((myJson) => {
            if(myJson.token){
                setIsAuth(true)
                setToken(myJson.token)
                setUser(myJson.user)
            }else{
                console.log(myJson.errors)
                if(myJson.errors){
                    setErrors(myJson.errors)
                }
            }
            
        });
    }


    return  (
            <div className="d-flex flex-direction-column align-items-center p20">
            <form className="LogIn card mb20" onSubmit={logIn}>
                <h1 className="d-flex"><img src="/assets/TrueCare24_logo.svg"/> Log In</h1>
                <div className="input-group">
                    <input className={errors.email && "error" } value={email} onChange={ e => setEmail(e.target.value)} placeholder="Email" type="email"/>
                    {errors.email && <small>{errors.email[0]}</small>}
                </div>
                <div className="input-group">
                    <input className={errors.password && "error" } value={password} onChange={ e => setPassword(e.target.value)} placeholder="Password" type="password"/>
                    {errors.password && <small>{errors.password[0]}</small>}
                </div>
                <button className="btn p10" type="submit">Log In</button>
            </form> 
            <a href="#" onClick={onShow}>Sign In</a>
            </div>

    )
}

export default LogIn;
