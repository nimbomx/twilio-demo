import React, {useState, useContext} from 'react';
import './Auth.scss';
import {MyContext} from '../../App'

const SignIn = ({onShow}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');


    const [errors, setErrors] = useState({});

    const {baseURL} = useContext(MyContext)

    const signIn = evt => {
        evt.preventDefault();
        fetch(baseURL + 'register',{
            method: 'POST',
            body:JSON.stringify({
                email, password, password_confirmation,phone, name
            }),
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
            if(myJson.errors){

                setErrors(myJson.errors)
                
            }else{
                onShow()
            }
        });
    }
    return  (
        <div className="d-flex flex-direction-column align-items-center float-margin">
    <form className="SignIn card mb20" onSubmit={signIn}>
        <h1 className="d-flex"><img src="/assets/TrueCare24_logo.svg"/> Sign In</h1>
        <div className="input-group">
            <input className={errors.name && "error" }  value={name} onChange={ e => setName(e.target.value)} placeholder="Name" />
            {errors.name && <small>{errors.name[0]}</small>}
        </div>
        <div className="input-group">
            <input className={errors.email && "error" }  value={email} onChange={ e => setEmail(e.target.value)} placeholder="Email" type="email"/>
            {errors.email && <small>{errors.email[0]}</small>}
        </div>
        <div className="input-group">
            <input className={errors.phone && "error" }  value={phone} onChange={ e => setPhone(e.target.value)} placeholder="Phone" type="number"/>
            {errors.phone && <small>{errors.phone[0]}</small>}
        </div>
        <div className="input-group">
            <input className={errors.password && "error" }  onChange={ e => setPassword(e.target.value)} placeholder="Password" type="password"/>
            {errors.password && <small>{errors.password[0]}</small>}
        </div>
        <div className="input-group">
            <input value={password_confirmation} onChange={ e => setPasswordConfirmation(e.target.value)} placeholder="Password confirmation" type="password"/>
        </div>

        
        

        <button className="btn p10" type="submit">Sign In</button>
    </form> 
    <a href="#" onClick={onShow}>Log In</a>
    </div>
    )
}

export default SignIn;
