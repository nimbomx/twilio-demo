import React, {useState, useContext, useEffect} from 'react';
import './Providers.scss';
import {MyContext} from '../../App'

const Feedback = () => {
    const {setShowFeedback} = useContext(MyContext);

    const close = e => {
        e.persist()
        if (e.target.className == 'Feedback' || e.target.className == 'close')
            setShowFeedback(false)
    }
    return (
        <div onClick={evt => close(evt)}  className="Feedback">
            <div className="card position-relative float-margin">
                <div onClick={evt => close(evt)} className="close">x</div>
                <div className="mb20">
                    Set the rating a    nd provide 
                    <br/>the feedback note:
                </div>
                <div className="mb20">
                <img className="star" src="/assets/Star yellow.svg"/>
                <img className="star" src="/assets/Star yellow.svg"/>
                <img className="star" src="/assets/Star yellow.svg"/>
                <img className="star" src="/assets/Star grey.svg"/>
                <img className="star" src="/assets/Star grey.svg"/>
                </div>
                <textarea className="m0 fit-available mb20" cols="10" placeholder="Type here"></textarea>
                <button className="btn">Save</button>
            </div>
        </div>
    )
}

export default Feedback;