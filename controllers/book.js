const { sql, poolPromise } = require("../database/db");

class BookController {
  async getAllData(req, res, next) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM Book");
      res.status(200).json(result.recordset);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getBookById(req, res, next) {
    try {
      const id = req.params.id;
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("ID", id)
        .query("SELECT * FROM Book WHERE id = @ID");
      res.status(200).json(result.recordset);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addBook(req, res, next) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("NAME", sql.VarChar, req.body.Name)
        .input("AUTHOR", sql.VarChar, req.body.Author)
        .input("TITLE", sql.VarChar, req.body.Title)
        .input("PRICE", sql.Int, req.body.Price)
        .query(
          "INSERT INTO Book (Name, Author, Title, Price) VALUES (@NAME,@AUTHOR,@TITLE,@PRICE)"
        );
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteBook(req, res, next) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("ID", req.body.id)
        .query("DELETE FROM Book WHERE Id = @ID");
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateBook(req, res, next) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("ID", sql.Int, req.body.id)
        .input("NAME", sql.VarChar, req.body.name)
        .query("UPDATE Book SET Name = @NAME WHERE Id = @ID");
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
var bookController = new BookController();

module.exports = bookController;
