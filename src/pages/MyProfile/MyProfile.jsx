import React, { useEffect, useState } from 'react';
import "./styles.scss";
import { getFirstTwoLetters, capitalizeEachWord } from "../../Helper/utility"
import { useSelector } from 'react-redux';

const MyProfile = () => {

    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    const [userData, setUserData] = useState([]);
    const awardsData = [
        {
            path: require("../../assets/images/winner.png"),
            title: "Bronze"
        },
        {
            path: require("../../assets/images/winner.png"),
            title: "Silver"
        },
        {
            path: require("../../assets/images/winner.png"),
            title: "Gold"
        },
        {
            path: require("../../assets/images/winner.png"),
            title: "Platinum"
        },
    ];

    useEffect(() => {
        setUserData([userInfo])
    }, [userInfo]);

    return (
        <>
            <div className='main-container'>
                <div className="container">
                    {true? (
                        userData?.map((ele, index) => (
                            <div className="profile-card" key={index}>
                                <div className="profile-card__header">
                                    <div className="profile-card__header-logo">
                                        <p className='name'>
                                            {getFirstTwoLetters(ele.name)}
                                        </p>
                                    </div>
                                    <div className="profile-card__header-title">
                                        <p className='username'>
                                            {capitalizeEachWord(ele.name)}
                                        </p>
                                        <p className='user-level'>Level<b>:</b> 14</p>
                                    </div>
                                </div>
                                <div className="profile-card__userdata">
                                    <div>
                                        <p>Email <span>{ele.user_email}</span></p>
                                        <p>Mobile <span>{ele.mobile}</span></p>
                                        <p>Address <span>{ele.district}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No user data available.</p>
                    )}
                    <div className="awards-card">
                        <div className="awards-card__title">
                            <p>Awards</p>
                        </div>
                        <div className="awards-card__wrapper">
                            {awardsData.map((ele, index) => (
                                <div className='flex-container' key={index}>
                                    <div className="box">
                                        <img className="award-img" src={ele.path} alt="winner img" />
                                    </div>
                                    <div className='title'>
                                        <p>{ele.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile;