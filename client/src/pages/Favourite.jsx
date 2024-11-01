import { useCallback, useState } from 'react';
import { assets } from '../assets/assets';

const DATA_TEMPLATE = [
  {
    id: '1',
    name: 'Men Round Neck Pure Cotton T-shirt',
    image: [assets.p_img1],
    price: '149$',
  },
];

const Favourite = () => {
  const [myFavourite, setMyFavourite] = useState([]);

  const onDeleteProduct = useCallback(
    (productId) => {
      const data = myFavourite.filter((item) => item.id != productId);
      setMyFavourite(data);
    },
    [myFavourite]
  );

  useState(() => {
    //TODO: call api in here
    setMyFavourite(DATA_TEMPLATE);
  }, []);

  return (
    <div class="h-screen py-8 border-t mb-96">
      <div class="container">
        <div className="flex gap-2 justify-start items-center">
          <h1 class="text-2xl font-semibold">
            <span className="font-normal text-gray-700">Your</span> Favourite
          </h1>
          <div className="w-12 rounded h-[3px] mt-2 bg-gray-500"></div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 border-t mt-8">
          <div class="w-full">
            <div class="bg-white rounded-lgp-6 mb-4">
              {myFavourite.map((item) => {
                return (
                  <div className="border-b flex justify-between items-center">
                    <div class="py-4">
                      <div class="flex gap-4 items-center">
                        <img class="h-[130px] w-[110px] rounded" src={assets.p_img1} alt="Product image" />
                        <div className="flex flex-col gap-2">
                          <span class="text-md 2xl:text-[22px] font-normal">{item.name}</span>
                          <div className="flex items-center gap-8">
                            <p className="text-md">{item.price}</p>
                            <div className="flex justify-center items-center h-8 w-8 bg-gray-50 border-gray-300 border rounded">
                              L
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="py-4">
                      <input
                        type="number"
                        id="number-input"
                        aria-describedby="helper-text-explanation"
                        class="bg-white w-20 py-2 px-2.5 text-sm border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1"
                        value={item.quanlity}
                        required
                      />
                    </div>
                    <div onClick={() => onDeleteProduct(item.id)}>
                      <img class="h-5 cursor-pointer w-5 rounded" src={assets.bin_icon} alt="Product image" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div class="w-96">
            <div class="rounded-lg p-6">
              <div className="flex mb-6 gap-2 justify-start items-center">
                <h1 class="text-2xl font-semibold">
                  <span className="font-normal text-gray-700">Favourite</span> Totals
                </h1>
                <div className="w-12 rounded h-[2px] mt-1 bg-gray-500"></div>
              </div>
              <div class="flex justify-between border-b pb-4">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm">$19.99</span>
              </div>
              <div class="flex justify-between border-b py-4">
                <span className="text-sm">Fee</span>
                <span className="text-sm">$0</span>
              </div>

              <div class="flex justify-between my-4">
                <span class="font-semibold">Total</span>
                <span class="font-semibold">$19.99</span>
              </div>
              <button class="bg-black text-white py-2 px-4 rounded-lg mt-4 w-full">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
