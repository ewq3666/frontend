import React, { useState,useEffect } from 'react';
import { Carousel, Select } from 'antd';
import ContestCard from '../../Components/ContestCard/ContestCard';
import slide1 from "../../assets/images/slide-first.png";
import slide2 from "../../assets/images/slide-second.png";
import moment from 'moment';
import { END_POINTS } from '../../api/domain';
import axios from 'axios';
import "./styles.scss";

const { Option } = Select;

const Home = () => {

    const [filterValue, setFilterValue] = useState('upcomming');
    const [isLoading, setIsLoading] = useState(false);
    const [contestData, setContestData] = useState([]);

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

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
    };

    function handleChange(value) {
        setFilterValue(value);
        console.log(`Selected: ${value}`);
    }

    return (
        <div className='home-wrapper'>
            <div className="home-design">
                <Carousel {...settings}>
                    <div className="carousel-slide">
                        <img src={slide1} alt="" />
                    </div>
                    <div className="carousel-slide">
                        <img src={slide2} alt="" />
                    </div>
                    <div className="carousel-slide">
                        <img src={slide1} alt="" />
                    </div>
                    <div className="carousel-slide">
                        <img src={slide2} alt="" />
                    </div>
                </Carousel>
            </div>
            <div className="home-contest">
                <duv className="home-select-box">
                    <Select defaultValue="upcomming" onChange={handleChange}>
                        <Option value="completed">Completed Contest</Option>
                        <Option value="upcomming">Upcoming Contest</Option>
                        <Option value="All">All Contest</Option>
                    </Select>
                </duv>
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