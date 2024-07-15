import { Col, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getApi } from '../../apis/baseApi';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { getCart } from '../../Redux/Actions/cartAction';
import { ProductProps } from '../ManageProducts/types';
import ProductCard from './productCard';

const { Search } = Input;
const { Option } = Select;



const ProductList = () => {

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('default');
const dispatch  = useAppDispatch()
  const allProducts = async () => {
    try {
      const { data } = await getApi('/product/allProducts');
      return data.result;
    } catch (error: any) {
      toast.error('error while fetching products');
    }
  }
const allProductsData  = async () => {
  allProducts()
  .then((res) => {
    setProducts(res)
  })}
  useEffect(() => {
    allProductsData();
    dispatch(getCart())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    let filtered = products?.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortKey === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortKey === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, sortKey, products]);

  return (
    <>
    <div className='productListing'>
      <div className="searchSortContainer">
        <Search
          placeholder="Search products..."
          onChange={(e:any) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          defaultValue="default"
          onChange={(value: string) => setSortKey(value)}
          style={{ width: 200 }}
        >
          <Option value="default">Default sorting</Option>
          <Option value="priceAsc">Price: Low to High</Option>
          <Option value="priceDesc">Price: High to Low</Option>
        </Select>
      </div>
      <Row gutter={[16, 16]}>
        {filteredProducts?.map(product => (
          <Col key={product.productId} xs={24} sm={12} md={8} lg={6}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
      </div>
    </>
  );
};

export default ProductList;
