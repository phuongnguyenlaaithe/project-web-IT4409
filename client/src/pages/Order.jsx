import { useContext } from "react"
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Order = () => {

  const {products, currency} = useContext(ShopContext);

  return (
    <div className="border-t-2 pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          products.slice(0,4).map((item, index) => (
            <div className="border-t border-b py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-6 text-sm">
                  <img src={item.image[0]} alt=""  className="w-16 sm:w-20"/>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium sm:text-base">{item.name}</p>
                    <div className="flex items-center gap-2 text-base text-gray-700">
                      <p>{currency}{item.price}</p>
                      <p>Quantity: 1</p>
                      <p>Size: L</p>
                    </div>
                    <p>Date: <span className="text-gray-400">Tue Oct 29 2024</span></p>
                    <p>Payment: <span className="text-gray-400">COD</span></p>
                  </div>
                </div>

                <div className="flex justify-between md:w-1/2">
                  <div className="flex items-center gap-2">
                    <p className="w-2 h-2 rounded-full bg-green-500"></p>
                    <p>Order Placed</p>
                  </div>

                  <button className="border py-2 px-3 text-sm rounded-sm font-medium">Track Order</button>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
