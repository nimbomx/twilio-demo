import React, {useContext, useEffect, useState} from 'react';
import {MyContext} from '../App'

const Config = () => {
    
    const {baseURL, token, setShowConfig} = useContext(MyContext)
    const [twilio_account, setAccount] = useState('');
    const [twilio_token, setToken] = useState('');
    const [twilio_number, setNumber] = useState('');

    const [errors, setErrors] = useState({});

    const close = e => {
        e.persist()
        if (e.target.className == 'Config' || e.target.className == 'close')
        setShowConfig(false)
    }
    useEffect(() => {
        if(token){
            fetch(baseURL + 'config',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response)
                if(response.ok)
                    return response.json();
            })
            .then((myJson) => {
                if(myJson){
                    setAccount(myJson.twilio_account_sid || '');
                    setToken(myJson.twilio_auth_token || '');
                    setNumber(myJson.twilio_number || '');
                }
            });
        }
    }, []);

    const update = evt => {
         evt.preventDefault();
        fetch(baseURL + 'config',{
            method: 'PUT',
            body:JSON.stringify({
                twilio_account, twilio_token, twilio_number
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
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

            if(myJson.errors){
                setErrors(myJson.errors)
            }else{
                alert('config updated!')
            }
            
        });
    }

    const destroy = () => {
        setAccount('');
        setToken('');
        setNumber('');
        fetch(baseURL + 'config',{
            method: 'PUT',
            body:JSON.stringify({
                twilio_account:'', twilio_token:'', twilio_number:''
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
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

            if(myJson.errors){
                setErrors(myJson.errors)
            }else{
                alert('config destroyed!')
            }
            
        });
    }
    
    return (
        <div onClick={evt => close(evt)}  className="Config">
            <div  className="card position-relative">

            <form  onSubmit={update}>
                <div onClick={evt => close(evt)} className="close">x</div>
                <div className="mb20">
                    Twilio configuration <br/>
                    <small>for security reasons, don't forget to destroy your config info</small>
                </div>

                <div>
                    <input className={errors.twilio_account && "error" } value={twilio_account} onChange={ e => setAccount(e.target.value)} placeholder="Twilio Account SID"/>
                    {errors.twilio_account && <small>{errors.twilio_account[0]}</small>}
                </div>
                <div>
                    <input className={errors.twilio_token && "error" } value={twilio_token} onChange={ e => setToken(e.target.value)} placeholder="Twilio Auth Token"/>
                    {errors.twilio_token && <small>{errors.twilio_token[0]}</small>}
                </div>
                <div>
                    <input className={errors.twilio_number && "error" } value={twilio_number} onChange={ e => setNumber(e.target.value)} placeholder="Twilio Number"/>
                    {errors.twilio_number && <small>{errors.twilio_number[0]}</small>}
                </div>

                <button className="btn m0 p12 w100" type="submit">Save</button>
            </form>
            <hr/>
            <button onClick={destroy} className="btn m0 p12 w100 red-bkg">Destroy</button>
            </div>
        </div>
    ) 

}

export default Config;