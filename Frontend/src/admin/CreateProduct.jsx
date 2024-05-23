import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel"; // Importing FloatingLabel component from react-bootstrap
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import Metadata from "../../Metadata"; // Importing Metadata component
import { getAdminProducts } from "../actions/AdminProducts"; // Importing getAdminProducts action
import { createProduct } from "../actions/CreateProduct"; // Importing createProduct action
import { Navigate } from "react-router-dom";

// Array of available product categories
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

// Component for creating a new product
const CreateProduct = () => {
  // State variables for managing form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // Redux state to check loading status
  const { isLoading } = useSelector((state) => state.createProduct);

  // Retrieving isAuthenticated and user state from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Function to handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Clearing previous images
    setImages([]);
    setImagesPreview([]);

    // Processing each selected image
    files.forEach((file) => {
      const Reader = new FileReader();

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          // Updating images and image previews
          setImagesPreview((old) => [...old, Reader.result]);
          setImages((old) => [...old, Reader.result]);
        }
      };
      Reader.readAsDataURL(file);
    });
  };

  // Function to handle product creation
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    // Creating form data
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("price", price);

    // Appending images to form data
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Dispatching createProduct action
    await dispatch(createProduct(formData));

    // Resetting form fields and images
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setStock("");
    setImagesPreview([]);

    // Fetching updated list of admin products
    dispatch(getAdminProducts());
  };

  // Redirecting user if not authorized
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the component
  return (
    <div className="container">
      <Metadata title={"Create Product - Admin"} />
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4 fw-bold">Add New Product</h1>
          {/* Product creation form */}
          <Form onSubmit={handleCreateProduct} encType="multipart/form-data">
            {/* Product name input */}
            <div className="mb-3">
              <FloatingLabel label="Product Name">
                <Form.Control
                  type="text"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="product name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </FloatingLabel>
            </div>
            {/* Product description input */}
            <div className="mb-3">
              <FloatingLabel label="Add product description">
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
            {/* Category, stock, and price inputs */}
            <div className="mb-3">
              <div className="row gy-3">
                <div className="col-lg-4">
                  <Form.Select
                    aria-label="Default select example"
                    className="border border-secondary-subtle rounded-3 py-3"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="">Select Category</option>
                    {/* Rendering category options */}
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                {/* Stock input */}
                <div className="col-lg-4">
                  <FloatingLabel label="Stock">
                    <Form.Control
                      type="number"
                      className="border border-secondary-subtle rounded-3"
                      placeholder="stock"
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                    />
                  </FloatingLabel>
                </div>
                {/* Price input */}
                <div className="col-lg-4">
                  <FloatingLabel label="Price">
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
            {/* Image upload */}
            <div className="mb-3">
              <div className="row gy-3">
                <div className="col-lg-4">
                  <div className="">
                    <label
                      htmlFor="productImages"
                      className="form-control text-center text-secondary p-5 border rounded-3 border-secondary-subtle"
                      style={{ cursor: "pointer" }}
                    >
                      Add Product Image
                    </label>
                    {/* Input for image selection */}
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
                {/* Rendering image previews */}
                {imagesPreview &&
                  imagesPreview.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-4 d-flex justify-content-center  align-items-center"
                      >
                        {/* Image preview */}
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
            {/* Submit button */}
            <div className="mb-3">
              <div className="row my-5">
                <div className="col-lg-6">
                  <button disabled={isLoading} className="checkout-btn">
                    {isLoading ? "Adding" : "Add Product"}
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

export default CreateProduct;
