const Book = require("../../models/Book");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const updateSellController = {
  async updateBookSale(req, res, next) {
    const {
      title,
      author,
      category,
      condition,
      price,
      description,
      genre,
      publisher,
      publicationYear,
    } = req.body;

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

      if (title) {
        book.title = title;
      }
      if (author) {
        book.author = author;
      }
      if (category) {
        book.category = category;
      }
      if (condition) {
        book.condition = condition;
      }
      if (price) {
        book.price = Number(price);
      }
      if (description) {
        book.description = description;
      }
      if (genre) {
        book.genre = genre;
      }
      if (publisher) {
        book.publisher = publisher;
      }
      if (publicationYear) {
        book.publicationYear = publicationYear;
      }

      await book.save();

      res.status(201).json({
        success: true,
        message: "Your book is being listed",
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  async updateImage(req, res, next) {
    const file = req.file;
    const userId = req.user._id;
    const { bookId } = req.params;
    if (!file || !userId || !bookId) {
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

      const fileUri = getDataUri(file);
      const cloudinaryUpload = await cloudinary.v2.uploader.upload(
        fileUri.content
      );
      await cloudinary.v2.uploader.destroy(book.mainImage.public_id);

      book.mainImage.public_id = cloudinaryUpload.public_id;
      book.mainImage.url = cloudinaryUpload.secure_url;

      await book.save();
      res.status(201).json({
        success: true,
        message: "Your book image is being updated",
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  async updateBookStatus(req,res, next){
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
  
        book.isAvailable =  !book.isAvailable;
  
        await book.save();
  
        res.status(201).json({
          success: true,
          message: "Your book status is being updated",
        });
      } catch (error) {
        console.log(error.message);
        next(error);
      }
  }
};

module.exports = updateSellController;
