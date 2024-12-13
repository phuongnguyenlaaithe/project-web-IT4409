import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { id } = useParams();
  const { products, currency, addToCart, addToFavourite, favouriteItems, deleteFavorite } =
    useContext(ShopContext);

  const [product, setProduct] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const fetchData = async () => {
    products.map((item) => {
      if (item._id === id) {
        setProduct(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  const checkFavorite = async () => {
    setIsFavourite(false);
    favouriteItems.map((item) => {
      if (item._id === id) {
        setIsFavourite(true);
      }
    });
  };

  const handleFavourite = async () => {
    if(isFavourite) {
      await deleteFavorite(product._id);
      setIsFavourite(false);
    } else {
      await addToFavourite(product._id);
      setIsFavourite(true);
    }
  }

  useEffect(() => {
    fetchData();
    checkFavorite();
    setSize("");
    window.scrollTo(0, 0);
  }, [id, products]);

  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* group image product */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt=""
                className="w-[24%] cursor-pointer sm:w-full sm:mb-3 flex-shrink-0"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* info product */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{product.name}</h1>
          <div className="flex gap-1 mt-4 items-center">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(86)</p>
          </div>
          <p className="font-medium text-3xl mt-5">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-[80%]">{product.description}</p>
          <div className="flex flex-col gap-3 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 hover:border-orange-400 ${
                    item === size ? "bg-orange-400" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <button
              onClick={() => {handleFavourite()}}
              className="border-black border px-6 py-1 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="26"
                width="30"
                fill={isFavourite ? `#FF204E` : `white`}
                stroke="black"
                strokeWidth="12"
              >
                {" "}
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
              </svg>
            </button>
          </div>
          <hr className="my-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 text-gray-500 text-sm ">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="py-3 px-4 border text-sm">Description</b>
          <p className="py-3 px-4 border text-sm">Reviews (66)</p>
        </div>

        <div className="flex flex-col gap-4 border p-5 text-sm text-gray-500 ">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
