
import { Button, Image, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { ProductProps } from './types';


import toast from 'react-hot-toast';
import { getApi } from '../../apis/baseApi';

import AddAndEdit from './AddAndEdit';
import { DeleteUserModal } from './deleteProductModal';


const Product = () => {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState<ProductProps>({} as ProductProps);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openProductDeleteModal, setOpenProductDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(
    {} as ProductProps
  );
  const showDrawer = () => {
    setOpen(true);
  };


  const allProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getApi('/product/allProducts');
      setProducts(data.result);
    } catch (error: any) {
   
      toast.error('error while fetching products');
    }
    finally {

      setLoading(false)
    }
  }


  useEffect(() => {
    allProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const columns: ColumnProps<ProductProps>[] = [
    {
      title: 'Image',
      dataIndex: 'productImg',
      key: 'productImg',
      render: (text) => <> <Image
        className='productImg'
        alt='productImg'

        style={{
          width: '6rem',
          height: '6rem',
          objectFit: 'contain',
        }}
        src={text}
      /></>,
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'Stock',
      responsive: ['sm', 'md'],
    },
    {
      title: 'Description',
      dataIndex: 'productDesc',
      key: 'productDesc',
      responsive: ['xs', 'sm', 'md'],
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      responsive: ['xs', 'sm', 'md'],
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => { setOpen(true); setEditData(record); setIsEdit(true); }} style={{ marginRight: '10px' }}>Edit</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setSelectedProduct(
                record
              );
              setOpenProductDeleteModal(
                true
              );
            }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="productContainer">
      <div className="productInfo">
        <h2>Products</h2>
        <button className="productBtn" onClick={showDrawer}> + </button>
      </div>



      {products && products.length > 0 && (
        <Table
          dataSource={products}
          loading={loading}
          columns={columns}
          rowKey='productId'
          scroll={{ x: 'max-content' }}
          pagination={{
            position: ['bottomRight'],
            total: products.length,
            pageSize: 4,
          }}
        />
      )}
      {openProductDeleteModal ? (
        <DeleteUserModal
          open={openProductDeleteModal}
          productData={selectedProduct}
          onCancel={(flag?: boolean) => {
            setOpenProductDeleteModal(false);
            setSelectedProduct({} as ProductProps);
            if (flag) {

              
              allProducts();
            }
          }
          }
        />
      ) : null}
      <AddAndEdit open={open} onClose={(flag?:boolean)=>{
           setTimeout(()=>{
        setOpen(false);
        setIsEdit(false);
        setEditData({} as ProductProps);
        if(flag){
       
            allProducts();
     
        }
      } , 500)
      }} editData={editData} isEdit={isEdit} />
    </div>
  );
};

export default Product;
