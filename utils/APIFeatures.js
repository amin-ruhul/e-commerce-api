class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };
    const removeField = ["keyword", "limit", "page"];
    removeField.forEach((e) => delete queryCopy(el));

    this.query = this.query.find(queryCopy);

    return this;
  }
}

module.exports = APIFeatures;
