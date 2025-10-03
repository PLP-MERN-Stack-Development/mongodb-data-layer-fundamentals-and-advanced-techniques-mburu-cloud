// 2 BASIC CRUD OPERATIONS
//Insert a book
db.books.insertOne({
  title: "Book Title",
  author: "Author Name",
  genre: "Fiction",
  published_year: 2020,
  price: 29.99,
  in_stock: true,
  pages: 300,
  publisher: "Publisher Name"
})

//find all books in specific category
db.books.find({ genre: "Fiction" })

//finding books publish after a certain year 
db.books.find({ genre: "Fiction" })

//Find books by a specific author 
javascriptdb.books.find({ author: "Mburu nyoike" })

//Update the price of a specific book 
javascriptdb.books.updateOne({ title: "Book Title" }, { $set: { price: 35.00 } })

//Delete a book by its title 
javascriptdb.books.deleteOne({ title: "Book Title" })


//Task 3: Advanced Queries

//Books in stock 
javascriptdb.books.find({ in_stock: true, published_year: { $gt: 2010 } })

//Projection to show only title, author, and price:
javascriptdb.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)

//Sort by price (ascending and descending):

//Ascending:
javascriptdb.books.find().sort({ price: 1 })

//Descending:
javascriptdb.books.find().sort({ price: -1 })



//Pagination (5 books per page):

//First page (skip 0, limit 5):
javascriptdb.books.find().skip(0).limit(5)

//Second page (skip 5, limit 5):
javascriptdb.books.find().skip(5).limit(5)


//Task 4: Aggregation Pipeline

//Average price of books by genre:
javascriptdb.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

//Author with the most books:
javascriptdb.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])


//Group books by publication decade:
javascriptdb.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  { $project: { decade: { $concat: [ { $toString: { $multiply: ["$_id", 10] } }, "s" ] }, count: 1, _id: 0 } }
])


// 5: Indexing

//Index on title field:
javascriptdb.books.createIndex({ title: 1 })


//Compound index on author and published_year:
javascriptdb.books.createIndex({ author: 1, published_year: 1 })

//Use explain() to show performance:
javascriptdb.books.find({ title: "Book Title" }).explain("executionStats")
db.books.find({ author: "John Doe", published_year: 2020 }).explain("executionStats")






