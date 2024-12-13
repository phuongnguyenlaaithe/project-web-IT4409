import { useEffect, useState } from 'react'
import axios from "axios";
import {backendUrl, currency} from '../App'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import Pagination from '../components/Pagination';

const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filterOrders, setFilterOrders] = useState([]);

  const getAllOrders = async () => {
    if(!token) {
      return null;
    }

    try {
      const res = await axios.get(backendUrl + '/api/order/list',{ headers: { token } })
      if(res.status === 200) {
        const ordersData = res.data.reverse();
        setOrders(ordersData);
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleStatus = async (e, orderId) => {
    try {
      const res = await axios.put(backendUrl + '/api/order/status', 
        {orderId, status:e.target.value}, 
        {headers : {token} }
      );
      if(res.data.success) {
        await getAllOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, [token]);
  

  const applyFilter = () => {
    let ordersCopy = orders.slice();

    if (search) {
      ordersCopy = ordersCopy.filter((item) => item._id.toLowerCase().includes(search.toLowerCase()));
    }

    setFilterOrders(ordersCopy);
  };
  
  useEffect(() => {
    if (orders.length > 0) {
      applyFilter();
      setCurrentPage(1);
    }
  }, [orders, search]);

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filterOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); 
  };


  return (
    <div className="my-8">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <h3>Order List</h3>
        <div>
          <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 rounded-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-inherit text-sm border-none"
              type="text"
              placeholder="Search"
            />
            <img className="w-4" src={assets.search_icon} alt="" />
          </div>
        </div>
      </div>

      <div>
        {currentOrders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="my-3 font-medium">{order.address.name}</p>
              <div>
                <p>{order.address.address}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-base">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-base">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => handleStatus(e, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {filterOrders.length > 0 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={filterOrders.length}
          currentPageFirstItem={indexOfFirstOrder + 1}
          currentPageLastItem={Math.min(indexOfLastOrder, filterOrders.length)}
        />
      )}
    </div>
  );
}

export default Orders