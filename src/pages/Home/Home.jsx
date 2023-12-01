import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { END_POINTS } from '../../api/domain';
import ContestCard from '../../Components/ContestCard/ContestCard';
import user1 from "../../assets/images/avatar/user-m-4.png";
import user2 from "../../assets/images/avatar/user-f-4.png";
import user3 from "../../assets/images/avatar/user-m-8.png";
import moment from 'moment';
import axios from 'axios';
import "./styles.scss";

const { Option } = Select;

const Home = () => {

    const [filterValue, setFilterValue] = useState('upcomming');
    const [contestData, setContestData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(value) {
        setFilterValue(value);
        console.log(`Selected: ${value}`);
    }

    // Featch contest data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentDate = new Date();
                setIsLoading(true);
                const response = await axios.get(END_POINTS.contest);

                if (response.data) {
                    if (filterValue == "completed") {
                        const oldQuizzes = response.data.result.filter((quiz) => {
                            const quizDateTime = moment(`${quiz.date} ${quiz.time}`, 'YYYY-MM-DD HH:mm');
                            return quizDateTime.isBefore(currentDate);
                        });
                        setContestData(oldQuizzes);
                    } else if (filterValue == "upcomming") {
                        const upcomingQuizzes = response.data.result.filter((quiz) => {
                            const quizDateTime = moment(`${quiz.date} ${quiz.time}`, 'YYYY-MM-DD HH:mm');
                            return quizDateTime.isSameOrAfter(currentDate);
                        });
                        setContestData(upcomingQuizzes);
                    } else if (filterValue == "All") {
                        setContestData(response.data.result);
                    } else {
                        const todayStart = new Date();
                        todayStart.setHours(0, 0, 0, 0);
                        const todayEnd = new Date();
                        todayEnd.setHours(23, 59, 59, 999);
                        const filtered = response.data.result.filter(record => new Date(record.date) >= todayStart && new Date(record.date) <= todayEnd);
                        setContestData(...contestData, filtered);
                    }
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        };

        fetchData();
    }, [filterValue]);

    return (
        <div className='home-wrapper'>
            <div className="home-design">
                <h2>Top rankers</h2>
                <div className="home-design__point-stats">
                    <div className="home-design__point-stats-rank">
                        <img src={user1} alt="" />
                        <h3>Rahul</h3>
                        <h3>400</h3>
                    </div>
                    <div className="home-design__point-stats-rank">
                        <img src={user2} alt="" />
                        <h3>Sonal</h3>
                        <h3>350</h3>
                    </div>
                    <div className="home-design__point-stats-rank">
                        <img src={user3} alt="" />
                        <h3>Akshay</h3>
                        <h3>300</h3>
                    </div>
                </div>
            </div>
            <div className="home-contest">
                <duv className="home-select-box">
                    <h2>Contest:</h2>
                    <Select defaultValue="upcomming" onChange={handleChange}>
                        <Option value="completed">Completed Contest</Option>
                        <Option value="upcomming">Upcoming Contest</Option>
                        <Option value="All">All Contest</Option>
                    </Select>
                </duv>
                {/* Contest Card */}
                <ContestCard 
                    filterValue={filterValue} 
                    contestData={contestData} 
                    isLoading={isLoading} 
                />
            </div>
        </div>
    )
}

export default Home