import React from 'react';

const Pagination = ({ 
  currentPage,  
  onPageChange, 
  itemsPerPage, 
  onItemsPerPageChange,
  totalItems,
  currentPageFirstItem,
  currentPageLastItem 
}) => {

  const calculateTotalPages = () => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const getPageNumbers = () => {
    const calculatedTotalPages = calculateTotalPages();
    if (calculatedTotalPages <= 1) return [];
    
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const ellipsis = '...';

    if (calculatedTotalPages <= totalPagesToShow + 4) {
      for (let i = 1; i <= calculatedTotalPages; i++) {
        pageNumbers.push(i);
      }
    } else {

      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push(ellipsis);
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(calculatedTotalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= calculatedTotalPages - 2) {
        start = calculatedTotalPages - 3;
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < calculatedTotalPages - 2) {
        pageNumbers.push(ellipsis);
      }

      pageNumbers.push(calculatedTotalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = (newPage) => {
    const calculatedTotalPages = calculateTotalPages();
    const validPage = Math.max(1, Math.min(newPage, calculatedTotalPages));
    onPageChange(validPage);
  };

  const getCurrentRangeText = () => {
    const start = currentPageFirstItem;
    const end = Math.min(currentPageLastItem, totalItems);
    return `Showing ${start} to ${end} of ${totalItems} items`;
  };

  const calculatedTotalPages = calculateTotalPages();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label className="text-sm">Items per page:</label>
        <select 
          className="border p-1 rounded"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        {totalItems > 0 && (
          <span className="text-sm text-gray-600 ml-4">
            {getCurrentRangeText()}
          </span>
        )}
      </div>
      
      {calculatedTotalPages > 1 && (
        <div className="flex gap-1">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {getPageNumbers().map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === '...' ? (
                <span className="px-3 py-1">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 border rounded hover:bg-gray-100 ${
                    currentPage === pageNum ? 'bg-gray-200' : ''
                  }`}
                >
                  {pageNum}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === calculatedTotalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;