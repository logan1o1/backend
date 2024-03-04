const Book = require("../../models/Book");

const getBooks = {
  async getBookByCategories(erq, res, next) {
    const { category } = req.body;
    try {
      const books = await Book.find({ category: category });
      res.status(201).json({
        success: true,
        books,
      });
    } catch (error) {
      next(error);
    }
  },
  async getBookByCondition(req, res, next) {
    const { condition } = req.body;
    try {
      const books = await Book.find({ condition: condition });
      res.status(201).json({
        success: true,
        books,
      });
    } catch (error) {
      next(error);
    }
  },
  async getBookByBookName(req, res, next) {
    const { titleQuery } = req.body;
    try {
      const escapedQuery = titleQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regexPattern = new RegExp(`^${escapedQuery}`, "i");
      const books = await Book.find({ title: { $regex: regexPattern }});
      res.status(201).json({
        success: true,
        books,
      });
    } catch (error) {
      next(error);
    }
  },
  async getBookByAuthor(req, res, next) {
    const { authorQuery } = req.body;
    try {
      const escapedQuery = authorQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regexPattern = new RegExp(`^${escapedQuery}`, "i");
      const books = await Book.find({ author: { $regex: regexPattern }});
      res.status(201).json({
        success: true,
        books,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = getBooks;
