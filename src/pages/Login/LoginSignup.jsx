import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import appLogo from "../../assets/images/ewq_logo.jpg";
import registerLogo from "../../assets/images/registration-img.png";
import "./LoginSignup.scss";

const LoginSignup = () => {
    const navigate = useNavigate();

    return (
        <div className="register">
            <div className="register__main">
                <div className="register__main-logo-section">
                    <img src={appLogo} alt="" />
                    <h1>Quize Pool</h1>
                </div>
                <div className="register__main-register-logo">
                    <img src={registerLogo} alt="" />
                </div>
                <div className="register__main-login-container">
                    <h1>Login or Sign Up</h1>
                    <p>Unlock the fun! Log in or create an account to join the thrilling quiz competition and showcase your knowledge prowess.</p>
                    <div className="button-box">
                        <Button className='common-blue-btn' onClick={() => navigate('/login')}>
                            Login Now!
                        </Button>
                    </div>
                    <div className="button-box">
                        <Button className='common-blue-btn' onClick={() => navigate('/signup')}>
                            Sign Up Now!
                        </Button>
                    </div>
                    <div className="button-box">
                        <Button className='common-blue-btn' onClick={() => navigate('/')}>
                            Back to home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;