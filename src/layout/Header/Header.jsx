import React, { useState } from 'react';
import { Drawer, Menu } from 'antd';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { IoMdClose, IoIosSettings, IoLogoGameControllerB, IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import "./styles.scss";

const Header = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };

    const onClick = (e) => {
        console.log('click ', e);
        setVisible(false);
        navigate('/'+e.key);
        // setCurrent(e.key);
    };

    return (
        <div className="header-wrapper">
            <div className="header-container">
                <div className="header-option">
                    <div className="user-info">
                        <div className="user-avtar">
                            AK
                        </div>
                        <div className="user-name">
                            <h4>Ajay Kharat</h4>
                            <p>play</p>
                        </div>
                    </div>
                    <div className="hamburger-menu">
                        <div className="hamburger-option" onClick={showDrawer}>
                            <GiHamburgerMenu/>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                title={<div className='menu-title'><div>Menu</div> <IoMdClose onClick={()=>setVisible(false)}/></div>}
                placement="right"
                // width={700}
                onClose={()=>setVisible(false)}
                open={visible}
                closable={true}
                className='menu-drawer'
            >  
                <div className="drawer-content">
                <Menu mode="vertical" theme="dark" onClick={onClick}>
                    <Menu.Item key="setting">
                        <span><IoIosSettings/> Setting</span>
                        <span><AiOutlineRight/></span>
                    </Menu.Item>
                    <Menu.Item key="transaction">
                        <span><FaRupeeSign/> Transaction</span>
                        <span><AiOutlineRight/></span>
                    </Menu.Item>
                    <Menu.Item key="mycontest">
                        <span><IoLogoGameControllerB/> My Contest</span>
                        <span><AiOutlineRight/></span>
                    </Menu.Item>
                    <Menu.Item key="login" onClick={()=>localStorage.removeItem("token")}>
                        <span><IoIosLogOut/> Log out</span>
                        <span><AiOutlineRight/></span>
                    </Menu.Item>
                </Menu>
                </div>
            </Drawer>
        </div>
    )
}

export default Header;