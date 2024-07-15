import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Typography } from 'antd';
import SignUpComponent from '../SignUp';
import { loginType } from './types';
import toast from 'react-hot-toast';
import { postApi } from '../../apis/baseApi';

const {  Title } = Typography;

const LoginComponent = () => {
    let navigate = useNavigate();

    const [passwordHide, setPasswordHide] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShow(true);
    };

    const togglePasswordVisibility = () => {
        setPasswordHide(!passwordHide);
    }

    const handleLoginSubmit = async (values: loginType) => {
        try {
            const result = await postApi('/user/login', values);
            
            const token = result.data.result.token;

            localStorage.setItem("loginToken", token);

            toast.success(`${result.data.result.loggedUser.name} logged successfully`);

            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (error: any) {
            
            toast.error('error while login');
        }
    };

    return (
        <>
            <section className='login'>
                <Row gutter={[16, 16]}>
                    <Form
                        className='login-form'
                        layout="vertical"
                        onFinish={handleLoginSubmit}
                        initialValues={{ email: '', password: '' }}
                        
                    >
                        <Title level={4}>Log in</Title>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'The input is not valid E-mail!' },
                            ]}
                        >
                            <Input suffix={<MailOutlined />} placeholder="Enter Email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password
                                suffix={
                                    passwordHide ? (
                                        <EyeOutlined onClick={togglePasswordVisibility} />
                                    ) : (
                                        <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                                    )
                                }
                                type={passwordHide ? "password" : "text"}
                                placeholder="Enter Password"
                            />
                        </Form.Item>
                        <div>
                            <span className="text-muted">New Here? </span>
                            <Button type="link" onClick={handleShow}>
                                Register yourself
                            </Button>
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </section>
            <SignUpComponent show={show} handleClose={handleClose} />
        </>
    )
}

export default LoginComponent;