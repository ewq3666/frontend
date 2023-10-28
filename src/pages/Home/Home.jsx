import React from 'react';
import { Carousel } from 'antd';
import ContestCard from '../../Components/ContestCard/ContestCard';
import slide1 from "../../assets/images/slide-first.png";
import slide2 from "../../assets/images/slide-second.png";
import { BsChevronDown } from "react-icons/bs";
import "./styles.scss";

const Home = () => {

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
      };

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
                <h1 className='main-title'><span>Upcoming Contest</span><span><BsChevronDown/></span></h1>
                <ContestCard />
            </div>
        </div>
    )
}

export default Home