import { Button, Checkbox, Col, Collapse, Divider, Empty, Form, Input, Row } from 'antd';
import React, { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../../apis/baseApi';
import { useAppSelector } from '../../hooks/reduxHooks';

const { Panel } = Collapse;

const OrderForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { CartData } = useAppSelector((state) => state.cart);
  const total = CartData.reduce((acc: number, item: any) => acc + item.subTotal, 0);
  const [isbillingSameAsShipping, setIsbillingSameAsShipping] = useState(false);

const paymentApi = async (formattedValues:any) => {
        try {
          console.log("formated values", formattedValues);
          await postApi('/payment/create', formattedValues);
          
         toast.success(`Payment of $${total} successfully`);
         navigate('/');
        } catch (error:any) {
          toast.error('Payment failed');
        }
}


  const onFinish = (values: any) => {
    const formattedValues = {

          email: values.email,
          phone: values.phone,
          cartId :CartData[0].cartId,
          totalAmount: total,
          notesOfPayment: values.orderNotes,
        
      billingAddress: {
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName,
        country: values.country,
        streetAddress: values.streetName,
        apartment: values.apartment,
        city: values.city,
        postcode: values.postcode,
      },
      shippingAddress: values.isbillingSameAsShipping ? 
      {
            firstName: values.shippingFirstName,
            lastName: values.shippingLastName,
            companyName: values.shippingCompanyName,
            country: values.shippingCountry,
            streetAddress: values.shippingStreetName,
            apartment: values.shippingApartment,
            city: values.shippingCity,
            postcode: values.shippingPostcode,
            phone: values.shippingPhone,
          }
        : null,
    };
 
    paymentApi(formattedValues);

  };


  if (!CartData.length) {
       return <Empty/>
  }
  return (
    <div className="orderFormContainer">
      <Row gutter={16}>
        <Col span={12}>
          <h2 className='title'>Customer Information</h2>
          <Form 
            form={form}
            layout="vertical"
            onFinish={onFinish}
          
          >
            <Form.Item 
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input placeholder='Enter Email' />
            </Form.Item>

            <Divider />

            <h2 className='title'>Billing details</h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="firstName" 
                  label="First name" 
                  rules={[
                    { required: true, message: 'Please enter your first name!' },
                    { pattern: /^[a-zA-Z]+$/, message: 'First name should only contain letters.' }
                  ]}
                >
                  <Input placeholder='Enter first name' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="lastName" 
                  label="Last name" 
                  rules={[
                    { required: true, message: 'Please enter your last name!' },
                    { pattern: /^[a-zA-Z]+$/, message: 'Last name should only contain letters.' }
                  ]}
                >
                  <Input placeholder='Enter last name' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="companyName" 
                  label="Company name" 
                  rules={[{ required: true, message: 'Please enter your company name!' }]}
                >
                  <Input placeholder='Enter company' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="country" 
                  label="Country / Region" 
                  rules={[{ required: true, message: 'Please enter your country!' }]}
                >
                  <Input placeholder='Enter country' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="streetName" 
                  label="House number and street" 
                  rules={[{ required: true, message: 'Please enter your street address!' }]}
                >
                  <Input placeholder='Enter house number and street' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="apartment" 
                  label="Apartment, suite, unit, etc." 
                  rules={[{ required: true, message: 'Please enter your apartment details!' }]}
                >
                  <Input placeholder='Enter apartment' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="postcode" 
                  label="Postcode / ZIP" 
                  rules={[
                    { required: true, message: 'Please enter your postcode!' },
                    { pattern: /^[1-9][0-9]{5}$/, message: 'Please enter a valid 6-digit postcode.' }
                  ]}
                >
                  <Input maxLength={6} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="city" 
                  label="Town / City" 
                  rules={[{ required: true, message: 'Please enter your city!' , pattern: /^[a-zA-Z\s]*$/}]}
                >
                  <Input placeholder='Enter city' />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item 
              name="phone" 
              label="Phone" 
              rules={[
                { required: true, message: 'Please enter your phone number!' },
                { pattern: /^[1-9][0-9]{9}$/, message: 'Please enter a valid 10-digit phone number.' }
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>

            <Form.Item
              name="isbillingSameAsShipping"
              valuePropName="checked" 
             
            >
              <Checkbox  onChange={()=> setIsbillingSameAsShipping(!isbillingSameAsShipping)}>Ship to a different address?</Checkbox>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.shipToDifferentAddress !== currentValues.shipToDifferentAddress}
            >
              {({ getFieldValue }) =>
                getFieldValue('isbillingSameAsShipping') ? (
                  <Collapse>
                    <Panel header="Shipping Address" key="shippingAddress">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item 
                            name="shippingFirstName" 
                            label="First name" 
                            rules={[
                              { required: true, message: 'Please enter shipping first name!' },
                              { pattern: /^[a-zA-Z]+$/, message: 'First name should only contain letters.' }
                            ]}
                          >
                            <Input placeholder='Enter first name'/>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item 
                            name="shippingLastName" 
                            label="Last name" 
                            rules={[
                              { required: true, message: 'Please enter shipping last name!' },
                              { pattern: /^[a-zA-Z]+$/, message: 'Last name should only contain letters.' }
                            ]}
                          >
                            <Input placeholder='Enter last name'/>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="shippingCompanyName" label="Company name">
                            <Input placeholder='Enter company'/>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item 
                            name="shippingCountry" 
                            label="Country / Region" 
                            rules={[{ required: true, message: 'Please enter shipping country!' }]}
                          >
                            <Input placeholder='Enter country'/>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item 
                            name="shippingStreetName" 
                            label="House number and street name" 
                            rules={[{ required: true, message: 'Please enter shipping street address!' }]}
                          >
                            <Input placeholder='Enter house number and street'/>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="shippingApartment" label="Apartment, suite, unit, etc.">
                            <Input placeholder='Enter apartment'/>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item 
                            name="shippingPostcode" 
                            label="Postcode / ZIP" 
                            rules={[
                              { required: true, message: 'Please enter shipping postcode!' },
                              { pattern: /^[1-9][0-9]{5}$/, message: 'Please enter a valid 6-digit postcode.' }
                            ]}
                          >
                            <Input placeholder='Enter postcode' maxLength={6}/>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item 
                            name="shippingCity" 
                            label="Town / City" 
                            rules={[{ required: true, message: 'Please enter shipping city!' ,  pattern: /^[a-zA-Z\s]*$/}]}
                          >
                            <Input placeholder='Enter city'/>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item 
                        name="shippingPhone" 
                        label="Phone" 
                        rules={[
                          { required: true, message: 'Please enter shipping phone number!' },
                          { pattern: /^[1-9][0-9]{9}$/, message: 'Please enter a valid 10-digit phone number.' }
                        ]}
                      >
                        <Input maxLength={10} />
                      </Form.Item>
                    </Panel>
                  </Collapse>
                ) : null
              }
            </Form.Item>

            <Form.Item name="orderNotes" label="Notes about your order, e.g. special notes for delivery.">
              <Input.TextArea />
            </Form.Item>

            <Divider />

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Place Order ${(total + 8).toFixed(2)}
              </Button>
            </Form.Item>
          </Form>

          
        </Col>
        <Col span={12}>
          <h2 className='title'>Your order</h2>
          <div className="orderSummary">
            {CartData.map((item: any) => (
              <Fragment key={item.id}>
                <p>{item.name} × {item.quantity} <span>£{item.subTotal}</span></p>
                <Divider />
              </Fragment>
            ))}
            <p>Subtotal <span>£{total.toFixed(2)}</span></p>
            <p>Shipping <span>Flat rate: £8.00</span></p>
            <Divider />
            <p>Total <span>£{(total + 8).toFixed(2)}</span></p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderForm;