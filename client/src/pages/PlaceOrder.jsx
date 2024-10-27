import { assets } from '../assets/assets';

const PlaceOrder = () => {
  return (
    <div className="h-screen py-8 border-t mb-96">
      <div className="container">
        <div className="flex gap-2 justify-start items-center">
          <h1 className="text-2xl font-semibold">
            <span className="font-normal text-gray-700">Delivery</span> Information
          </h1>
          <div className="w-12 rounded h-[3px] mt-2 bg-gray-500"></div>
        </div>
        {/* <div className="flex flex-col md:flex-row gap-4 border-t mt-8">
          <div className="w-full">
            <div className="bg-white rounded-lgp-6 mb-4">
              <div className="border-b flex justify-between items-center">
                <div className="py-4">
                  <div className="flex gap-4 items-center">
                    <img className="h-[130px] w-[110px] rounded" src={assets.p_img1} alt="Product image" />
                    <div className="flex flex-col gap-2">
                      <span className="text-md 2xl:text-[22px] font-normal">Men Round Neck Pure Cotton T-shirt</span>
                      <div className="flex items-center gap-8">
                        <p className="text-md">149$</p>
                        <div className="flex justify-center items-center h-8 w-8 bg-gray-50 border-gray-300 border rounded">
                          L
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-4">
                  <input
                    type="number"
                    id="number-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-white w-20 py-2 px-2.5 text-sm border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1"
                    value={1}
                    required
                  />
                </div>

                <div>
                  <img className="h-5 cursor-pointer w-5 rounded" src={assets.bin_icon} alt="Product image" />
                </div>
              </div>

              <div className="border-b flex justify-between items-center">
                <div className="py-4">
                  <div className="flex gap-4 items-center">
                    <img className="h-[130px] w-[110px] rounded" src={assets.p_img1} alt="Product image" />
                    <div className="flex flex-col gap-2">
                      <span className="text-md 2xl:text-[22px] font-normal">Men Round Neck Pure Cotton T-shirt</span>
                      <div className="flex items-center gap-8">
                        <p className="text-md">149$</p>
                        <div className="flex justify-center items-center h-8 w-8 bg-gray-50 border-gray-300 border rounded">
                          L
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-4">
                  <input
                    type="number"
                    id="number-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-white w-20 py-2 px-2.5 text-sm border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1"
                    value={1}
                    required
                  />
                </div>

                <div>
                  <img className="h-5 cursor-pointer w-5 rounded" src={assets.bin_icon} alt="Product image" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row items-start justify-start mt-10">
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form>
              <div className="flex gap-4 mb-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="First Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Last Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Email Address"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Street"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
              </div>

              <div className="flex gap-4 mb-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="City"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="State"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
              </div>

              <div className="flex gap-4 mb-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Zip Code"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Country"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Phone"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-sm font-normal text-[#6B7280] outline-none focus:border-[#6A64F1]"
                />
              </div>
            </form>
          </div>
          <div className="w-full flex justify-end">
            <div className="w-full md:w-96">
              <div className="rounded-lg p-6">
                <div className="flex mb-6 gap-2 justify-start items-center">
                  <h1 className="text-2xl font-semibold">
                    <span className="font-normal text-gray-700">Cart</span> Totals
                  </h1>
                  <div className="w-12 rounded h-[2px] mt-1 bg-gray-500"></div>
                </div>
                <div className="flex justify-between border-b pb-4">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">$19.99</span>
                </div>
                <div className="flex justify-between border-b py-4">
                  <span className="text-sm">Shipping fee</span>
                  <span className="text-sm">$19.99</span>
                </div>

                <div className="flex justify-between my-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">$21.98</span>
                </div>

                <div className="mt-10">
                  <div className="flex mb-6 gap-2 justify-start items-center">
                    <div className="text-lg font-semibold uppercase">
                      <span className="font-normal text-gray-700">Payment</span> Method
                    </div>
                    <div className="w-12 rounded h-[2px] mt-1 bg-gray-500"></div>
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded cursor-pointer hover:opacity-75 border w-full h-10 flex items-center p-2">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex flex-1 justify-center items-center">
                        <img class="scale-50 object-cover" src={assets.stripe_logo} alt="Product image" />
                      </div>
                    </div>
                    <div className="rounded cursor-pointer hover:opacity-75 border w-full h-10 flex items-center p-2">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex flex-1 justify-center items-center">
                        <img class="scale-75 object-cover" src={assets.razorpay_logo} alt="Product image" />
                      </div>
                    </div>
                    <div className="rounded cursor-pointer hover:opacity-75 border w-full h-10 flex items-center pl-2">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex flex-1 ml-2 justify-center items-center">
                        <p className='text-[8px] text-gray-400 w-full'>CASH ON DELIVERY</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-black text-white max-w-40 text-md py-2 px-4 rounded-lg mt-4 w-full">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
