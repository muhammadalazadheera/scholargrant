import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

function ProfilePage() {
  const { user } = use(AuthContext);
  const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "50%",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <img
                  src={`https://randomuser.me/api/portraits/men/${getRandomNumber()}.jpg`}
                  alt="Profile"
                  style={{ borderRadius: "50%" }}
                />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                John Doe
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                {user.email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfilePage;
