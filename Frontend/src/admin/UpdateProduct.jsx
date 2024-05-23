import React, { useEffect, useState } from "react"; // Importing React and useState, useEffect hooks
import FloatingLabel from "react-bootstrap/FloatingLabel"; // Importing FloatingLabel component from react-bootstrap
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { Navigate, useParams } from "react-router-dom"; // Importing useParams hook from react-router-dom
import Metadata from "../../Metadata"; // Importing Metadata component
import { getProductDetail } from "../actions/Products"; // Importing action to fetch product detail
import { UpdateProducts } from "../actions/UpdateProduct"; // Importing action to update product

// Array of categories
const categories = [
  "Mobile",
  "Laptop",
  "Tablet",
  "AirPods",
  "Watch",
  "Vision",
  "Homes",
  "Accessories",
];

// UpdateProduct component
const UpdateProduct = () => {
  // Getting id from URL params
  const { id } = useParams();

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Selecting productDetail, isLoading, isAuthenticated and user states from Redux store
  const { productDetail } = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.updateProduct);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // State variables to manage form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // Function to handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const Reader = new FileReader();

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setImagesPreview((old) => [...old, Reader.result]);
          setImages((old) => [...old, Reader.result]);
        }
      };
      Reader.readAsDataURL(file);
    });
  };

  // Function to handle product update
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("price", price);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(UpdateProducts(id, formData));
  };

  // Redirecting user if not authorized
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Effect hook to fetch product detail
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]); // Added id and dispatch as dependencies

  // Effect hook to set form values when productDetail changes
  useEffect(() => {
    if (productDetail) {
      setName(productDetail.name);
      setDescription(productDetail.description);
      setCategory(productDetail.category);
      setStock(productDetail.stock);
      setPrice(productDetail.price);
      setOldImages(productDetail.image);
    }
  }, [productDetail]);
  return (
    <div className="container">
      <Metadata title={"Create Product - Admin"} />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4 fw-bold">Update Product</h1>
          {/* Form fields */}
          <Form onSubmit={handleUpdateProduct} encType="multipart/form-data">
            <div className="mb-3">
              {/* Input field for product name */}
              <FloatingLabel label="Update Product Name">
                <Form.Control
                  type="text"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="product name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </FloatingLabel>
            </div>
            <div className="mb-3">
              {/* Textarea for product description */}
              <FloatingLabel label="Update product description">
                <Form.Control
                  type="textarea"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  style={{ height: "120px" }}
                />
              </FloatingLabel>
            </div>
            <div className="mb-3">
              {/* Select input for product category */}
              <div className="row gy-3">
                <div className="col-lg-4">
                  <Form.Select
                    aria-label="Default select example"
                    className="border border-secondary-subtle rounded-3 py-3"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="">Update Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-lg-4">
                  {/* Input field for product stock */}
                  <FloatingLabel label="Update Stock">
                    <Form.Control
                      type="number"
                      className="border border-secondary-subtle rounded-3"
                      placeholder="stock"
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                    />
                  </FloatingLabel>
                </div>
                <div className="col-lg-4">
                  {/* Input field for product price */}
                  <FloatingLabel label="Update Price">
                    <Form.Control
                      type="number"
                      className="border border-secondary-subtle rounded-3"
                      placeholder="price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </FloatingLabel>
                </div>
              </div>
            </div>
            <div className="mb-3">
              {/* Input field for product images */}
              <div className="row gy-3">
                <div className="col-lg-4">
                  <div className="">
                    <label
                      htmlFor="productImages"
                      className="form-control text-center text-secondary p-5 border rounded-3 border-secondary-subtle"
                      style={{ cursor: "pointer" }}
                    >
                      Update Product Image
                    </label>
                    <input
                      type="file"
                      id="productImages"
                      accept="image/*"
                      onChange={handleImageChange}
                      multiple
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                {/* Displaying old product images */}
                {oldImages &&
                  oldImages.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-4 d-flex justify-content-center  align-items-center"
                      >
                        <img
                          className="card-img border border-secondary-subtle rounded-3 p-2"
                          src={image.url}
                          key={index}
                          style={{
                            height: "121px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    );
                  })}
                {/* Displaying images preview */}
                {imagesPreview &&
                  imagesPreview.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-4 d-flex justify-content-center  align-items-center"
                      >
                        <img
                          className="card-img border border-secondary-subtle rounded-3 p-2"
                          src={image}
                          key={index}
                          style={{
                            height: "121px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="mb-3">
              {/* Button to update product */}
              <div className="row my-5">
                <div className="col-lg-6">
                  <button disabled={isLoading} className="checkout-btn">
                    {isLoading ? "Updating..." : "Update Product"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

// Exporting UpdateProduct component
export default UpdateProduct;
