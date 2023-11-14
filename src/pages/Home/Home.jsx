import React, { useState } from 'react';
import { Carousel, Select } from 'antd';
import ContestCard from '../../Components/ContestCard/ContestCard';
import slide1 from "../../assets/images/slide-first.png";
import slide2 from "../../assets/images/slide-second.png";
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
                <ContestCard filterValue={filterValue} />
            </div>
        </div>
    )
}

export default Home