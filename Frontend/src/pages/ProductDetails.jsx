import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../actions/Products";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@mui/material";
import ReviewCard from "../components/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Metadata from "../../Metadata";
import { addToCart } from "../actions/Cart";
import { addUserReview } from "../actions/AddReview";
import { getReviews } from "../actions/GetReviews";
import Loading from "./Loading";

// Component for displaying product details
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [addReview, setAddReview] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [comments, setComments] = useState("");

  const dispatch = useDispatch();

  // Selecting data from Redux store
  const { isLoading, productDetail } = useSelector((state) => state.products);
  const { reviews, numberOfReviews } = useSelector((state) => state.getReviews);
  const { isAuthenticated } = useSelector((state) => state.user);

  // Extracting id from URL parameters
  const { id } = useParams();

  // Hook for navigation
  const navigate = useNavigate();

  // Function to calculate average rating
  const calculateAverageRating = () => {
    let totalRating = 0;
    if (reviews && reviews.length > 0) {
      reviews.forEach((review) => {
        totalRating += review.rating;
      });
      return totalRating / reviews.length;
    }
    return 0;
  };

  // Calculate average rating
  const averageRating = calculateAverageRating();

  // Function to decrease quantity
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity((prev) => prev - 1);
  };

  // Function to increase quantity
  const increaseQuantity = () => {
    if (productDetail && productDetail.stock <= quantity) {
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  // Function to handle adding the product to cart
  const handleAddToCart = () => {
    dispatch(addToCart(id, quantity));
  };

  // Function to handle adding a review
  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return navigate(`/login?redirect=/product/${id}`);
    } else {
      await dispatch(addUserReview(id, ratings, comments));
      dispatch(getReviews(id));
      setAddReview(false);
      setRatings(0);
      setComments("");
    }
  };

  // Fetch product details and reviews on component mount
  useEffect(() => {
    // const handleScroll = () => {};

    // window.addEventListener("scroll", handleScroll);

    dispatch(getProductDetail(id));
    dispatch(getReviews(id));

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [dispatch, id]);

  // window.scroll(0, 0);

  // Rendering loading
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // Rendering the ProductDetails component
  return (
    <div className="container">
      {/* Metadata component for setting page title */}
      <Metadata title={productDetail && productDetail.name} />
      <div className="row mb-5 mt-4 gy-5 py-4">
        <div className="col-lg-6">
          {/* Carousel for displaying product images */}
          <Carousel>
            {productDetail &&
              productDetail.image &&
              productDetail.image.map((image) => {
                return (
                  <div key={image._id} className="card rounded-4 border-0">
                    <img
                      src={image.url}
                      className="card-img"
                      style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      alt=""
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
        <div className="col-lg-6">
          <div className="mx-3">
            <div>
              {/* Displaying product name and ID */}
              <h1 className="mb-0 fw-semibold">
                {productDetail && productDetail.name}
              </h1>
              <small className="text-secondary d-block">
                Product Id # {productDetail && productDetail._id}
              </small>
            </div>
            <hr className="my-2" />
            <div className="my-2">
              <small>{productDetail && productDetail.description}</small>
              <div className="d-flex mt-1 align-items-center gap-2">
                {/* Displaying average rating */}
                <div>{averageRating}</div>
                <div>
                  <Rating
                    className="d-flex justify-content-start"
                    name="half-rating-read"
                    value={averageRating} // Ensure value is within 0 to 5
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
                <div className="mx-3">
                  {/* Displaying number of reviews */}
                  <small className="text-secondary">
                    ({numberOfReviews}
                    {numberOfReviews <= 1 ? "Review" : "Reviews"})
                  </small>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div>
              <div>
                {/* Displaying product price */}
                <h3 className="my-3 fw-bold">
                  ₹ {productDetail && productDetail.price}
                </h3>
              </div>
              <div className="d-flex align-items-center gap-5">
                <div className="d-flex align-items-center gap-2">
                  {/* Buttons for adjusting quantity */}
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span
                    className="d-flex justify-content-center"
                    style={{ width: "25px" }}
                  >
                    {quantity}
                  </span>
                  {/* Button to add product to cart */}
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={increaseQuantity}
                    disabled={!productDetail || productDetail.stock <= quantity}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-sm product-detail-addtocart-btn"
                    onClick={handleAddToCart}
                    disabled={
                      productDetail && productDetail.stock < 1 ? true : false
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div>
              {/* Displaying product stock status */}
              <p className="mb-0">
                Status:{" "}
                {productDetail && productDetail.stock >= 1 ? (
                  <span className="mx-1 text-success">In Stock</span>
                ) : (
                  <span className="mx-1 text-danger">Out Of Stock</span>
                )}
              </p>
            </div>
            <hr />
            <div>
              {/* Button to add review */}
              <button
                onClick={() => setAddReview(true)}
                className="btn btn-sm btn-warning"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Form for adding review */}
      {addReview && (
        <div className="py-3 mb-5 d-flex justify-content-center">
          <div className="border review-container p-5 rounded-3 border-secondary-subtle bg-body-tertiary">
            <form onSubmit={handleAddReview}>
              <div className="mb-3 d-flex justify-content-center">
                {/* Rating input */}
                <Rating
                  onChange={(event, newValue) => setRatings(newValue)}
                  value={ratings}
                />
              </div>
              <div className="mb-3">
                {/* Comment input */}
                <textarea
                  className="form-control"
                  rows={4}
                  cols={30}
                  placeholder="Add Review"
                  onChange={(e) => setComments(e.target.value)}
                  value={comments}
                />
              </div>
              <div className="mb-3 d-flex justify-content-center gap-2">
                {/* Buttons for cancelling or submitting review */}
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setAddReview(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-sm btn-warning">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="py-3">
        <h3 className="text-center mb-4">Reviews</h3>
        {/* Carousel for displaying reviews */}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          freeMode={true}
          className="mySwiper my-5"
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
          {reviews && reviews.length >= 1 ? (
            <div>
              {reviews.map((review) => {
                return (
                  <SwiperSlide key={review._id}>
                    {/* Component for displaying review */}
                    <ReviewCard
                      user={review && review.user}
                      firstName={review && review.firstName}
                      lastName={review && review.lastName}
                      ratings={review && review.rating}
                      comment={review && review.comment}
                      createdAt={review && review.createdAt}
                    />
                  </SwiperSlide>
                );
              })}
            </div>
          ) : (
            // Display message when there are no reviews
            <div className="fs-4">No Reviews Yet</div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetails;
