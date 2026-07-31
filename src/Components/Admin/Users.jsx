import React, { useEffect, useState } from "react";
import "../../Styles/user.css";

const Users = () => {
  const [users, setUsers] = useState([]);


  

  const fetchUsers = async () => {
    try {
      const response = await fetch( "http://localhost:1000/auth/get-user", {
       credentials: "include",
     });

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);





const handleDelete = async (id) => {
   const confirmDelete = window.confirm(
      "Do you want to delete this USER ?"
    );

    if (!confirmDelete) return;
  console.log("Deleting:", id);

  try {
    const response = await fetch(
      `http://localhost:1000/auth/delete-users/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert("Deleted Successfully");
    } else {
      alert(data.message);
    }
  } catch (error) {
  console.log(error);
  alert(error.message);
}
};





// ak sath delete kerne wale
//   const handleBulkDelete = async () => {
  // 
//   try {
//     const response = await fetch(
//       "http://localhost:1000/auth/delete-users",
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ids: selectedUsers,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (data.success) {
//       setUsers(
//         users.filter(
//           (user) => !selectedUsers.includes(user._id)
//         )
//       );

//       setSelectedUsers([]);

//       alert("Users Deleted Successfully ✅");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };



{/* <button onClick={handleBulkDelete}>
  Delete Selected ({selectedUsers.length})
</button> */}




  return (
    <div className="users-container">
      <div className="users-card">
        <div className="users-header">
          <h2>👥 All Users</h2>
          <span>Total Users: {users.length}</span>
        </div>

        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="deactivate-btn" 
                     onClick={() => handleDelete(user._id)}>
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="no-users">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;