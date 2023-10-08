import React from 'react'
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai";
import "./styles.scss";

const SettingMenu = () => {
    const navigate = useNavigate();

    const onClick = (e) => {
        console.log('click ', e);
        navigate('/'+e.key);
        // setCurrent(e.key);
    };

    return (
        <div className="setting-container">
            <div className="setting-title">
                <h4>Setting</h4>
                <IoMdClose onClick={()=>navigate('/')}/>
            </div>
            <div className="drawer-content">
                <Menu mode="vertical" theme="dark" onClick={onClick}>
                    <Menu.Item key="editprofile">Edit Profile <AiOutlineRight/></Menu.Item>
                    <Menu.Item key="change-password">Change Password <AiOutlineRight/></Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default SettingMenu;