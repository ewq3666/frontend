import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import "./styles.scss";
import { useSelector } from 'react-redux';
import ContestCard from '../../Components/ContestCard/ContestCard';

const MyContest = () => {
    const navigate = useNavigate();
    let contestList = useSelector((state) => state.ReducerFc?.joinedContestList[0]);

    useEffect(() => {
        console.log("contestList:", contestList)
    }, [contestList])

    return (
        <div className="myContest-container">
            <div className="common-title red-title">
                <div className='left-section'> <IoGameControllerOutline /></div>
                <h1>My Contest</h1>
                <div className='right-section' onClick={() => navigate('/')}> <IoMdClose /></div>
            </div>
            <div className="myContest-content">
                <h2>My all contest:</h2>
                <ContestCard
                    contestData={contestList}
                    isLoading={false}
                />
            </div>
        </div>
    )
}

export default MyContest;