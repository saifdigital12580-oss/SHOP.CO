import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Styles/addproductform.css";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {




   const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      name: "",
      address: "",
      phone: "",
    },

    validationSchema: Yup.object({

      name: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Name is required"),

      address: Yup.string()
        .min(10, "Enter complete address")
        .required("House Address is required"),

      phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
        .required("Phone Number is required"),

    }),

   onSubmit: (values) => {
  alert("✅ Order Placed Successfully");
  navigate("/shoppage");
},

  });

  return (

    <div className="add-product-container">

      <div className="add-product-card">

        <div className="add-product-header">
          <h2>Buy Product</h2>
          <p>Enter your delivery details</p>
        </div>

        <form onSubmit={formik.handleSubmit}>

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name && formik.errors.name && (
              <p className="error">{formik.errors.name}</p>
            )}

          </div>

          <div className="form-group">

            <label>House Address</label>

            <textarea
              rows="4"
              name="address"
              placeholder="Enter Complete House Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.address && formik.errors.address && (
              <p className="error">{formik.errors.address}</p>
            )}

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="03XXXXXXXXX"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.phone && formik.errors.phone && (
              <p className="error">{formik.errors.phone}</p>
            )}

          </div>

         <button type="submit"className="add-btn"onClick={() => {  formik.setTouched({name: true, address: true, phone: true,  });}}
        >
          Place Order
        </button>

        </form>

      </div>

    </div>



  );
};

export default AddProductForm;