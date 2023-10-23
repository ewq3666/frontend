import React from 'react';
import "./styles.scss";

const MyProfile = () => {
    return (
        <>
            <div className='main-container'>
                <div className="container">
                    <div className="profile-card">
                        <div className="profile-card__header">
                            <div className="profile-card__header-logo">
                                <p className='name'>AS</p>
                            </div>
                            <div className="profile-card__header-title">
                                <p className='username'>Akshay Salve</p>
                                <p className='user-level'>Level<b>:</b> 14</p>
                            </div>
                        </div>
                    </div>
                    <div className="awards-card">
                        <div className="awards-card__title">
                            <p>Awards</p>
                        </div>
                        <div className="awards-card__wrapper">
                            <div className="box">
                                <img className="award-img" src={require("../../assets/images/winner.png")} alt="winner img" />
                            </div>
                            <div className="box">
                                <img className="award-img" src={require("../../assets/images/winner.png")} alt="winner img" />
                            </div>
                            <div className="box">
                                <img className="award-img" src={require("../../assets/images/winner.png")} alt="winner img" />
                            </div>
                            <div className="box">
                                <img className="award-img" src={require("../../assets/images/winner.png")} alt="winner img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyProfile;