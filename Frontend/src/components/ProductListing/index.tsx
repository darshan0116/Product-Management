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
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Default to 'all'
  const dispatch = useAppDispatch();

  const fetchProductsAndCategories = async () => {
    try {
      const { data } = await getApi('/product/allProducts');
      const productsData = data.result;
      setProducts(productsData);

      // Extract unique categories from products
      const uniqueCategories: string[] = Array.from(new Set(productsData.map((product: ProductProps) => product.category)));
      setCategories([ ...uniqueCategories]); // Include 'all' as an option
    } catch (error: any) {
      toast.error('Error while fetching products');
      throw new Error(error);
    }
  };

  const filterProducts = (products: ProductProps[]) => {
    let filtered = products.filter((product: ProductProps) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortKey === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortKey === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProductsAndCategories();
    dispatch(getCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    filterProducts(products);
  }, [searchTerm, sortKey, selectedCategory, products]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div className='productListing'>
      <div className="searchSortContainer">
        <Search
          placeholder="Search products..."
          onChange={(e: any) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          defaultValue="default"
          onChange={(value: string) => setSortKey(value)}
          style={{ width: 200, marginRight: 16 }}
        >
          <Option value="default">Default sorting</Option>
          <Option value="priceAsc">Price: Low to High</Option>
          <Option value="priceDesc">Price: High to Low</Option>
        </Select>
        <Select
          defaultValue="all"
          onChange={handleCategoryChange}
          style={{ width: 200 }}
        >
          <Option value="all">All Categories</Option>
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </div>
      <Row gutter={[16, 16]}>
        {filteredProducts.map(product => (
          <Col key={product.productId} xs={24} sm={12} md={8} lg={6}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
