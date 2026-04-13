import React, { useState, useEffect } from "react";
import { Card } from '../../../ui/card.jsx'; // Assuming this is your Card component
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "../../../ui/pagination"; // Import shadcn/ui Pagination components
import config from "@/config.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('No authentication token found');
          return;
        }

        const response = await fetch(`${config.apiUrl}/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, []);

  // Handle block/unblock user
  const handleBlockChange = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch(`${config.apiUrl}/api/users/${id}/toggle-block`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, blocked: updatedUser.blocked } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user block status:', error);
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch(`${config.apiUrl}/api/users/${id}/delete`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(`Error deleting user: ${error.message}`);
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (users.length === 0) {
    return <p className="text-gray-500">No users found</p>;
  }

  return (
    <div className="w-full">
      <Card className="p-4 text-black bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="overflow-x-auto" style={{ height: "300px" }}> {/* Fixed height */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">User ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Mobile No.</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Blocked</th>
                <th className="p-2 text-left">Orders</th>
                <th className="p-2 text-left">Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b text-black bg-amber-50 border-gray-200  cursor-pointer"
                >
                  <td className="p-2 font-medium">{user.id}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.mobile}</td>
                  <td className="p-2">{user.address}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleBlockChange(user.id)}
                      className={`px-2 py-1 rounded ${
                        user.blocked ? "bg-red-500 text-white" : "bg-green-500 text-white"
                      }`}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                  <td className="p-2">{user.orders}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => paginate(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < Math.ceil(users.length / usersPerPage) ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage === Math.ceil(users.length / usersPerPage)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default Users;