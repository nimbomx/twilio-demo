import React, {useState, useContext, useEffect} from 'react';
import './Providers.scss';
import {MyContext} from '../../App'


const Provider = ({provider}) => {
    
    const [showStatusMenu, setShowStatusMenu] = useState(false);

    const {baseURL, token, isAuth} = useContext(MyContext);

    let source = null;
    const call = (id)=>{
        console.log('start call');
        fetch(baseURL + 'twilio/connect_call',{
            method: 'POST',
            body:JSON.stringify({
                id:id
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(myJson) {
            startStream(id);
            console.log('call started');
        });
        

    }
    const startStream = (ID)=>{
        source = new EventSource(baseURL + 'twilio/sse/' + ID);
        source.onmessage = (event) => {
            console.log(event.data);
            if(event.data == 'a:completed' || event.data == 'a:no-answer') stopStream();
            if(event.data == 'p:completed' || event.data == 'p:no-answer') stopStream();
        };
          
    }
    const stopStream = ()=>{
        if(source)
            source.close(); 
        console.log('Stream stoped')

    }

 
    const callMe = id => {
        fetch(baseURL + 'twilio/callme',{
                method: 'POST',
                body:JSON.stringify({
                    id:id
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
    const renderSwitch = (param) => {
        switch(param) {
          case 'contacting':
            return <span><img src="/assets/Contacting 0.svg"/> Contacting</span>;
          case 'talked':
            return <span><img src="/assets/Talked to the client.svg"/> Talked to the client</span>;
          case 'scheduled':
            return <span><img src="/assets/Assessment scheduled.svg"/> Assessment scheduled</span>;
          case 'signed':
            return <span><img src="/assets/Contract Signed.svg"/> Contract Signed</span>;
        default:
            return <span><img src="/assets/Cancel the client.svg"/> Cancel the client</span>;

        }
      }
    return  (
        <tr>
            <td>
                {provider.contracted ? <img src="/assets/Contracted.svg"/> : <img src="/assets/Non Contracted.svg"/>}
                {provider.type == 'agency' ? <img src="/assets/Home care agency.svg"/> : <img src="/assets/IC.svg"/>}
            </td>
            <td>{provider.name}</td>
            <td>{provider.email}</td>
            <td>{provider.phone}</td>
            <td>{provider.id}</td>

            <td className="position-relative">
                {showStatusMenu && <div className="status-menu card shadow" onClick={() => setShowStatusMenu(false)}>Status Menu</div>}
                <button onClick={() => setShowStatusMenu(true)}>
                {renderSwitch(provider.status)}
                </button>
            </td>

            <td>
                <button>Chat</button>
                <button onClick={() => call(provider.id)}>Call</button>
                <button onClick={() => {alert('options list')}}><img src="/assets/kebab menu.svg"/></button>
            </td>
        </tr>
    )

}

export default Provider;

/*
 <tr key={provider.id}>
                        
                    </tr>*/