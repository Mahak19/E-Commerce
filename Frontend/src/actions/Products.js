import axios from "axios";
import {
  getProductDetailFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductsFailure,
  getProductsRequest,
  getProductsSuccess,
} from "../features/products/productSlice";

const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 1000000],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch(getProductsRequest());

      let link = `/api/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link += `&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch(
        getProductsSuccess({
          products: data.products,
          productCount: data.productCount,
          resultPerPage: data.resultPerPage,
          filteredProductsCount: data.filteredProductsCount,
        })
      );
    } catch (error) {
      dispatch(getProductsFailure(error.response.data.message));
    }
  };

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(getProductDetailRequest());

    const { data } = await axios.get(`/api/api/v1/product/${id}`);

    dispatch(getProductDetailSuccess(data.product));
  } catch (error) {
    dispatch(getProductDetailFailure(error.response.data.message));
  }
};

export { getProducts, getProductDetail };
