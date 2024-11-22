import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';

const List = ({token}) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/list')
      if(res.data.success) {
        const products = res.data.products.reverse();
        setList(products);
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/product/remove`, {
        data: { id },
        headers: { token }
      });

      if(res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  useEffect(() => {
    fetchList();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };


  return (
    <div className='my-8'>
      <div className='flex justify-between items-center mb-4'>
        <p>All Products List</p>
      </div>

      <div className='flex flex-col gap-2'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {currentItems.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {list.length > 0 && (
        <Pagination 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={list.length}
        currentPageFirstItem={indexOfFirstItem + 1}
        currentPageLastItem={Math.min(indexOfLastItem, list.length)}
      />
      )}
    </div>
  )
}

export default List