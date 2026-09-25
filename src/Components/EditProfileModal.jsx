import { useState } from "react";
import "../Styles/EditProfileModal.css";
import toast from "react-hot-toast";

const EditProfileModal = ({ user, onClose, onUpdate }) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profileImage: user?.profileImage || "",
  });


  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ==============================
  // SELECT IMAGE FROM DEVICE
  // ==============================

  const handleImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;


    // Image check

    if (!file.type.startsWith("image/")) {

      toast.error("Please select an image");

      return;

    }


    // Size check - 2MB

    if (file.size > 2 * 1024 * 1024) {

      toast.error("Image must be less than 2MB");

      return;

    }


    const reader = new FileReader();


    reader.onloadend = () => {

      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));

    };


    reader.readAsDataURL(file);

  };


  // ==============================
  // SAVE PROFILE
  // ==============================

  const saveProfile = async () => {

    if (!formData.username.trim()) {

      toast.error("Username is required");

      return;

    }


    try {

      setLoading(true);


      const response = await fetch(
        "https://shop-cobackend.onrender.com/auth/update-profile",
        {
          method: "PUT",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: formData.username.trim(),
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            profileImage: formData.profileImage,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok || !data.success) {

        toast.error(
          data.message || "Profile update failed"
        );

        return;

      }


      onUpdate(data.user);

      toast.success(
        data.message || "Profile Updated Successfully"
      );

      onClose();


    } catch (error) {

      console.error("UPDATE PROFILE ERROR:", error);

      toast.error("Unable to connect with server");

    } finally {

      setLoading(false);

    }

  };


  // ==============================
  // CLOSE MODAL
  // ==============================

  const handleOverlayClick = (e) => {

    if (
      e.target === e.currentTarget &&
      !loading
    ) {

      onClose();

    }

  };


  return (

    <div
      className="editOverlay"
      onClick={handleOverlayClick}
    >

      <div className="editModal">


        {/* ==============================
            CLOSE BUTTON
        ============================== */}

        <button
          className="closeModalBtn"
          onClick={onClose}
          disabled={loading}
          type="button"
        >
          ×
        </button>


        {/* ==============================
            HEADER
        ============================== */}

        <div className="editModalHeader">

          <span className="editSmallTitle">
            ACCOUNT SETTINGS
          </span>

          <h2>
            Edit Profile
          </h2>

          <p>
            Update your personal information.
          </p>

        </div>


        {/* ==============================
            USERNAME
        ============================== */}

        <div className="inputGroup">

          <label>
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            disabled={loading}
          />

        </div>


        {/* ==============================
            EMAIL
        ============================== */}

        <div className="inputGroup">

          <label>
            Email
          </label>

          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="readonlyInput"
          />

          <small>
            Email cannot be changed from here.
          </small>

        </div>


        {/* ==============================
            PHONE
        ============================== */}

        <div className="inputGroup">

          <label>
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled={loading}
          />

        </div>


        {/* ==============================
            ADDRESS
        ============================== */}

        <div className="inputGroup">

          <label>
            Address
          </label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            disabled={loading}
          />

        </div>


        {/* ==============================
            PROFILE IMAGE
        ============================== */}

        <div className="inputGroup">

          <label>
            Profile Picture
          </label>


          <label
            htmlFor="profileImageUpload"
            className="uploadImageBtn"
          >
            📷 Choose Image
          </label>


          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            hidden
          />


          <span className="imageHint">
            JPG, PNG, WEBP • Maximum 2MB
          </span>


          {/* URL OPTION */}

          <input
            type="text"
            name="profileImage"
            value={
              formData.profileImage.startsWith("data:image")
                ? ""
                : formData.profileImage
            }
            onChange={handleChange}
            placeholder="Or paste image URL"
            disabled={loading}
          />

        </div>


        {/* ==============================
            IMAGE PREVIEW
        ============================== */}

        {formData.profileImage && (

          <div className="profileImagePreview">

            <img
              src={formData.profileImage}
              alt="Profile Preview"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

          </div>

        )}


        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="modalButtons">

          <button
            type="button"
            className="cancelBtn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>


          <button
            type="button"
            className="saveBtn"
            onClick={saveProfile}
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : "Save Changes"
            }

          </button>

        </div>


      </div>

    </div>

  );

};

export default EditProfileModal;