import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import styles from "../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { selectCart, selectWishlist } from "../../redux/userSelector";
import axios from "axios";
import { server } from "../../server";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { wishlist } = useSelector(selectWishlist);
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${server}/product`)
        .then(function (response) {
            setProduct(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        const data = product && product.find((i) => i._id === id);
        setData(data);
    },[product]);

    useEffect(() => {
      if (wishlist && wishlist.find((i) => i._id === data?._id)) {
        setClick(true);
      } else {
        setClick(false);
      }
    }, [data, wishlist]);
  
    const incrementCount = () => {
      setCount(count + 1);
    };
  
    const decrementCount = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };
  
    const removeFromWishlistHandler = (data) => {
      setClick(!click);
      dispatch(removeFromWishlist(data));
    };
  
    const addToWishlistHandler = (data) => {
      setClick(!click);
      dispatch(addToWishlist(data));
    };
  
    const addToCartHandler = () => {
      const cartData = { ...data, qty: count };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    };
  
    return (
      <div className="bg-white">
        {data ? (
          <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={`${data.image}`}
                    alt=""
                    className="w-[80%]"
                  />
                </div>
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description.length > 1000 ? data.description.slice(0, 1000) + "...." : data.description}</p>
                  <div className="flex pt-3">
                    <h5 className={`${styles.pricebold}`}>
                    {data.price.toLocaleString("Id-ID", {style:"currency", currency:"IDR"})}
                    </h5>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <ProductDetailsInfo
              data={data}
            />
            <br />
            <br />
          </div>
        ) : null}
      </div>
    );
  };
  
  const ProductDetailsInfo = ({
    data
  }) => {
    const [active, setActive] = useState(1);
  
    return (
      <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
        <div className="w-full flex justify-center border-b pt-10 pb-2">
          <div className="relative">
            <h5
              className={
                "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              }
              onClick={() => setActive(1)}
            >
              Product Details
            </h5>
            {active === 1 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
        </div>
        {active === 1 ? (
          <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              {data.description}
            </p>
          </>
        ) : null}
      </div>
    );
  };
  
  export default ProductDetails;