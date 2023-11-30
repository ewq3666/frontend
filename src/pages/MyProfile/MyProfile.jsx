import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosSettings } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';
import { BsBookmarkStarFill } from "react-icons/bs";
import { IoTimeSharp } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import user from "../../assets/images/avatar/user-m-7.png";
import Champion from "../../assets/images/medal/Champion.png";
import Master from "../../assets/images/medal/Master.png";
import Crystal from "../../assets/images/medal/Crystal.png";
import Gold from "../../assets/images/medal/gold.png";
import Silver from "../../assets/images/medal/silver.png";
import Bronze from "../../assets/images/medal/bronze.png";
import "./styles.scss";

const MyProfile = () => {
    const navigate = useNavigate();

    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    const [userData, setUserData] = useState([]);
    // console.log(userData);
    const awardsData = [
        {
            path: Champion,
            title: "Champion"
        },
        {
            path: Master,
            title: "Master"
        },
        {
            path: Crystal,
            title: "Crystal"
        },
        {
            path: Gold,
            title: "Gold"
        },
        {
            path: Silver,
            title: "Silver"
        },

        {
            path: Bronze,
            title: "Bronze"
        }
    ];

    useEffect(() => {
        setUserData([userInfo])
    }, [userInfo]);

    return (
        <div className="profile-section">
            <div className="common-title green-title">
                <div className='left-section' onClick={() => navigate('/')}> <BiArrowBack /></div>
                <div className='right-section'> <IoIosSettings /></div>
            </div>
            <div className="main-container">
                <div className="main-container__avatar">
                    <img src={user} alt="" />
                </div>
                <div className="main-container__name">
                    <h3>{userData[0]?.name}</h3>
                </div>
                <div className="main-container__point-stats">
                    <div className="main-container__point-stats-rank">
                        <BsBookmarkStarFill />
                        <span>Total Point</span>
                        <span>112</span>
                    </div>
                    <div className="main-container__point-stats-rank">
                        <IoTimeSharp />
                        <span>Total Time</span>
                        <span>12</span>
                    </div>
                    <div className="main-container__point-stats-rank">
                        <FaRankingStar />
                        <span>Rank</span>
                        <span>3</span>
                    </div>
                </div>
                <h2>My Reward</h2>
                <div className="main-container__reward">
                    {awardsData.map((award, index) => (
                        <div className="main-container__reward-award" key={index}>
                            <img src={award.path} alt="" />
                            <h3>{award.title}</h3>
                        </div>
                    ))}
                </div>
                <h2>Career stats</h2>
                <div className="main-container__career-stats">
                    <div className="main-container__career-stats-left">
                        <h4>Participate contest</h4>
                        <h4>Win contest</h4>
                        <h4>Total earn</h4>
                    </div>
                    <div className="main-container__career-stats-right">
                        <h4>6</h4>
                        <h4>4</h4>
                        <h4>3000</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;