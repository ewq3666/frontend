import React from 'react';
import './submit.scss';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
    const navigate = useNavigate()
    return (
        <div className="thank-you">
            <img src="ewq_logo.jpg" alt="" />
            <h1>THANK YOU </h1>
            <h2>FOR YOUR TIME!</h2>
            <br />
            <p>Your submission has been received</p>
            <p>Result will announce soon <FieldTimeOutlined /></p>
            <Button onClick={() => navigate('/')}  type="primary">Home</Button>
        </div>
    );
};

export default Submit;
