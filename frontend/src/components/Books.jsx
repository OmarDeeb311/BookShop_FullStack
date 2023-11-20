import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const result = await axios.get("http://localhost:8800/books");
        setBooks(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchAllBooks();
  }, []);
  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = () => {
    const approve = window.confirm(
      "Are You Sure You Want To Delete All Books?"
    );
    if (approve)
      try {
        axios.delete(`http://localhost:8800/books`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="header">
            <button className="deleteAll" onClick={handleDeleteAll}>
              Delete All Books
            </button>
            <h4> Welcome To The Book Store </h4>
            <button className="addNewBook">
              <Link to={"/add"}></Link> Add New Book
            </button>
          </div>
          <div className="container">
            {books.map((book) => {
              return Book(book, handleDelete);
            })}
          </div>
          {books.length == 0 && (
            <div className="addBooks"> Add Books To Show </div>
          )}
        </>
      )}
    </>
  );
}
function Book(book, handleDelete) {
  return (
    <div className="box" key={book.id}>
      <div className="name">
        <span>Book Name :</span>
        <h5>{book.name}</h5>
      </div>
      {book.cover && (
        <div className="cover">
          <img src={book.cover} alt="Book_Image" />
        </div>
      )}
      <div className="title">
        <p>Book Title :</p>
        <span>{book.title}</span>
      </div>
      <div className="price">
        <span>Price : </span>
        <span> ${book.price}</span>
      </div>
      <div className="buttons-group">
        <button>
          <Link to={`/update/${book.id}`}></Link> Update
        </button>
        <button onClick={() => handleDelete(book.id)}>Delete</button>
      </div>
    </div>
  );
}
