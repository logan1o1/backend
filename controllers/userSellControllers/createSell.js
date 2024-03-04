const Book = require("../../models/Book");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");
const getDataUri = require("../../utils/DataUri");
const cloudinary = require("cloudinary");
const createSellController = {
  async create(req, res, next) {
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

    const file = req.file;
    const userId = req.user._id;

    if (
      !title ||
      !author ||
      !category ||
      !condition ||
      !price ||
      !file ||
      !userId
    ) {
      return next(CustomErrorHandler.missingFields());
    }

    try {
      const fileUri = getDataUri(file);
      const cloudinaryUpload = await cloudinary.v2.uploader.upload(
        fileUri.content
      );

      await Book.create({
        title,
        author,
        category,
        condition,
        price: Number(price),
        description: description ? description : "",
        genre: genre ? genre : "",
        publisher: publisher ? publisher : "",
        publicationYear: publicationYear ? publicationYear : "",
        seller: userId,
        mainImage: {
          public_id: cloudinaryUpload.public_id,
          url: cloudinaryUpload.secure_url,
        },
      });

      res.status(201).json({
        success: true,
        message: "Your book is being listed",
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};

module.exports = createSellController;
