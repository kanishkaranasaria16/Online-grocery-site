import React, { useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import Rating from "@mui/material/Rating";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";

const UPDATE = () => {
  const [ratingValue, setRatingValue] = useState(1);
  const [productImagesArr, setProductImagesArr] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brands: "",
    price: 0,
    Oldprice: 0,
    category: "",
    countInStock: 0,
    rating: 0,
  });

  const inputChange = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add image from file input
  const addProductImage = (e) => {
    const files = e.target.files; // Get the selected files
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setProductImagesArr((prevImages) => [...prevImages, ...newImages]);
    setFormFields((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // Store the image files in the form fields
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const updatedFormFields = {
      ...formFields,
      rating: ratingValue,
    };

    const formData = new FormData(); // Create a FormData instance

    // Append product fields to FormData
    for (const key in updatedFormFields) {
      formData.append(key, updatedFormFields[key]);
    }

    // Append image files to FormData
    formFields.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage("The product is created");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error creating product");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }

    // Reset the form
    setFormFields({
      name: "",
      description: "",
      images: [],
      brands: "",
      price: 0,
      Oldprice: 0,
      category: "",
      countInStock: 0,
      rating: 0,
    });
    setProductImagesArr([]);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <form className="form" onSubmit={addProduct}>
        <div className="row">
          <div className="col-md-12">
            <div className="cards p-4 mt-0">
              <div className="bread">
                <h5>PRODUCT UPLOAD</h5>
              </div>
              <div className="mb-4">
                <h2>BASIC INFORMATION</h2>
              </div>
              <div className="form-group">
                <h6>PRODUCT NAME</h6>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={inputChange}
                />
              </div>
              <div className="form-group">
                <h6>DESCRIPTION</h6>
                <textarea
                  rows={5}
                  cols={5}
                  name="description"
                  value={formFields.description}
                  onChange={inputChange}
                />
              </div>
              <div className="col">
                <div className="form-group">
                  <h6>CATEGORY</h6>
                  <input
                    type="text"
                    name="category"
                    value={formFields.category}
                    onChange={inputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <h6>BRAND</h6>
                  <input
                    type="text"
                    name="brands"
                    value={formFields.brands}
                    onChange={inputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <h6>OLD PRICE</h6>
                <input
                  type="text"
                  name="Oldprice"
                  value={formFields.Oldprice}
                  onChange={inputChange}
                />
              </div>
              <div className="form-group">
                <h6>DISCOUNT PRICE</h6>
                <input
                  type="text"
                  name="price"
                  value={formFields.price}
                  onChange={inputChange}
                />
              </div>
              <div className="col">
                <div className="form-group">
                  <h6>STOCK</h6>
                  <input
                    type="text"
                    name="countInStock"
                    value={formFields.countInStock}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-group">
                  <h6>RATING</h6>
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    onChange={(event, newValue) => setRatingValue(newValue)}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6 className="text-uppercase">Product Image</h6>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={addProductImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="cards p-4 mt-0">
              <div className="imageUploadSec">
                <h5 className="mb-4">Media And Published</h5>
                <div className="imgUploadBox d-flex align-items-center">
                  {productImagesArr.length > 0 ? (
                    productImagesArr.map((url, index) => (
                      <div className="uploadBox" key={index}>
                        <img src={url} alt={`Product ${index}`} />
                      </div>
                    ))
                  ) : (
                    <div>No images added yet.</div>
                  )}
                </div>
                <br />
                <button className="button-style" type="submit">
                  <FaCloudArrowUp className="icons" />
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Snackbar for Alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UPDATE;
