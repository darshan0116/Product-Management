import { Button, Card } from "antd";
import { ProductProps } from "../ManageProducts/types";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

const ProductCard = (product: ProductProps) => {
  const navigate = useNavigate();
  const navigateToProduct = (url: string) => {
    navigate(url);
  };
  return (
    <Card
      hoverable
      className="productCard"
      cover={
        <img
          alt={product.name}
          src={product.productImg}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "200px",
            marginTop: "10px",
          }}
        />
      }
      actions={[
        product.stock === 0 ? (
          <p className="red">Out of Stock</p>
        ) : (
          <Button
            key={`/products/${product.productId}`}
            onClick={() => navigateToProduct(`/products/${product.productId}`)}
          >
            View Details
          </Button>
        ),
      ]}
    >
      <Meta
        title={<div className="productTitle">Name: {product.name}</div>}
        description={
          <div className="productDescription">
            <p className="productPrice">
              Price:£{Number(product.price).toFixed(2)}
            </p>
            <p className="productDesc">Description: {product.productDesc}</p>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;
