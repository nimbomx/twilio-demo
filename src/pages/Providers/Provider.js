import React, {useState, useContext, useEffect} from 'react';
import './Providers.scss';
import {MyContext} from '../../App'


const Provider = ({provider}) => {
    
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);

    const {baseURL, token, setShowFeedback} = useContext(MyContext);

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
            return <span><img src="/assets/Contacting 0.svg"/> <span>Contacting</span></span>;
          case 'talked':
            return <span><img src="/assets/Talked to the client.svg"/> <span>Talked to the client</span></span>;
          case 'scheduled':
            return <span><img src="/assets/Assessment scheduled.svg"/> <span>Assessment scheduled</span></span>;
          case 'signed':
            return <span><img src="/assets/Contract Signed.svg"/> <span>Contract Signed</span></span>;
        default:
            return <span><img src="/assets/Cancel the client.svg"/> <span>Cancel the client</span></span>;

        }
      }
    return  (
        <tr className={provider.status == "cancel" ? "cancel" : ""}>
            <td className="d-flex">
                {provider.contracted ? <img className="p5" src="/assets/Contracted.svg"/> : <img className="p5" src="/assets/Non Contracted.svg"/>}
                {provider.type == 'agency' ? <img className="p5" src="/assets/Home care agency.svg"/> : <img className="p5" src="/assets/IC.svg"/>}
            </td>
            <td><b>{provider.name}</b></td>
            <td>{provider.email}</td>
            <td>{provider.phone}</td>
            <td>{provider.id}</td>

            <td className="position-relative">
                {showStatusMenu && <div className="status-menu card shadow" onClick={() => setShowStatusMenu(false)}>
                    <button className="btn status"><span><img src="/assets/Contacting 0.svg"/> <span>Contacting</span></span></button>
                    <button className="btn status"><span><img src="/assets/Talked to the client.svg"/> <span>Talked to the client</span></span></button>
                    <button className="btn status"><span><img src="/assets/Assessment scheduled.svg"/> <span>Assessment scheduled</span></span></button>
                    <button className="btn status"><span><img src="/assets/Contract Signed.svg"/> <span>Contract Signed</span></span></button>
                    <button className="btn status"><span><img src="/assets/Cancel the client.svg"/> <span>Cancel the client</span></span></button>
                </div>}
                <button className="btn status" onClick={() => setShowStatusMenu(true)}>
                {renderSwitch(provider.status)}
                </button>
            </td>

            <td className="nowrap text-right position-relative">
                <button className="btn">Chat</button>
                <button className="btn green" onClick={() => call(provider.id)}>Call</button>

                {showOptionsMenu && <div className="options-menu card shadow" onClick={() => setShowOptionsMenu(false)}>
                    <button className="btn"><span>Send intro</span></button>
                    <button onClick={ () => setShowFeedback(true)} className="btn"><span>Provide feedback</span></button>
                    <button className="btn"><span>Send reminder</span></button>
                    <button className="btn"><span>Background check</span></button>
                </div>}
                <button className="btn clear" onClick={() => setShowOptionsMenu(true)}><img src="/assets/kebab menu.svg"/></button>
            </td>
        </tr>
    )

}

export default Provider;

/*
 <tr key={provider.id}>
                        
                    </tr>*/