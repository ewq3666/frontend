import React, { useEffect, useState } from 'react';
import "./styles.scss";
import axios from 'axios';
import { getFirstTwoLetters, capitalizeEachWord } from "../../Helper/utility"
// import { END_POINTS } from '../../api/domain';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers} from '../../store/actions/reducerActions';

const MyProfile = () => {

    const dispatch = useDispatch()
    let result = useSelector((state) => state.eventReducer);
    console.log(result, "yeah we get result");

    const token = localStorage.getItem('token');
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

    const fetchUser = async () => {
        try {
            const res = await axios.get('https://backendupdated.vercel.app/api/user', { headers: { Authorization: token } });
            const user = res.data.result;
            setUserData([user]);
            dispatch(addUsers([user]));
            console.log(res,"datatatata");
        }
        catch (error) {
            console.log(error, "Not geeting users data");
        }
    }
    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <>
            <div className='main-container'>
                <div className="container">
                    {userData.length > 0 ? (
                        userData.map((ele, index) => (
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