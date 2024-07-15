import { Button, Col, Modal, Row } from 'antd';
import {  ProductProps } from './types';
import { useState } from 'react';

import { DeleteFilled } from '@ant-design/icons';
import { deleteApi } from '../../apis/baseApi';
import toast from 'react-hot-toast';

type Props = {
    open: boolean;
    onCancel: (isEdit?: boolean) => void;
    productData: ProductProps ;
};

export const DeleteUserModal = ({ open, onCancel, productData }: Props) => {
    const [loading, setLoading] = useState(false);
    
 const deleteProduct = async (id:number) => {
    try {
      setLoading(true)
      const { data } = await deleteApi(`/product/delete/${id}`);
      onCancel(true);
      toast.success(`product deleted successfully`);
      return data.result;
    } catch (error:any) {
      toast.error('error while deleting product');
    }
    
    finally{
        setLoading(false)
    }
    

  }
    const handleSubmit = async () => {
        deleteProduct(productData.productId)
    };
   
    return (
        <Modal
            open={open}
            footer={null}
            width={600}
            onCancel={() => onCancel(false)}
            title='delete product'
        >
            <div>
                <Row gutter={24}>
                    <Col span={24} style={{ marginBottom: '20px' }}>
                        <div className="delete-icon">
                            <DeleteFilled />
                        </div>
                        <div className="delete-text">
                            Are you sure you want to delete product:{' '}
                            <b>{productData?.name}</b>?
                        </div>
                    </Col>
                    <Col span={24}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                onClick={handleSubmit}
                            >
                                Delete Product
                            </Button>
                            <Button
                                size="large"
                                htmlType="button"
                                style={{
                                    marginLeft: '10px',
                                }}
                                onClick={() => onCancel()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};
