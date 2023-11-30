import React from 'react'
import { IoHomeOutline, IoHome } from "react-icons/io5";
import { MdOutlineLeaderboard, MdLeaderboard } from "react-icons/md";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import "./styles.scss";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="footer-section">
            <div className="footer-section__main">
                <div className="footer-section__main-options" onClick={() => navigate('/')}>
                    {window.location.pathname == "/"
                        ? <IoHome />
                        : <IoHomeOutline />
                    }
                </div>
                <div className="footer-section__main-options" onClick={() => navigate('/leaderboard')}>
                    {window.location.pathname == "/leaderboard"
                        ? <MdLeaderboard />
                        : <MdOutlineLeaderboard />
                    }
                </div>
                <div className="footer-section__main-options" onClick={() => navigate('/myprofile')}>
                    {window.location.pathname == "/myprofile"
                        ? <RiUser3Fill />
                        : <RiUser3Line />
                    }
                </div>
            </div>
        </div>
    )
}

export default Footer;