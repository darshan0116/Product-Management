import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../apis/baseApi";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createCartItem } from "../../Redux/Actions/cartItemAction";
import { ProductProps } from "../ManageProducts/types";

const ProductDetailsComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState<ProductProps>(
    {} as ProductProps
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const { data } = await getApi(`/product/${productId}`);
        setProductDetails(data.result);
      } catch (error) {
        console.error("Failed to fetch chair details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = async () => {
    try {
      const productId = productDetails.productId;
      const ItemData = {
        productId,
        quantity,
      };
      await dispatch(createCartItem(ItemData)).unwrap();
      toast.success(`Item added successfully`);
      setTimeout(() => {
        navigate("/cart");
      }, 100);
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <>
      {productDetails &&
      !loading &&
      Object.keys(productDetails).length === 0 ? (
        <Empty />
      ) : (
        <Card className="productDetail" bordered={false}>
          <div className="productImage">
            <img
              className="productDetailsImage"
              src={productDetails.productImg}
              alt={productDetails.name}
            />
          </div>
          <div className="productInfo">
            <h1>{productDetails.name}</h1>
            <h2 className="price">
              £ {(Number(productDetails.price) * quantity).toFixed(2)}+ Free
              Shipping
            </h2>
            <p className="description">
              Description : {productDetails.productDesc}
            </p>
            <div className="quantitySelector">
              <br />
              <div className="quantityControl">
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                />
                <span>{quantity}</span>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity === productDetails.stock}
                />
              </div>
            </div>
            {productDetails.stock === 0 ? (
              <p className="red">Out Of Stock</p>
            ) : (
              <Button
                type="primary"
                className="addToCart"
                style={{ width: "12rem" }}
                onClick={handleClick}
              >
                Add To Cart
              </Button>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default ProductDetailsComponent;
