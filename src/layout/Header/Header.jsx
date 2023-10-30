import React, { useEffect, useState } from 'react';
import { Avatar, Drawer, Menu } from 'antd';
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { AiOutlineRight, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { RiWallet3Line } from "react-icons/ri";
import { CiBank } from "react-icons/ci";
import { MdOutlineAttachEmail, MdOutlineCurrencyRupee } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoMdClose, IoIosLogOut } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/WhatsApp Image 2023-10-02 at 9.14.09 PM (1).jpeg";
import "./styles.scss";

const Header = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState({});
    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    const menuArr = [
        {
            key: "myprofile",
            name: "My Profile",
            icon: <AiOutlineUser />
        },
        {
            key: "wallet",
            name: "Wallet",
            icon: <RiWallet3Line />
        },
        {
            key: "Setting",
            name: "Setting",
            icon: <AiOutlineSetting />
        },
        {
            key: "transaction",
            name: "Transaction",
            icon: <CiBank />
        },
        {
            key: "mycontest",
            name: "My Contest",
            icon: <IoGameControllerOutline />
        },
        {
            key: "contactus",
            name: "Contact Us",
            icon: <MdOutlineAttachEmail />
        },
        {
            key: "logout",
            name: "Logout",
            icon: <IoIosLogOut />
        },
    ];

    //check for token
    const token = localStorage.getItem('token');
    const handleLogin = () => {
        if (!token) navigate('/login');
    }

    const showDrawer = () => {
        setVisible(true);
    };

    const onClick = (e) => {
        console.log('click ', e);
        if (e.key == "logout") {
            localStorage.removeItem("token")
        } else {
            navigate('/' + e.key);
        }
        setVisible(false);
    };

    useEffect(() => {
        setUserData(userInfo);
        console.log("userInfo", userInfo)
    }, [userInfo])

    return (
        <div className="header-wrapper">
            <div className="header-container">
                <div className="header-option">
                    <div className="user-info">
                        <Avatar onClick={() => navigate('/')} className="user-avtar" style={{ backgroundColor: "red", verticalAlign: 'middle' }} size="large" >
                            {userData?.name ? userData?.name?.slice(0, 2) : 'GU'}
                        </Avatar>
                        <div className="user-name">
                            <h4>{token ? userData?.name : "Guest User"}</h4>
                            {/* <p>Participate, Play, and Pocket Real Money!</p> */}
                            <p>Play quizzes, earn money</p>
                        </div>
                    </div>
                    {token === null ? (
                        <div>
                            <div className="login-icon" onClick={handleLogin}>
                                <BiLogIn />
                                <p>Login</p>
                            </div>
                        </div>
                    ) :
                        <div className="hamburger-menu">
                            <div className="hamburger-option" onClick={()=>navigate('/wallet')}>
                                0 <RiWallet3Line />
                            </div>
                            <div className="hamburger-option" onClick={showDrawer}>
                                <GiHamburgerMenu />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Drawer
                title={
                    <div className='menu-title'>
                        <div className='menu-logo' onClick={() => { navigate('/'); setVisible(false) }}>
                            <img src={logo} alt="" />
                        </div>
                        <IoMdClose onClick={() => setVisible(false)} />
                    </div>
                }
                placement="right"
                onClose={() => setVisible(false)}
                open={visible}
                closable={true}
                className='menu-drawer'
            >
                <div className="drawer-content">
                    <Menu mode="vertical" theme="dark" onClick={onClick}>
                        {menuArr.map((menuItem, index) => {
                            return (
                                <Menu.Item key={menuItem.key}>

                                    <span>{menuItem.icon} {menuItem.name}</span>
                                    <span><AiOutlineRight /></span>
                                </Menu.Item>
                            )
                        }
                        )}
                    </Menu>
                </div>
            </Drawer>
        </div>
    )
}

export default Header;