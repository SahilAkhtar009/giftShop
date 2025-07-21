import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      try {
        const res = await axios.get("https://giftshop-backend-9q1n.onrender.com/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users:", err);
        alert("Could not load users.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center sm:text-left">
        All Registered Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-pink-100 text-pink-800 text-sm sm:text-base">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Admin</th>
                <th className="p-3 text-left">Joined</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-base">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-pink-50 transition duration-200"
                >
                  <td className="p-3 whitespace-nowrap">{user.name}</td>
                  <td className="p-3 break-words">{user.email}</td>
                  <td className="p-3">
                    {user.isAdmin ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
