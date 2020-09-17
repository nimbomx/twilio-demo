import React, {useState, useContext, useEffect} from 'react';
import './Providers.scss';
import {MyContext} from '../../App'

const Line = ({onCall}) => {

    const [showStatusMenu, setShowStatusMenu] = useState(false);

    const {token, isAuth} = useContext(MyContext);

    useEffect(() => {
        if(token){
            fetch('https://twilio-demo.nimbo.pro/api/user',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
            });
        }
        /*effect
        return () => {
            cleanup
        };*/
    }, [token]);

    return (
        <tr>
            <td><img src="/assets/Contracted.svg"/> <img src="/assets/IC.svg"/></td>
            <td>Lucile Munoz</td>
            <td>oceane.torp@brennan.us</td>
            <td>+52 (444) 535-5703</td>
            <td>7543</td>
            <td className="position-relative">
                {showStatusMenu && <div className="status-menu card shadow" onClick={() => setShowStatusMenu(false)}>Status Menu</div>}
                <button onClick={() => setShowStatusMenu(true)}>
                    <img src="/assets/Contacting 0.svg"/> Contacting
                </button>
            </td>
            <td>
                <button>Chat</button>
                <button onClick={() => onCall(7543)}>Call</button>
                <button onClick={() => {alert('options list')}}><img src="/assets/kebab menu hover.svg"/></button>
            </td>
        </tr>
    )
}
const Providers = () => {

    const [toNumber, setToNumber] = useState('');
    const {token, isAuth} = useContext(MyContext);

    let source = null;
    const call = (id)=>{
        console.log('start call');
        fetch('https://a747711fd8a4.ngrok.io/connect_call.php?ID=' + id)
        .then(function(response) {
            return response.text();
        })
        .then(function(myJson) {
            startStream(id);
            console.log('call started');
        });
        

    }
    const startStream = (ID)=>{
        source = new EventSource("https://a747711fd8a4.ngrok.io/sse.php?ID=" + ID);
        source.onmessage = (event) => {
            console.log(event.data);
            if(event.data == 'completed') stopStream();
            if(event.data == 'no-answer') stopStream();
        };
          
    }
    const stopStream = ()=>{
        if(source)
            source.close(); 
        console.log('Stream stoped')

    }

    const callMe = () => {
        //fetch('https://laravel8.twilio.nb/api/twilio/callme',{
        fetch('https://twilio-demo.nimbo.pro/api/twilio/callme',{
                method: 'POST',
                body:JSON.stringify({
                    number:toNumber
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {
                return response.text();
            })
            .then((myJson) => {
                console.log(myJson);
            });
    }
    return  <div className="Providers card">
        <div className="card__title">Matched providers</div>
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <Line onCall={call} />
                <tr>
                    <td><img src="/assets/Contracted.svg"/> <img src="/assets/IC.svg"/></td>
                    <td>Lucile Munoz</td>
                    <td>oceane.torp@brennan.us</td>
                    <td>+52 (444) 535-5703</td>
                    <td>7543</td>
                    <td onClick={() => {alert('status list')}}><img src="/assets/Contacting 0.svg"/> Contacting</td>
                    <td>
                        <button>Chat</button>
                        <button onClick={() => call(7543)}>Call</button>
                        <button onClick={() => {alert('options list')}}><img src="/assets/kebab menu hover.svg"/></button>
                    </td>
                </tr>
                <tr>
                    <td><img src="/assets/Non Contracted.svg"/> <img src="/assets/Home care agency.svg"/></td>
                    <td>Lucile Munoz</td>
                    <td>oceane.torp@brennan.us</td>
                    <td>+52 (444) 535-5703</td>
                    <td>7543</td>
                    <td onClick={() => {alert('status list')}}><img src="/assets/Talked to the client.svg"/> Talked to the client</td>
                    <td>
                        <button>Chat</button>
                        <button onClick={() => call(7543)}>Call</button>
                        <button onClick={() => {alert('options list')}}><img src="/assets/kebab menu.svg"/></button>
                    </td>
                </tr>
                <tr>
                    <td><img src="/assets/Non Contracted.svg"/> <img src="/assets/Home care agency.svg"/></td>
                    <td>Lucile Munoz</td>
                    <td>oceane.torp@brennan.us</td>
                    <td>+52 (444) 535-5703</td>
                    <td>7543</td>
                    <td onClick={() => {alert('status list')}}><img src="/assets/Assessment scheduled.svg"/> Assessment scheduled</td>
                    <td>
                        <button>Chat</button>
                        <button onClick={() => call(7543)}>Call</button>
                        <button onClick={() => {alert('options list')}}><img src="/assets/kebab menu.svg"/></button>
                    </td>
                </tr>
                <tr>
                    <td><img src="/assets/Non Contracted.svg"/> <img src="/assets/Home care agency.svg"/></td>
                    <td>Lucile Munoz</td>
                    <td>oceane.torp@brennan.us</td>
                    <td>+52 (444) 535-5703</td>
                    <td>7543</td>
                    <td onClick={() => {alert('status list')}}><img src="/assets/Contract Signed.svg"/> Contract Signed</td>
                    <td>
                        <button>Chat</button>
                        <button onClick={() => call(7543)}>Call</button>
                        <button onClick={() => {alert('options list')}}><img src="/assets/kebab menu.svg"/></button>
                    </td>
                </tr>
                <tr>
                    <td><img src="/assets/Non Contracted.svg"/> <img src="/assets/Home care agency.svg"/></td>
                    <td>Lucile Munoz</td>
                    <td>oceane.torp@brennan.us</td>
                    <td>+52 (444) 535-5703</td>
                    <td>7543</td>
                    <td onClick={() => {alert('status list')}}><img src="/assets/Cancel the client.svg"/> Cancel the client</td>
                    <td>
                        <button>Chat</button>
                        <button onClick={() => call(7543)}>Call</button>
                        <button onClick={() => {alert('options list')}}><img src="/assets/kebab menu.svg"/></button>
                    </td>
                </tr>
            </tbody>
        </table>
        {false&&<button onClick={startStream}>Start stream</button>}
        {false&&<button onClick={stopStream}>Close stream</button>}
        {token&&<div><input placeholder="Number" value={toNumber} onChange={(e) => setToNumber(e.target.value)} /><button onClick={callMe}>Call ME</button></div>}
    </div> 
}

export default Providers;
