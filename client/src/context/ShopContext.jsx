import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    if (!token) {
      toast.error('please sign in to use this feature!');
      navigate('/login');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
        toast.success('🛒 add to cart success');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) { 
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.put(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error)
         }
      }
    }
    return totalAmount;
  };

  const addToFavourite = async (itemId) => {
    if (!token) {
      toast.error('please sign in to use this feature!');
      navigate('/login');
      return;
    }

    if (token) {
      try {
        const responsive = await axios.post(
          backendUrl + '/api/favourite/add',
          { productId: itemId },
          { headers: { token } }
        );
        if (responsive.data?.success) {
          setFavouriteItems([responsive.data.favouriteProduct, ...favouriteItems]);
          toast('💖 add to favorites success');
          getFavouriteCart();
        } else {
          toast.error(responsive.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getFavouriteCount = () => {
    return favouriteItems.length
    // let totalCount = 0;
    // for (const items in favouriteItems) {
    //   for (const item in favouriteItems[items]) {
    //     try {
    //       if (favouriteItems[items][item] > 0) {
    //         totalCount += favouriteItems[items][item];
    //       }
    //     } catch (error) { }
    //   }
    // }
    // return totalCount;
  };

  const updateQuantityFavorite = async (itemId, size, quantity) => {
    let cartData = structuredClone(favouriteItems);
    console.log(cartData)
    cartData[itemId][size] = quantity;

    setFavouriteItems(cartData);

    if (token) {
      try {
        await axios.put(backendUrl + '/api/favourite/update', { productId: itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const deleteFavorite = async (itemId) => {
    if (token) {
      try {
        await axios.delete(backendUrl + `/api/favourite/delete?productId=${itemId}`, { headers: { token } });
        setFavouriteItems(favouriteItems.filter(f => f._id !== itemId));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getFavouriteAmount = () => {
    let totalAmount = 0;
    favouriteItems.forEach((fItem) => {
      // Kiểm tra từng phần tử trước khi cộng price
      if (fItem && typeof fItem.price !== 'undefined') {
        totalAmount += fItem.price; // Cộng giá trị price
      }
    });
    return totalAmount;
  };
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.get(backendUrl + '/api/cart/get', { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getSingleProduct = async (productId) => {
    try {
      const response = await axios.get(backendUrl + `/api/product/single?productId=${productId}`);
      if (response.data.success) {
        return response.data.product;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getFavouriteCart = async (token) => {
    try {
      const response = await axios.get(backendUrl + '/api/favourite/get', { headers: { token } });
      if (response.data.success) {
        const validFavourites = await Promise.all(
          response.data.favoriteProducts.map(async (fd) => {
            const product = await getSingleProduct(fd);
            // Loại bỏ sản phẩm không hợp lệ
            return product && typeof product.price !== 'undefined' ? product : null;
          })
        );
        setFavouriteItems(validFavourites.filter((f) => f).reverse()); // Chỉ giữ sản phẩm hợp lệ
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getOrderUser = async (token) => {
    try {
      const response = await axios.get(backendUrl + `/api/order/userorders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          token: token
        }
      });
      if (response.data.success) {
        return response.data.orders;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  // console.log(favouriteItems);
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
      getFavouriteCart(localStorage.getItem('token'));
      setUserId(localStorage.getItem('userId'));

    }
    if (token) {
      getUserCart(token);
      getFavouriteCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    getFavouriteAmount,
    updateQuantityFavorite,
    addToFavourite,
    getFavouriteCount,
    favouriteItems,
    setFavouriteItems,
    getOrderUser,
    deleteFavorite,
    userId,
    setUserId
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
