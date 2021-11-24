var express = require("express");
var bookcontroller = require("../controllers/book");

var router = express.Router();

router.get("/api/book", bookcontroller.getAllData);
router.get("/api/book/:id", bookcontroller.getBookById);
router.post("/api/book", bookcontroller.addBook);
router.delete("/api/book", bookcontroller.deleteBook);
router.put("/api/book", bookcontroller.updateBook);

module.exports = router;
