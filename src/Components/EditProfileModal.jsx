import { useState } from "react";
import "../Styles/EditProfileModal.css";
import toast from "react-hot-toast";

const EditProfileModal = ({ user, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user.username || "",
    phone: user.phone || "",
    address: user.address || "",
    profileImage: user.profileImage || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = async () => {
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

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Profile Updated Successfully");

        onUpdate(data.user);

        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editOverlay">

      <div className="editModal">

        <h2>Edit Profile</h2>

        <div className="inputGroup">

          <label>Username</label>

          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

        </div>

        <div className="inputGroup">

          <label>Phone</label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

        </div>

        <div className="inputGroup">

          <label>Address</label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

        </div>

        <div className="inputGroup">

          <label>Profile Image URL</label>

          <input
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
          />

        </div>

        <div className="modalButtons">

          <button
            className="cancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="saveBtn"
            onClick={saveProfile}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditProfileModal;