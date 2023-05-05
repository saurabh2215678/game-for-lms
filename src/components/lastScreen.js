import React from "react";
import logoImg from '../assets/images/logo.png';
import thumbImg from '../assets/images/thumb.svg';
import qrCode from '../assets/images/qr-code.png';
import Countdown from 'react-countdown';
import Button from "./button";


const LastScreen = () => {
    return(
        <div className="last-screen">
            <div className="container">
               <div style={{display : 'none'}}>
                    <Countdown 
                        date={Date.now() + 3000} 
                        onComplete={()=>window.location.reload()}
                    />
                </div> 

                <div className="logo_wrapper">
                    <a href="#" className="logo">
                        <img src={logoImg} alt="" />
                    </a>
                </div>
                <div className="full_item text-center">
                    <div className="thumb_box">
                        <img src={thumbImg} />
                    </div>
                    <h3 className="font30 fw800 color_dark mt-5">Thank you for experiencing the unique features<br/> of our E-Learning Course on</h3>

                    <h4 className="font30 fw800 color_theme my-5">Implementing Respectful Maternity Care (RMC)<br/> in Healthcare Facilities</h4>

                    <div className="btm_sec">
                        <h4 className="font30 fw800 color_dark">You too can take this<br/> course here.</h4>
                        <img src={qrCode} className="qr_code" />
                        <p className="font25 color_dark">To know more: <a href="mailto: contact@c3india.org" className="fw800">contact@c3india.org</a></p>
                        <div className="text-center my-4"><Button onClick={()=>window.location.reload()} className="btn pink_btn font32">Restart</Button></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LastScreen;