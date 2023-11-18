import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const PopularPost = ({ item, onRemove }) => {
  const [products, setProducts] = useState(item);
  const { removeItem } = useCart();
  const deleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    // localStorage.setItem("cartItems", JSON.stringify(newProducts));
  };

  return (
    <div className="widget widget-post">
      <div className="widget-header">
        <h5 className="title">Most Popular Posts</h5>
      </div>
      <ul className="widget-wrapper">
        {products.map((val, i) => (
          <li className="d-flex flex-wrap justify-content-between" key={i}>
            <div className="post-thumb">
              <Link to={`/blog/${val.id}`}>
                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
              </Link>
            </div>
            <div className="post-content">
              <Link to={`/blog/${val.id}`}>
                <h6>{val.title}</h6>
              </Link>
              <p>prix: {val.price}DT</p>
              <div className="quantity-controls">
                <button
                  className="icofont-trash"
                  onClick={() => {
                    deleteProduct(i);
                    removeItem(val.id);
                    onRemove(val);
                  }}
                ></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPost;
