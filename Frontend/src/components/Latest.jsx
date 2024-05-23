import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Component to display the latest products using Swiper
const Latest = () => {
  return (
    <div className="container-fluid px-0">
      <div className="container">
        {/* Heading for the latest products */}
        <h3 className="fw-bold latest-text">
          <span className="text-dark">The latest. </span>Take a look at what’s
          new right now.
        </h3>
      </div>
      <div className="py-4">
        <>
          {/* Swiper component to display latest products */}
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20}
            freeMode={true}
            className="mySwiper mySwiper-latest"
            breakpoints={{
              // Define breakpoints here
              0: {
                slidesPerView: 1,
              },
              520: {
                slidesPerView: 2,
              },
              950: {
                slidesPerView: 3,
              },
            }}
          >
            {/* Swiper slides for each latest product */}
            <SwiperSlide>
              {/* Individual product card */}
              <div className="card latest-cards border-0 image-container">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-iphone-15-pro-202309?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1692910040844"
                  className="card-img"
                  alt=""
                />
                {/* Text overlay on the image */}
                <div className="image-text text-light">
                  <small className="my-1">IPHONE 15 PRO</small>
                  <h4 className="fw-bold my-1">Titanium</h4>
                  <div className="my-1">From ₹134900.00‡</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card latest-cards border-0 image-container">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-iphone-15-202309?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1692719973220"
                  className="card-img shadow-sm"
                  alt=""
                />
                <div className="image-text text-dark">
                  <small className="my-1">IPHONE 15 PRO</small>
                  <h4 className="fw-bold my-1">Newphoria </h4>
                  <div className="my-1">From ₹79900.00‡</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card latest-cards border-0 image-container">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-macbook-pro-202310?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1696964122967"
                  className="card-img shadow-sm"
                  alt=""
                />
                <div className="image-text text-dark">
                  <small className="my-1">IPHONE 15 PRO</small>
                  <h4 className="fw-bold my-1">Titanium</h4>
                  <div className="my-1">From ₹134900.00‡</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card latest-cards border-0 image-container">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-bhm-202401?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1703005205962"
                  className="card-img shadow-sm"
                  alt=""
                />
                <div className="image-text text-light">
                  <small className="my-1">IPHONE 15 PRO</small>
                  <h4 className="fw-bold my-1">Titanium</h4>
                  <div className="my-1">From ₹134900.00‡</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card latest-cards border-0 image-container">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-watch-s9-202309_GEO_IN?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1693501324197"
                  className="card-img shadow-sm"
                  alt=""
                />
                <div className="image-text text-light">
                  <small className="my-1">IPHONE 15 PRO</small>
                  <h4 className="fw-bold my-1">Titanium</h4>
                  <div className="my-1">From ₹134900.00‡</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card latest-cards border-0 image-container">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-veteran-202309?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1700069399720"
                  className="card-img shadow-sm"
                  alt=""
                />
                <div className="image-text text-dark">
                  <small className="my-1">IPHONE 15 PRO</small>
                  <h4 className="fw-bold my-1">Titanium</h4>
                  <div className="my-1">From ₹134900.00‡</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card latest-cards border-0 image-container">
                <img
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-ipad-202310_GEO_IN?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1696875268001"
                  className="card-img shadow-sm"
                  alt=""
                />
                <div className="image-text text-dark">
                  <small className="my-1">IPHONE 15 PRO</small>
                  <h4 className="fw-bold my-1">Titanium</h4>
                  <div className="my-1">From ₹134900.00‡</div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default Latest;
