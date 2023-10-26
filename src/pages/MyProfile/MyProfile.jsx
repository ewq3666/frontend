import React, { useEffect, useState } from 'react';
import "./styles.scss";
import axios from 'axios';
import { END_POINTS } from '../../api/domain';

const MyProfile = () => {

    const [userData, setuserData] = useState([])
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
    const getInitials = (name) => {
        if (name) {
            const nameParts = name.split(' ');
            if (nameParts.length >= 2) {
                return nameParts[0][0] + nameParts[1][0];
            } else if (nameParts.length === 1) {
                return nameParts[0][0];
            }
        }
        return '';
    };
    const fetchUser = async () => {
        try {
            const res = await axios.get("https://backendupdated.vercel.app/api/");
            console.log(res, "this is user data");
            // const userFilteredData = response.data.find(user => user._id === loggedInUserId);
            const userFilteredData = res.data.result.filter(() => res.data.result.id === "6525028b3c3a894790be9ee2");

            setuserData(res.data.result)
            console.log(userFilteredData, "i am flter data");
        }
        catch (error) {
            console.log(error, "not geeting users data");
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <>
            <div className='main-container'>
                <div className="container">
                    <div className="profile-card">
                        {userData.map((ele, index) => {
                            return (
                                <>
                                    <div className="profile-card__header">
                                        <div className="profile-card__header-logo">
                                            <p className='name'>{getInitials(userData.name)}
                                            </p>
                                        </div>
                                        <div className="profile-card__header-title">
                                            <p className='username'>{ele.name}</p>
                                            <p className='user-level'>Level<b>:</b> 14</p>
                                        </div>
                                    </div>
                                    <div className="profile-card__userdata">
                                        <div>
                                            <p>Email</p>
                                            <p>Contact No</p>
                                            <p>Address</p>
                                        </div>
                                        <div>
                                            <p>{ele.user_email}</p>
                                            <p>{ele.mobile}</p>
                                            <p>{ele.yourstate}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div >
                    <div className="awards-card">
                        <div className="awards-card__title">
                            <p>Awards</p>
                        </div>
                        <div className="awards-card__wrapper">
                            {awardsData.map((ele, index) => {
                                return (
                                    <>
                                        <div className='flex-container'>
                                            <div className="box" key={index}>
                                                <img className="award-img" src={ele.path} alt="winner img" />
                                            </div>
                                            <div className='title'>
                                                <p>{ele.title}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile;