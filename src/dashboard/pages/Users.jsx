import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

function Users() {
  const axios = useAxios();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      });
  }, []);
  return (
    <div>
      <div className="overflow-x-auto border shadow-sm border-black/5">
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
            {users?.map((user) => {
              return (
                <tr key={user._id}>
                  <th>{user?.name}</th>
                  <td>{user?.email}</td>
                  <td>
                    <select className="select select-primary" name="role" id="role" value={user?.role}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </td>
                  <td><button className="btn btn-error btn-sm"><i className="fas fa-trash text-white"></i></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
