import { Button, Drawer, Form, Input, message,  Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { ProductProps } from './types';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { postApi, putApi } from '../../apis/baseApi';


type Props = {
  open: boolean;
  onClose: (flag?:boolean) => void;
  editData: ProductProps;
  isEdit: boolean;
};

const AddAndEdit = ({ open, onClose, editData, isEdit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit && editData) {
      form.setFieldsValue({
        name: editData.name,
        price: editData.price,
        productDesc: editData.productDesc,
        stock: editData.stock,
      });
    } else {
      form.resetFields();

    }
  }, [isEdit, editData, form]);


  const addProduct = async (formData:FormData) => {
    try {
   
      
      setLoading(true)
      const { data } = await postApi(`/product/create` , formData , true);
      toast.success(`product added successfully`);
      return data.result;
    } catch (error:any) {
      let errorMessage = error.response.data.errorMessage
      if (error.response.data.statusCode === 500) {
          errorMessage = "Something went wrong"
      }
      toast.error(errorMessage)
    }
    finally{
        setLoading(false)
    }
  };
  const editProduct = async (formData:FormData , productId:number) => {
    try {

      
      setLoading(true)
      const { data } = await putApi(`/product/update/${productId}` , formData , true);
      toast.success(`product edited successfully`);
      return data.result;
    } catch (error:any) {
      toast.error('error while editing product');
    }
    finally{
        setLoading(false)
    }
  };

  const handleFinish = (values:ProductProps) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price.toString());
    formData.append('stock', values.stock.toString());
    formData.append('productDesc', values.productDesc);
    if (imageFile) {
      formData.append('productImg', imageFile as Blob);
    }
    if (isEdit) {
      editProduct(formData , editData.productId);
      
      onClose(true);
    }
    else{
      addProduct(formData);
      onClose(true);
    }
   

  };


   const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
      return false; 
    }
    if (isJpgOrPng && isLt4M) {
      setImageFile(file);
    }
    return false;  // Prevent default upload behavior
  };

  return (
    <>
      <Drawer
        title={isEdit ? 'Edit Product' : 'Add Product'}
        placement="right"
        width={500}
        onClose={() => onClose(false)}
        open={open}
      >
        <div className="formContainer">
          <Form layout="vertical" onFinish={handleFinish} form={form}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                { required: true, whitespace: true,pattern: /^[a-zA-Z][a-zA-Z0-9\s]*$/ ,max: 30, min: 3, message: 'Please valid the product name' },
              
            ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: 'Please enter the amount' },
                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Amount must be a valid number (99.99)' },
            ]}
            >
              <Input type="number" placeholder="Enter price" />
            </Form.Item>
            <Form.Item
              name="stock"
              label="stock"
              rules={[
                { required: true, message: 'Please enter the stocks' },
                {
                    pattern: /^([1-9][0-9]{0,3}|9999)$/,
                    message: 'stocks must be between 0 and 9999',
                },
            ]}
            >
              <Input type="number" placeholder="Enter stock" />
            </Form.Item>
            <Form.Item
              name="productDesc"
              label="Description"
              rules={[
                { required: true, whitespace: true, message: 'Please enter the product description' },
                { max: 200, min: 3, type: 'string', message: 'Product description must be between 3 and 200 characters' },
            ]}

            >
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              rules={[{ required: true, message: 'Please upload an image' }]}
            >
           <Upload
          beforeUpload={beforeUpload}
          maxCount={1}
          listType="picture"
          accept="image/jpeg,image/png"
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} >
                {isEdit ? 'Edit Product' : 'Add Product'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default AddAndEdit;
