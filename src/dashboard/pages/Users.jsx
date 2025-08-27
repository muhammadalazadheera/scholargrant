import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Users() {
  const axios = useAxios();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const changeRole = (email, role) => {
    axios
      .put(
        "/change-role",
        { email, role },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(`Role successfully changed!`);
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  const deleteUser = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the user with email: ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/delete-user", {
            data: { email },
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          .then((res) => {
            setUsers((users) => users.filter((user) => user.email !== email));
            toast.success(`User successfully deleted!`);
          })
          .catch((err) => {
            toast.error(`${err}`);
          });
      }
    });
  };

  const filterUsers = (role) => {
    setUsers((users) => users.filter((user) => user.role === role));
  };

  useEffect(() => {
    axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-light mb-4">Manage Users</h2>
      <div className="overflow-x-auto border shadow-sm border-primary bg-base-100 rounded">
        <div className="flex justify-end my-3">
          <select
            onChange={(e) => filterUsers(e.target.value)}
            className="select select-primary mx-2 select-sm"
            name=""
            id=""
          >
            <option value="">Filter By Role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No User Found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <th>{user?.name}</th>
                  <td>{user?.email}</td>
                  <td>
                    <select
                      className="select select-primary"
                      name="role"
                      id="role"
                      defaultValue={user?.role}
                      onChange={(e) => changeRole(user?.email, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => deleteUser(user?.email)}
                    >
                      <i className="fas fa-trash text-white"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
