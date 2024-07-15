import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useEffect } from 'react';
// import { postApi } from '../../../API/apis';
import { signUpType } from './types';
import { postApi } from '../../apis/baseApi';
import toast from 'react-hot-toast';


type Props = { show: boolean, handleClose: () => void };

const SignUpComponent = ({ show, handleClose }: Props) => {
    const [form] = Form.useForm();

    const handleFormSubmit = async (values: signUpType) => {
        try {
         
            
              await postApi('/user/signup', values);
            toast.success(`registered successfully`);
            handleClose();
        } catch (error: any) {
           
            toast.error('error while registration');
        }
    };

    useEffect(() => {
        form.resetFields();
    }, [form, handleClose]);

    return (
        <Modal
            title="Registration"
            open={show}
            onCancel={handleClose}
            destroyOnClose
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    Password: '',
                    confirmPassword: ''
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                { required: true, message: 'First name is required' },
                                { pattern: /^[a-zA-Z\s]*$/, message: 'First name should only contain alphabets' },
                                { min: 3, max: 55, message: 'First name should be between 3 and 55 characters' },
                                { whitespace: true, message: 'First name should not be empty' }
                            ]}
                        >
                            <Input placeholder="Enter first name" maxLength={55} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                { required: true, message: 'Last name is required' },
                                { pattern: /^[a-zA-Z\s]*$/, message: 'Last name should only contain alphabets' },
                                { min: 3, max: 55, message: 'Last name should be between 3 and 55 characters' },
                                { whitespace: true, message: 'Last name should not be empty' }
                            ]}
                        >
                            <Input placeholder="Enter last name" maxLength={55} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Email is required' },
                                { type: 'email', message: 'Email should be in a valid format' },
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Password is required' },
                                { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: 'At least one letter, one number and one special character' },
                            ]}
                        >
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Passwords do not match');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm password" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <Button type="default" onClick={() => form.resetFields()}>
                        Clear Form
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SignUpComponent;