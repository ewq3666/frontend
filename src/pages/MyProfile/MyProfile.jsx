import React from 'react';
import "./styles.scss";

const MyProfile = () => {

    return (
        <>
            <div className="conteiner">
                <div className="profile-card">
                    <div className="profile-card__header">
                        <div className="profile-card__header-logo">
                            <p className='name'>AS</p>
                        </div>
                        <div className="profile-card__header-title">
                            <p className='username'>Akshay Salve</p>
                            <p>Level<b>:</b> 14</p>
                        </div>
                    </div>
                    <div className="profile-card__footer">
                        <div className="box">1
                        </div>
                        <div className="box">2
                        </div>
                        <div className="box">3
                        </div>
                        <div className="box">4
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile;