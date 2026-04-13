import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Card } from '../../../ui/card.jsx';
import { Separator } from '../../../ui/separator.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '../../../ui/pagination.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select.jsx';
import config from '@/config.jsx';
import { toast } from 'react-toastify';

const RecentOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // State to store order details
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        toast.error(`Error fetching orders: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/orders/${orderId}/details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setOrderDetails(data); // Set the order details
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error(`Error fetching order details: ${error.message}`);
    }
  };

  const toggleRow = async (orderId) => {
    if (expandedRow === orderId) {
      setExpandedRow(null); // Collapse the row
      setOrderDetails(null); // Clear the order details
    } else {
      setExpandedRow(orderId); // Expand the row
      await fetchOrderDetails(orderId); // Fetch the order details
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = orders.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="w-full mt-6">
      <Card className="p-4 bg-gray-200">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow p-5">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 rounded-2xl">
                <th className="w-10 p-2"></th>
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Service</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((order) => (
                <React.Fragment key={order.id}>
                  <tr
                    className="border-b border-gray-200  hover:bg-blue-100 cursor-pointer "
                    onClick={() => toggleRow(order.id)}
                  >
                    <td className="p-2 text-center">
                      {expandedRow === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </td>
                    <td className="p-2 font-medium">{order.id}</td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span className="font-medium">{order.user.name}</span>
                        <span className="text-xs text-gray-500">{order.user.number}</span>
                      </div>
                    </td>
                    <td className="p-2">{order.serviceType}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(order.date)}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Select
                        value={order.status}
                        onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                  {expandedRow === order.id && (
                    <tr>
                      <td colSpan={6} className="p-0">
                        <div className="bg-cyan-950 p-4 text-white rounded-2xl">
                          <h4 className="font-medium mb-3">Order Details</h4>
                          <Separator className="mb-3" />
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {orderDetails && orderDetails.details && orderDetails.details.length > 0 ? (
                              orderDetails.details.map((detail, index) => (
                                <div key={index}>
                                  <span className="text-sm text-gray-100">{detail.name}</span>
                                  <p className="font-medium text-gray-100">{detail.value}</p>
                                </div>
                              ))
                            ) : (
                              <div>
                                <span className="text-sm text-gray-500">No additional details available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: Math.ceil(orders.length / rowsPerPage) }).map(
                  (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(orders.length / rowsPerPage)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RecentOrdersTable;