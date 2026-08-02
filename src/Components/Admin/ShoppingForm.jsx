import { useNavigate, useLocation } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import "../../Styles/shoppingform.css";



const ShoppingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const editProduct = location.state?.product;

  const initialValues = {
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price || "",
    category: editProduct?.category || "",
    image: null,
    stock: editProduct?.stock || "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Product Name is required")
      .min(3, "Minimum 3 characters required")
      .max(30, "Maximum 30 characters allowed"),

    description: yup
      .string()
      .required("Description is required")
      .min(30, "Minimum 30 characters required")
      .max(55, "Maximum 55 characters allowed"),

    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),

    category: yup
      .string()
      .required("Category is required"),

   image: yup.mixed().required("Image is required"),

    stock: yup
      .number()
      .typeError("Stock must be a number")
      .required("Stock is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {

   
    try {
      setLoading(true);
      const isEdit = !!editProduct;
      

      const url = isEdit
        ? `https://shop-cobackend.onrender.com/product/update-product/${editProduct._id}`
        : "https://shop-cobackend.onrender.com/product/create-product";

      const method = isEdit ? "PUT" : "POST";

   
const formData = new FormData();

formData.append("name", values.name);
formData.append("description", values.description);
formData.append("price", values.price);
formData.append("category", values.category);
formData.append("stock", values.stock);

if (values.image) {
  formData.append("image", values.image);
}
   const response = await fetch(url, {
        method,
        body: formData,
      });





      const data = await response.json();
      

      if (response.ok) {
        setMessage(data.message);

        alert(
          isEdit
            ? "Product Updated Successfully ✅"
            : "Product Created Successfully ✅"
        );

        resetForm();
        setLoading(false);
        navigate("/adminpanel/admin-products");
      } else {
        alert(data.message || "Operation failed");
      }
    } catch (error) {
      setLoading(false);
      console.log("Server Error:", error.message);

      setMessage(`Error: ${error.message}`);

      alert("Server Error ❌");
    }
  };

  return (
    <>
      <div className="Form">
        <div className="Forminnerbox">
          <div className="TheGamers">
            <h1>
              The <span className="spanform">SHOP.CO</span>
            </h1>
          </div>

          <div className="welcome">
            <h1>
              {editProduct ? "Update Product" : "Create Product"}
            </h1>
          </div>

          <br />

<Formik
enableReinitialize
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={handleSubmit}
>

{({ setFieldValue }) => (

<Form>
             
<div className="uploadBox">

<label className="uploadLabel">



<input
type="file"
hidden
accept="image/*"

onChange={(e)=>{

const file=e.currentTarget.files[0];
if(!file) return;
setFieldValue("image",file);
setPreview(URL.createObjectURL(file));
}}
/>
{

preview?

<div className="previewBox">

<img
src={preview}
alt=""
className="previewImage"
/>

<button
type="button"
className="removeImage"
onClick={()=>{
setPreview(null);
setFieldValue("image",null);
}}
>
✕
</button>
</div>
:
<div className="uploadContent">
<h2>📸 Upload Product Image</h2>
<p>
Drag & Drop
<br/>
or
<br/>
Click Here
</p>
</div>
}
</label>
<ErrorMessage
name="image"
component="p"
className="error"
/>
</div>

              <br />

              {/* Product Name */}
              <div>
                Product Name:
                <br />
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  className="emailbar"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="error"
                />
              </div>

              <br />

              {/* Description */}
              <div>
                Description:
                <br />
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter Product Description"
                  className="emailbar"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="error"
                />
              </div>

              <br />

              {/* Price */}
              <div>
                Price:
                <br />
                <Field
                  type="number"
                  name="price"
                  placeholder="1000"
                  className="emailbar"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="error"
                />
              </div>

              <br />

              {/* Category */}
              <div>
                Category:
                <br />
                <Field
                  type="text"
                  name="category"
                  placeholder="Electronics"
                  className="emailbar"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="error"
                />
              </div>

              <br />

              {/* Stock */}
              <div>
                Stock:
                <br />
                <Field
                  type="number"
                  name="stock"
                  placeholder="10"
                  className="emailbar"
                />
                <ErrorMessage
                  name="stock"
                  component="p"
                  className="error"
                />
              </div>

              <br />
              <br />

<button
type="submit"
className="submitbox"
disabled={loading}
>
{
loading
?
"Uploading..."
:
editProduct
?
"Update Product"
:
"Create Product"
}
</button>

              {message && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {message}
                </p>
              )}
            </Form>
             )}
          </Formik>

          <br />

          <div className="backtoproductfont"  
           onClick={() =>
            navigate("/adminpanel/admin-products")
          }
          style={{ cursor: "pointer" }}>
            
              Back to Products
           
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingForm;