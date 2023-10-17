import React from 'react'
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoMdClose, IoIosSettings } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai";
import "./styles.scss";

const SettingMenu = () => {
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate('/' + e.key);
    };

    return (
        <div className="setting-container">
            <div className="common-title yellow-title">
                <div className='left-section'> <IoIosSettings /></div>
                <h1>Setting</h1>
                <div className='right-section' onClick={() => navigate('/')}> <IoMdClose /></div>
            </div>
            <div className="drawer-content">
                <Menu mode="vertical" theme="dark" onClick={onClick}>
                    <Menu.Item key="editprofile">Edit Profile <AiOutlineRight /></Menu.Item>
                    <Menu.Item key="change-password">Change Password <AiOutlineRight /></Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default SettingMenu;