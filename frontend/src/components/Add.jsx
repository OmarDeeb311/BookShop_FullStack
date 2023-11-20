import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Add() {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: "",
    title: "",
    cover: "",
    price: null,
  });

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
      try {
        await axios.post("http://localhost:8800/books", book);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill All Fields");
    }
  };
  return (
    <div className="add">
      <h1>Add New Book</h1>
      <div className="input-groups">
        <label htmlFor="name"> Enter Name : </label>
        <input
          id="name"
          type="text"
          placeholder="Enter Book Name"
          name="name"
          onChange={handleChange}
          autoComplete="name"
        />
      </div>
      <div className="input-groups">
        <label htmlFor="title"> Enter Title : </label>
        <input
          id="title"
          type="text"
          placeholder="Enter Title For Book"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="input-groups">
        <label htmlFor="file"> Upload File : </label>
        <input
          id="file"
          type="file"
          placeholder="Upload Book Cover Image"
          name="cover"
          onChange={handleChange}
        />
      </div>
      <div className="input-groups">
        <label htmlFor="price"> Enter Price : </label>
        <input
          id="price"
          type="number"
          placeholder="Enter Price of Book"
          name="price"
          onChange={handleChange}
        />
      </div>
      <div className="buttons">
        <input type="submit" value="ADD" onClick={handleClick} />
        <button>
          <Link to="/">Cancel</Link>
        </button>
      </div>
    </div>
  );
}
