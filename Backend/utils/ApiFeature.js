// A class to handle API features like search, filtering, and pagination.
class ApiFeature {
  // Constructs a new instance of the ApiFeature class.
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //  Search method to search for documents based on a keyword.
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter method to filter documents based on provided query parameters.
  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing some fields for categories
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and ratings
    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  //  Pagination method to paginate the query results.
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeature;
