import React, { useState } from 'react';
import { Carousel, Select } from 'antd';
import ContestCard from '../../Components/ContestCard/ContestCard';
import slide1 from "../../assets/images/slide-first.png";
import slide2 from "../../assets/images/slide-second.png";
import user1 from "../../assets/images/avatar/user-m-4.png";
import user2 from "../../assets/images/avatar/user-f-4.png";
import user3 from "../../assets/images/avatar/user-m-8.png";
import "./styles.scss";

const { Option } = Select;

const Home = () => {

    const [filterValue, setFilterValue] = useState('upcomming')
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
                    <Select defaultValue="upcomming" onChange={handleChange}>
                        <Option value="completed">Completed Contest</Option>
                        <Option value="upcomming">Upcoming Contest</Option>
                        <Option value="All">All Contest</Option>
                    </Select>
                </duv>
                <ContestCard filterValue={filterValue} />
            </div>
        </div>
    )
}

export default Home