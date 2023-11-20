import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";

export default function Update() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    name: "",
    title: "",
    cover: "",
    price: 0,
  });

  useEffect(() => {
    const getSelectedBook = async () => {
      const id = location.pathname.split("/")[2];
      try {
        const result = await axios.get(`http://localhost:8800/books/${id}`);
        setBook(result.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getSelectedBook();
  }, [location.pathname]);

  function handleChange(e) {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    let validForm = false;
    document.querySelector("#name").value.length > 0 &&
    document.querySelector("#title").value.length > 0 &&
    document.querySelector("#price").value.length > 0
      ? (validForm = true)
      : (validForm = false);
    if (validForm) {
      const id = location.pathname.split("/")[2];
      try {
        await axios.put(`http://localhost:8800/books/${id}`, book);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill All Fields");
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="add">
      <h1>Update Book</h1>
      <input
        id="name"
        type="text"
        placeholder="Enter Book Name"
        name="name"
        onChange={handleChange}
        value={book.name}
      />
      <input
        id="title"
        type="text"
        placeholder="Enter Title For Book"
        name="title"
        onChange={handleChange}
        value={book.title}
      />
      <input
        id="file"
        type="file"
        placeholder="Upload Book Cover Image"
        name="cover"
        onChange={handleChange}
      />
      <input
        id="price"
        type="number"
        placeholder="Enter Price of Book"
        name="price"
        onChange={handleChange}
        value={book.price}
      />
      <div className="buttons">
        <input
          type="submit"
          value="Update"
          className="upload"
          onClick={handleClick}
        />
        <button>
          <Link to="/">Cancel</Link>
        </button>
      </div>
    </div>
  );
}
