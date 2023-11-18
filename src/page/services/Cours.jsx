import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Header from "../../component/layout/header";
import PageHeader from "../../component/layout/pageheader";
import ProductList from "../../json/produit.json";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import image from "../../assets/images/produit/a2.png";
import PopularPost from "../../component/sidebar/popular-post";
import Footer from "../../component/layout/footer";
import Modal1 from "../../component/modal/modal1";
import { Form } from "react-bootstrap";
import ReactCardSlider from "../../component/slider/ReactCardSlider";
import ExempleSwiper from "../../component/section/exempleSwiper";

const Cours = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://dull-bull-cowboy-hat.cyclic.app/productcours")
      .then((response) => {
        const productsWithMatchingService = response.data.find(
          (product) => product.service === "Ouvrages Medicaux"
        );

        setProducts(productsWithMatchingService.productDetails);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  // console.log(products);
  const showResult = `Nombre des Produit ${products.length}`;
  const Products = products || [];

  const [show, setShow] = useState(false);
  const [ipbPromo, setIpbPromo] = useState([]);

  console.log(products);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shop, setShop] = useState([]);
  const { addItem, items, removeItem } = useCart();
  console.log(items);
  const handleAddToCart = (event, product) => {
    event.preventDefault();
    setShop((prevShop) => [...prevShop, product]);
  };
  const handleRemoveFromCart = (val) => {
    removeItem(val._id);
  };
  const [selectedSpecialite, setSelectedSpecialite] = useState([]);

  const handleSpecialiteChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setSelectedSpecialite((prevSelectedSpecialite) => {
      if (isChecked) {
        return [...prevSelectedSpecialite, value];
      } else {
        return prevSelectedSpecialite.filter((item) => item !== value);
      }
    });
  };
  // console.log(selectedSpecialite);
  const filteredProducts = Products.filter((product) => {
    const SpecialiteMatches =
      selectedSpecialite.length === 0 ||
      selectedSpecialite.includes(product.specialite);

    return SpecialiteMatches;
  });

  const uniqueSpecialites = [...new Set(products.map((val) => val.specialite))];
  const [showAllFilters, setShowAllFilters] = useState(false);
  const filtersToDisplay = showAllFilters
    ? uniqueSpecialites
    : uniqueSpecialites.slice(0, 7);
  //pas de produit
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
      <PageHeader title={"Ouvrages Medicaux"} curPage={"Ouvrages Medicaux"} />
      <div className="shop-page ">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Card style={{ width: "80%", padding: "0" }}>
                <Card.Header style={{ backgroundColor: "#C21807", width: "" }}>
                  <div className="custom-box">
                    <h4 style={{ color: "white" }}>Filter par specialite</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    {filtersToDisplay.map((specialite, i) => (
                      <div className="row-lg-1 " key={i}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={specialite}
                            checked={selectedSpecialite.includes(specialite)}
                            onChange={handleSpecialiteChange}
                            style={{
                              backgroundColor: "rgb(194, 24, 7)",
                              borderColor: "rgb(194, 24, 7)",
                            }}
                          />
                          <label className="form-check-label">
                            {specialite}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!showAllFilters && uniqueSpecialites.length > 7 && (
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
                     "grid" , "list"
                  }`}
                >
                  {filteredProducts &&
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
                              <Link to="#">{val.title}</Link>
                            </h5>
                            <div className="col ">
                              {" "}
                              <span
                                style={{ maxLines: "3", overflow: "hidden" }}
                              >
                                {val.desc}
                              </span>
                            </div>

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
                                val={val}
                                header="Ouvrages Medicaux"
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
                    ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Cours;
