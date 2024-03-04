const Book = require("../../models/Book");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const deleteSellController = {
  async deleteBookSale(req, res, next) {
    const { bookId } = req.params;
    if (!bookId) {
      return next(CustomErrorHandler.missingFields());
    }

    try {
      let book = await Book.findById(bookId);

      // if book is not present
      if (!book) {
        return next(
          CustomErrorHandler.notFound(
            "The book you are trying to update is not found"
          )
        );
      }

      //   security check
      if (req.user._id.toString() !== book.seller.toString()) {
        return next(CustomErrorHandler.cantAccessResource());
      }

      await Book.findByIdAndDelete(bookId);

      res.status(201).json({
        success: true,
        message: "book is being removed",
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};

module.exports = deleteSellController;
