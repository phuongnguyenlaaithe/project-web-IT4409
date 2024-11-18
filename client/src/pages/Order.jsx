import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
  const { getOrderUser, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getOrderUser(localStorage.getItem("token")).then((r) => setOrders(r));
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  return (
    <div className="border-t-2 pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Danh sách đơn hàng */}
      <div className="space-y-4 mt-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 bg-white shadow rounded-md flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Total Amount:</strong> {currency}
                {order.amount}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => openModal(order)}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
            >
              Detail
            </button>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết */}
      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-11/12 max-w-4xl max-h-[90%] overflow-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            {/* Thông tin chung của đơn hàng */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Order Information</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <p>
                  <strong>Order ID:</strong> {selectedOrder._id}
                </p>
                <p>
                  <strong>Total Amount:</strong> {currency}
                  {selectedOrder.amount}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {selectedOrder.paymentMethod}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Thông tin địa chỉ */}
            <div className="mt-6">
              <h3 className="text-lg font-bold">Shipping Address</h3>
              <div className="mt-2">
                <p>
                  {selectedOrder.address.firstName}{" "}
                  {selectedOrder.address.lastName}
                </p>
                <p>{selectedOrder.address.street}</p>
                <p>
                  {selectedOrder.address.city}, {selectedOrder.address.state},{" "}
                  {selectedOrder.address.zipcode}
                </p>
                <p>{selectedOrder.address.country}</p>
                <p>Phone: {selectedOrder.address.phone}</p>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="mt-6">
              <h3 className="text-lg font-bold">Order Items</h3>
              <div className="mt-4 space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border p-4 rounded"
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p>
                        <strong>Price:</strong> {currency}
                        {item.price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Size:</strong> {item.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút đóng */}
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
