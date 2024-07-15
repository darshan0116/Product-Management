import React from 'react';
import { Button, Divider } from 'antd';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';


const CartTotals = () => {
  const { CartData } = useAppSelector((state) => state.cart)

  const navigate = useNavigate();

  const total = CartData.reduce((acc: number, item: any) => acc + item.subTotal, 0);


  const handlePayment = async () => {
    navigate('/checkout')
  }
  return (
    <div className="cartTotals">
      <div className="totalsItem">
        <span>Subtotal</span>
        <span>£{Number(total).toFixed(2)}</span>
      </div>
      <div className="totalsItem">
        <span>Shipping</span>
        <span>£8.00</span>
      </div>
      <Divider />
      <div className="totalsItem totalsTotal">
        <span>Total</span>
        <span>£{Number(total + 8).toFixed(2)}</span>
      </div>
      
      <Button type="primary" className="checkoutButton" onClick={handlePayment}>Proceed To Checkout</Button>
    </div>
  );
};

export default CartTotals;
