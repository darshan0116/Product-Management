import { Button, Table } from 'antd';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getCart } from "../../Redux/Actions/cartAction";
// import { ColumnType } from 'antd/es/table';

import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnProps } from "antd/es/table";
import toast from "react-hot-toast";
import { decreaseQuantityByOne, deleteCartItem, increaseQuantityByOne } from "../../Redux/Actions/cartItemAction";
import CartTotals from "./CartTotal";
import { cartItem } from "./types";
const CartComponent = () => {

  const { CartData, loading } = useAppSelector((state) => state.cart)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCart())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteCartItemHandler = async (cartItemData: cartItem) => {
    try {
      const { cartId, productId } = cartItemData
      const payload = { cartId, productId }

      await dispatch(deleteCartItem(payload))

      toast.success(`Item deleted successfully`);
    }
    catch (error: any) {
      toast.error(error);
    }
  }
  const increaseQuantity = async (cartItemData: cartItem) => {
    try {
      const { cartId, productId } = cartItemData
      const payload = { cartId, productId }

      await dispatch(increaseQuantityByOne(payload)).unwrap()

    }
    catch (error: any) {
      toast.error(error);
    }
  }
  const decreaseQuantity = async (cartItemData: cartItem) => {
    try {
      const { cartId, productId } = cartItemData
      const payload = { cartId, productId }

      await dispatch(decreaseQuantityByOne(payload)).unwrap()

    }
    catch (error: any) {
      toast.error(error);
    }
  }
  const columns: ColumnProps<cartItem>[] = [
    {
      title: 'Remove',
      dataIndex: '',
      key: 'remove',
      render: (_, record) => <Button icon={<CloseOutlined />} onClick={() => deleteCartItemHandler(record)} style={{ borderRadius: '50%', color: 'red' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `£${Number(price).toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record) => (
        <div className="quantityControl">

          <Button
            icon={<MinusOutlined />}
            onClick={() => decreaseQuantity(record)}
            disabled={quantity <= 1}
          />

          <span>{quantity}</span>

          <Button
            icon={<PlusOutlined />}
            onClick={() => increaseQuantity(record)}
            disabled = {quantity >= record.stock}
          />
        </div>
      ),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subTotal',
      key: 'subtotal',
      render: (_, record) => `£${Number(record.price * record.quantity).toFixed(2)}`,
    },

  ];
  console.log(CartData);
  

  return <>
    <div className="cartPage">
      <h2>Cart</h2>
      <div className="cartInfo">
        <Table columns={columns} dataSource={CartData} pagination={false}
          style={{ width: '100%' }} rowHoverable={false} loading={loading} rowKey='productId' />
        {
          CartData.length > 0 && <CartTotals />
        }

      </div>
    </div>
  </>;
};

export default CartComponent;





