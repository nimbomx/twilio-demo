import React, {useState, useContext, useEffect} from 'react';
import './Providers.scss';
import {MyContext} from '../../App'
import Provider from './Provider'
import Feedback from './Feedback'

const Providers = () => {

    
    const {baseURL, token, showFeedback,providers, setProviders} = useContext(MyContext);

    useEffect(() => {
        if(token){
            fetch(baseURL + 'providers',{
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
                setProviders(myJson)
            });
        }
    }, [token]);

    return  <>
    <div className="Providers card">
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

                { providers.map( (provider) => 
                    <Provider key={provider.id} provider={provider} />
                       
                ) }
            </tbody>
        </table>
    </div>
        {showFeedback && <Feedback /> }
    </>
}

export default Providers;
