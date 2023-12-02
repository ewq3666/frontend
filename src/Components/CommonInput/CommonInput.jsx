import React from 'react';
import { Form, Input } from 'antd';
import './styles.scss';

const CommonInput = ({ props, index }) => {
    return (
        <>
            {props.disable ?
                (
                    <>
                    <Form.Item
                        name={props.name}
                        className="loginInput"
                        rules={props.rules}
                        label={props.placeholder}
                    >
                        <Input
                            placeholder={props.placeholder}
                            className='loginInput__input'
                            prefix={<props.icon className="loginInput__input-icon" />}
                            disabled={true}
                        />
                    </Form.Item>
                    <p className='disabled-message'>You are unable to change your email.</p>
                    </>
                )
                :!props.optional ?
                    (
                        <Form.Item
                            name={props.name}
                            rules={props.rules}
                            className="loginInput"
                            label={props.label}
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
                            className="loginInput"
                            label={props.label}
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