const Book = require("../../models/Book");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const userProfileController = {
  async listMySells(req, res, next) {
    const userId = req.user._id;
    if (!userId) {
      return next(CustomErrorHandler.missingFields());
    }
    try {
      const books = await Book.find({ seller: userId });
      res.status(201).json({
        success: true,
        books,
      });
    } catch (error) {
      next(error);
    }
  },

  async listSoldBooks(req, res, next) {
    const userId = req.user._id;
    if (!userId) {
      return next(CustomErrorHandler.missingFields());
    }
    try {
      const books = await Book.find({ seller: userId, isAvailable: false });
      res.status(201).json({
        success: true,
        books,
      });
    } catch (error) {
      next(error);
    }
  },

  async listUnSoldBooks(req, res, next) {
    const userId = req.user._id;
    if (!userId) {
      return next(CustomErrorHandler.missingFields());
    }
    try {
      const books = await Book.find({ seller: userId, isAvailable: true });
      res.status(201).json({
        success: true,
        books,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userProfileController;
