import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import ProductList from "../json/produit.json";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import image from "../assets/images/produit/a2.png";
import { ToastContainer, toast } from "react-toastify";
import PopularPost from "../component/sidebar/popular-post";
import Footer from "../component/layout/footer";
import Modal1 from "../component/modal/modal1";
import ExempleSwiper from "../component/section/exempleSwiper";
const Produit = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://102.211.210.62/product")
      .then((response) => {
        const productsWithMatchingService = response.data.find(
          (product) => product.Faculte === university
        );

        if (productsWithMatchingService) {
          const filteredProductDetails =
            productsWithMatchingService.productDetails.filter(
              (detail) => detail.anne === year
            );

          setProducts(filteredProductDetails);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  console.log(products.length);
  const showResult = `Nombre des Produit ${products.length}`;
  const Products = products || [];
  const year = window.localStorage.getItem("class");
  const university = window.localStorage.getItem("university");

  // const [selectedPeriode, setSelectedPeriode] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shop, setShop] = useState([]);
  const { addItem, items, removeItem } = useCart();

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    setShop((prevShop) => [...prevShop, product]);
  };
  const handleRemoveFromCart = (val) => {
    removeItem(val.id);
  };
  const [selectedPeriode, setSelectedPeriode] = useState([]);

  const handlePeriodeChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setSelectedPeriode((prevSelectedPeriode) => {
      if (isChecked) {
        return [...prevSelectedPeriode, value];
      } else {
        return prevSelectedPeriode.filter((item) => item !== value);
      }
    });
  };
  console.log(selectedPeriode);
  const filteredProducts = Products.filter((product) => {
    const PeriodeMatches =
      selectedPeriode.length === 0 || selectedPeriode.includes(product.periode);

    return PeriodeMatches;
  });
  const uniquePeriode = [...new Set(products.map((val) => val.periode))];
  const [showAllFilters, setShowAllFilters] = useState(false);
  const filtersToDisplay = showAllFilters
    ? uniquePeriode
    : uniquePeriode.slice(0, 5);
  if (Products.length === 0) {
    return (
      <div>
        <Header />
        <h2 style={{ textAlign: "center", paddingTop: "10rem" }}>
          aucun article disponible pour le moment
        </h2>
        <img
          alt="emty cart"
          style={{
            width: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
          }}
          src={image}
        />
      </div>
    );
  }
  return (
    <Fragment>
      <Header />
      <PageHeader
        title={`F.M.${university} Cours ${year} anne`}
        curPage={"Shop"}
      />
      <div className="shop-page padding-tb">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Card style={{ width: "50%", padding: "0" }}>
                <Card.Header style={{ backgroundColor: "#C21807" }}>
                  <div className="custom-box">
                    <h4 style={{ color: "white" }}>Filter par periode</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    {filtersToDisplay.map((periode, i) => (
                      <div className="row-lg-1" key={i}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={periode}
                            checked={selectedPeriode.includes(periode)}
                            onChange={handlePeriodeChange}
                            style={{
                              backgroundColor: "rgb(194, 24, 7)",
                              borderColor: "rgb(194, 24, 7)",
                            }}
                          />
                          <label className="form-check-label">{periode}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!showAllFilters && uniquePeriode.length > 5 && (
                    <button
                      className="btn btn-link"
                      style={{ color: "rgb(194, 24, 7)" }}
                      onClick={() => setShowAllFilters(true)}
                    >
                      Show More
                    </button>
                  )}
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResult}</p>
                </div>
                <div
                  className={`shop-product-wrap row justify-content-center 
                    GridList ? "grid" : "list"
                  }`}
                >
                  {" "}
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((val, i) => (
                      <div className="col-lg-4 col-md-6 col-12" key={i}>
                        <div className="product-item">
                          <div className="product-thumb">
                            <div className="pro-thumb">
                              <img
                                style={{ height: "10rem" }}
                                src={`${val.imgUrl}`}
                                alt={`${val.imgAlt}`}
                              />
                            </div>
                            <div className="product-action-link">
                              <ExempleSwiper img={val.exempleurl} />
                            </div>
                          </div>

                          <div className="product-content">
                            <h5>
                              <Link to="/shop-single">{val.title}</Link>
                            </h5>

                            {items.filter((item) => item.id === val._id)
                              .length === 0 ? (
                              <Modal1
                                id={val._id}
                                imgUrl={val.imgUrl}
                                imgAlt={val.imgAlt}
                                title={val.title}
                                price={val.price}
                                desc={val.desc}
                                page={val.page}
                                total_quantity={val.Quantity}
                                header={university}
                              />
                            ) : (
                              <Button
                                className="lab-btn bg"
                                onClick={(e) => {
                                  removeItem(val._id);
                                }}
                              >
                                suprimer du panier
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">
                      <h2>Aucun produit disponible</h2>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>panier</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <PopularPost item={items} onRemove={handleRemoveFromCart} />
            </Offcanvas.Body>
            <Button
              className="vp"
              onClick={() => {
                localStorage.setItem("cartItems", JSON.stringify(shop));
                window.location.href = "/cart";
              }}
            >
              {" "}
              voir panier
            </Button>
          </Offcanvas>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Produit;
