import React from 'react';
import { Form, Input } from 'antd';
import './styles.scss';

const CommonInput = ({ props, index }) => {
    return (
        <>
            {!props.optional ?
                (
                    <Form.Item
                        name={props.name}
                        rules={props.rules}
                        className={"loginInput"}
                    >
                        {props.type == "password" ?
                            <Input.Password 
                                placeholder={props.placeholder} 
                                className='loginInput__input'
                                prefix={<props.icon className="loginInput__icon" />} 
                            />
                            :
                            <Input 
                                placeholder={props.placeholder} 
                                className='loginInput__input'
                                prefix={<props.icon className="loginInput__input-icon" />} 
                            />
                        }

                    </Form.Item>
                )
                :
                (
                    <Form.Item
                        name={props.name}
                    >
                        <Input 
                            placeholder={props.placeholder} 
                            className='loginInput__input' 
                            prefix={<props.icon className="loginInput__input-icon" />} 
                        />
                    </Form.Item>
                )
            }
        </>
    );
};

export default CommonInput;