import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { id } = useParams();
  const { products, currency } = useContext(ShopContext);

  const [product, setProduct] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchData = async () => {
    products.map((item) => {
      if(item._id === id) {
        setProduct(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchData();
  },[id]);


  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      <div className="flex gap-12 flex-col sm:flex-row">
          {/* group image product */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              product.image.map((item , index) =>(
                <img onClick={() => setImage(item)} key={index} src={item} alt="" className="w-[24%] cursor-pointer sm:w-full sm:mb-3 flex-shrink-0" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

          {/* info product */}
        <div className="flex-1">
            <h1 className="font-medium text-2xl">{product.name}</h1>
            <div className="flex gap-1 mt-4 items-center">
              <img src={assets.star_icon} alt="" className="w-3"/>
              <img src={assets.star_icon} alt="" className="w-3"/>
              <img src={assets.star_icon} alt="" className="w-3"/>
              <img src={assets.star_icon} alt="" className="w-3"/>
              <img src={assets.star_dull_icon} alt="" className="w-3"/>
              <p className="pl-2">(86)</p>
            </div>
            <p className="font-medium text-3xl mt-5">{currency}{product.price}</p>
            <p className="mt-5 text-gray-500 md:w-[80%]">{product.description}</p>
            <div className="flex flex-col gap-3 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {
                  product.sizes.map((item, index) => (
                    <button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'bg-orange-400' : '' }`}>{item}</button>
                  ))
                }
              </div>
            </div>
            <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
            <hr className="my-8 sm:w-4/5"/>
            <div className="flex flex-col gap-1 text-gray-500 text-sm ">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
        </div>
      </div>

      
    </div>
  ) : <div className="opacity-0"></div>
};

export default Product;
