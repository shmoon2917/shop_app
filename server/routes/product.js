const express = require("express");
const Jimp = require("jimp");
const router = express.Router();
const multer = require("multer");
const { Product } = require("..//models/Product");
//=================================
//            Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadImageAsync = (req, res) => {
  const upload = multer({ storage }).single("file");

  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) reject(err);
      else {
        resolve(req.file);
      }
    });
  });
};

router.post("/image", async (req, res) => {
  // 가져온 이미지 저장
  try {
    const file = await uploadImageAsync(req, res);

    const processImage = await Jimp.read(`uploads/${file.filename}`);
    await processImage
      .resize(500, Jimp.AUTO)
      .crop(0, 0, 300, 200)
      .quality(60)
      .writeAsync(`uploads/sm-${file.filename}`);

    const modifiedFileName = `sm-${file.filename}`;
    const modifiedPath = `uploads\\${modifiedFileName}`;

    return res.status(200).json({
      status: "ok",
      data: {
        success: true,
        filePath: modifiedPath,
        fileName: modifiedFileName,
      },
      message: "파일 저장에 성공했습니다",
      error: "",
    });
  } catch (err) {
    return res.json({
      status: "error",
      data: err,
      message: "파일 저장에 실패했습니다",
      error: "product-0001",
    });
  }
});

router.post("/", (req, res) => {
  // 받아온 정보 db에 저장
  const product = new Product(req.body);
  product.save((err, productInfo) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        data: {
          err,
        },
        message: "상품 정보 등록에 실패했습니다.",
        error: "product-0002",
      });
    }

    return res.status(200).json({
      status: "ok",
      data: {},
      message: "상품 정보 등록에 성공하였습니다",
      error: "",
    });
  });
});

router.post("/products", async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit, 10) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip, 10) : 0;

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  console.log("findArgs", findArgs);

  // product collection 에 들어 있는 모든 상품 정보 가져오기
  try {
    const productsInfo = await Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec();

    console.log("length", productsInfo.length);

    return res.status(200).json({
      status: "ok",
      data: { productsInfo, postSize: productsInfo.length },
      message: "상품 정보 가져오는 데 성공했습니다",
      error: "",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      data: err,
      message: "상품 정보 가져오는 데 실패했습니다",
      error: "product-0003",
    });
  }
});

module.exports = router;
