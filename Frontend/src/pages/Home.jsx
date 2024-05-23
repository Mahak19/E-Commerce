import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation } from "swiper/modules";
import Metadata from "../../Metadata";
import { getProducts } from "../actions/Products";
import FeaturedProducts from "../components/FeaturedProducts";
import Latest from "../components/Latest";

// Home component for the landing page
const Home = () => {
  const dispatch = useDispatch();

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Promotional message */}
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
      <div className="bg-body-tertiary">
        {/* Metadata */}
        <Metadata title={"Home"} />
        <div className="container mb-5 pt-5">
          <div>
            <div className="row container mt-4">
              {/* Banner */}
              <div className="col-lg-7">
                <p className="fs-1 fw-bold banner-text">
                  <span className="text-danger">Store.</span>The best way to buy
                  the products you love.
                </p>
              </div>
              {/* Assistance options */}
              <div className="col-lg-5 d-flex justify-content-end">
                <div>
                  <div className="d-flex align-items-center gap-2 my-3">
                    <div>
                      {/* Avatar for specialist */}
                      <Avatar src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-chat-specialist-icon-202309_AV2?wid=70&hei=70&fmt=jpeg&qlt=90&.v=1701194050335"></Avatar>
                    </div>
                    <div>
                      <small className="d-block fw-semibold">
                        Need shopping help?
                      </small>
                      {/* Link to ask a specialist */}
                      <small className="text-primary">
                        <Link className="text-decoration-none">
                          Ask a Specialist
                        </Link>
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 my-3">
                    <div>
                      {/* Avatar for Apple Store */}
                      <Avatar src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-chat-specialist-icon-202309_AV2?wid=70&hei=70&fmt=jpeg&qlt=90&.v=1701194050335"></Avatar>
                    </div>
                    <div>
                      <small className="d-block fw-semibold">
                        Visit an Apple Store
                      </small>
                      {/* Link to find an Apple Store */}
                      <small className="text-primary">
                        <Link className="text-decoration-none">
                          Find near you
                        </Link>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-4">
              <div className="col">
                {/* Swiper carousel for product categories */}
                <>
                  <Swiper
                    slidesPerView={8}
                    spaceBetween={15}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper px-3"
                    breakpoints={{
                      // Define breakpoints here
                      0: {
                        slidesPerView: 3,
                      },
                      520: {
                        slidesPerView: 6,
                      },
                      950: {
                        slidesPerView: 8,
                      },
                    }}
                  >
                    {/* Swiper slides for each product category */}
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-iphone-nav-202309_GEO_EMEA?wid=400&hei=260&fmt=png-alpha&.v=1692971740071"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/iphone"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title">iPhone</h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-mac-nav-202310?wid=400&hei=260&fmt=png-alpha&.v=1696964122666"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/mac"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                Mac
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-ipad-nav-202210?wid=400&hei=260&fmt=png-alpha&.v=1664912135437"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/ipad"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                iPad
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-watch-nav-202309_GEO_IN?wid=400&hei=260&fmt=png-alpha&.v=1693703814407"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/watch"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                Apple Watch
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-airpods-nav-202209?wid=400&hei=260&fmt=png-alpha&.v=1660676485885"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/airpods"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                AirPods
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783380000"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/airtag"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                AirTag
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha&.v=1664628458484"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/tv"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                Apple TV 4K
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-homepod-nav-202301?wid=400&hei=260&fmt=png-alpha&.v=1670389216654"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/homepod"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                HomePod
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-body-tertiary">
                      <div className="my-5">
                        <div className="card border-0 bg-body-tertiary">
                          <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-accessories-nav-202309?wid=400&hei=260&fmt=png-alpha&.v=1692803114952"
                            alt=""
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <Link
                              to={"/accessories"}
                              className="text-decoration-none text-dark"
                            >
                              <h6 className="card-title card-banner-title">
                                Accessories
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </>
              </div>
            </div>
          </div>
        </div>
        {/* Component for displaying latest products */}
        <Latest />
        {/* Component for displaying featured products */}
        <FeaturedProducts />
      </div>
      {/* Promotional message */}
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
    </div>
  );
};

export default Home;
