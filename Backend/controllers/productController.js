import Product from "../model/productMode.js";
import ApiFeature from "../utils/ApiFeature.js";
import { v2 as cloudinary } from "cloudinary";

const flattenArray = (arr) => {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val);
  }, []);
};

// Create New Product ---Admin
const createProduct = async (req, res) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images; // i am getting multiple nested arrays when i am adding more than three images
    }

    // Flatten the images array recursively to handle nested arrays
    images = flattenArray(images);

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const myCloud = await cloudinary.uploader.upload(images[i], {
        folder: "ecommerce-products",
      });

      imagesLink.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
    }

    req.body.image = imagesLink;
    req.body.createdBy = req.user._id;

    const product = new Product(req.body);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all Products
const getAllProducts = async (req, res) => {
  try {
    const resultPerPage = process.env.PRODUCT_PER_PAGE;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeature(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();

    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Admin Products
const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Single Product
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product -- Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update product fields if provided in the request body
    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.category) {
      product.category = req.body.category;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.stock) {
      product.stock = req.body.stock;
    }

    // Handle image deletion and upload
    let images = []; // Initialize images with an empty array if not provided

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      // Delete existing images from Cloudinary
      for (let i = 0; i < product.image.length; i++) {
        await cloudinary.uploader.destroy(product.image[i].public_id);
      }

      // Flatten the images array recursively to handle nested arrays
      images = flattenArray(images);

      // Upload new images to Cloudinary
      const imagesLink = [];
      for (let i = 0; i < images.length; i++) {
        const myCloud = await cloudinary.uploader.upload(images[i], {
          folder: "ecommerce-products",
        });
        imagesLink.push({
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        });
      }

      // Update product images
      product.image = imagesLink;
    }
    // Save the updated product
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product -- Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.uploader.destroy(product.image[i].public_id);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Product Review
const createProductReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const product = await Product.findById(productId);
    const review = {
      user: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rating: Number(rating),
      comment: comment,
      createdAt: new Date(), // Ensure createdAt is included for each review
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review); // Ensure createdAt is included here
      product.numberOfReviews = product.reviews.length;
    }

    let averageRating = 0;

    product.reviews.forEach((rev) => {
      averageRating = averageRating + rev.rating;
    });

    product.ratings = averageRating / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review Added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all reviews of a product
const getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = await product.reviews;

    res.status(200).json({
      success: true,
      reviews,
      numberOfReviews: product.numberOfReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// // Delete review
// const deleteReview = async (req, res) => {
//   try {
//     const product = await Product.findById(req.query.productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     const reviews = product.reviews.filter(
//       (rev) => rev._id.toString() !== req.query.id.toString()
//     );

//     let averageRating = 0;

//     reviews.forEach((rev) => {
//       averageRating = averageRating + rev.rating;
//     });

//     const ratings = averageRating / reviews.length;

//     const numberOfReviews = reviews.length;

//     await Product.findByIdAndUpdate(req.query.productId, {
//       reviews,
//       ratings,
//       numberOfReviews,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Reviews deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Delete review
const deleteReview = async (req, res) => {
  try {
    console.log('Working')
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let averageRating = 0;

    reviews.forEach((rev) => {
      averageRating = averageRating + rev.rating;
    });

    const numberOfReviews = reviews.length;
    const newRatings =
      numberOfReviews > 0 ? averageRating / numberOfReviews : 0;

    await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings: newRatings,
      numberOfReviews,
    });

    res.status(200).json({
      success: true,
      message: "Reviews deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createProduct,
  getAllProducts,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
};
