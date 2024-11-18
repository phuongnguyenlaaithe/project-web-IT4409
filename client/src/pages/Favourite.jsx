import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import FavouriteTotal from '../components/FavouriteTotal';

const Favourite = () => {
  const { currency, favouriteItems, deleteFavorite, navigate } = useContext(ShopContext);

  // Xử lý fallback nếu favouriteItems không hợp lệ
  const safeFavouriteItems = Array.isArray(favouriteItems) ? favouriteItems : [];

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'FAVOURITE'} />
      </div>
      {safeFavouriteItems.length === 0 && (
        <div className="flex justify-center mt-10">
          <p>There are no products.</p>
        </div>
      )}
      <div>
        {safeFavouriteItems.map((item, index) => {
          if (!item || !item.image || !Array.isArray(item.image) || !item.image[0]) {
            // Bỏ qua nếu dữ liệu không hợp lệ
            return null;
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div
                className="flex items-start gap-6"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.pathname = `/product/${item._id}`;
                }}
              >
                <img
                  className="w-16 sm:w-20"
                  src={item.image[0]}
                  alt={item.name || 'Product image'}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantityFavorite(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
                style={{ visibility: "hidden" }}
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => deleteFavorite(item._id)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Delete item"
              />
            </div>
          );
        })}
      </div>
      {safeFavouriteItems.length > 0 && (
        <div className="flex justify-end my-20" style={{ visibility: "hidden" }}>
          <div className="w-full sm:w-[450px]">
            <FavouriteTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;
