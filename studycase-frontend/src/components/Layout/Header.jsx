import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import logo from "../../Assests/image/yandex.png";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaUserCircle, FaUserSlash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import DropDown from "./DropDown.jsx";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import Navbar from "./Navbar.jsx";
import { selectAuth, selectCart, selectWishlist } from "../../redux/userSelector";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [product, setProduct] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const {wishlist} = useSelector(selectWishlist);
  const [open, setOpen] = useState(false);
  const [openSeacrh, setOpenSeacrh] = useState(false);
  const {cart} = useSelector(selectCart);
  const auth = useSelector(selectAuth);

  useEffect(() => {
    axios
      .get(`${server}/product`)
      .then(function (response) {
        setProduct(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      product &&
      product.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const selectCategory = (categoryId) => {
    console.log(categoryId);
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img src={logo} width={40} height={40} alt="logo" />
            </Link>
          </div>
          {!auth ? (
          <div className="w-[45%] relative ml-12 pl-5">
            <input
              type="search"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              onClick={() => setOpenSeacrh(true)}
              className="h-[40px] w-full px-2 border-[hsl(36,84%,51%)] border-[2px] rounded-md"
            />
            {openSeacrh && openSeacrh.length !== 0 ? (
              <div className="fixed overflow-y-scroll h-[50%] w-[39%] bg-slate-50 shadow-sm-2 z-[9] p-4">
                <div className="flex justify-end">
                  <RxCross1
                    size={15}
                    className="ml-3 mb-2 cursor-pointer"
                    onClick={() => setOpenSeacrh(false)}
                  />
                </div>
                {searchData &&
                  searchData.map((i) => {
                    return (
                      <div key={i._id}>
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.image}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name.length > 50 ? i.name.slice(0, 50) + "..." : i.name}</h1>
                        </div>
                      </Link>
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>
          ): (
            <div className="w-[74%] flex justify-start">
            <input
              type="search"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              onClick={() => setOpenSeacrh(true)}
              className="h-[40px] w-[60%] px-2 border-[hsl(36,84%,51%)] border-[2px] rounded-md"
            />
            {openSeacrh && openSeacrh.length !== 0 ? (
              <div className="fixed overflow-y-scroll h-[50%] w-[39%] bg-slate-50 shadow-sm-2 z-[9] p-4">
                <div className="flex justify-end">
                  <RxCross1
                    size={15}
                    className="ml-3 mb-2 cursor-pointer"
                    onClick={() => setOpenSeacrh(false)}
                  />
                </div>
                {searchData &&
                  searchData.map((i) => {
                    return (
                      <div key={i._id}>
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.image}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name.length > 50 ? i.name.slice(0, 50) + "..." : i.name}</h1>
                        </div>
                      </Link>
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>
          )}
          {!auth ? (
            <div className={`${styles.button}`}>
            <Link to="/sign-up">
              <h1 className="text-[#fff] flex items-center">
                {"Sign Up"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
          ): null}
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[hsl(27,96%,53%)] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? <DropDown selectCategory={selectCategory} /> : null}
            </div>
          </div>

          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[25px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[25px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer">
                {auth ? (
                  <Link to="/profile">
                    <FaUserCircle size={29} color="rgb(255 255 255 / 83%)" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <FaUserSlash size={29} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}

      <div className={` ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px] bg-[hsl(27,96%,53%)] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-3 mt-1 cursor-pointer"
              color="rgb(255 255 255 / 83%)"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={logo}
                width={40}
                height={40}
                alt="logo"
                className="mt-3 cursor-pointer"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>

          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}

        </div>

        {/* header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-3 ml-3 cursor-pointer" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-3 mt-3 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={() => setOpenSeacrh(true)}
                  className="h-[40px] w-full px-2 border-[hsl(36,84%,51%)] border-[2px] rounded-md"
                />
                {openSeacrh && openSeacrh.length !== 0 ? (
                  <div className="absolute w-[90%] min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    <div className="flex justify-end">
                      <RxCross1
                        size={15}
                        className="ml-3 mb-2 cursor-pointer"
                        onClick={() => setOpenSeacrh(false)}
                      />
                    </div>
                    {searchData &&
                      searchData.map((i, index) => {
                        return (
                          <Link to={`/product/${i._id}`}>
                            <div className="w-full flex items-start-py-3">
                              <img
                                src={`${i.image}`}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name.length > 30 ? i.name.slice(0, 30) + "..." : i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              { auth && (
              <div className="w-full flex justify-center mb-2">
                <Link to="/profile">
                  <FaUserCircle size={40} />
                </Link>
              </div>
              )}
              <Navbar active={activeHeading} />
              { !auth && (
              <div className=" w-full h-[33%] flex items-end justify-center">
                <Link to="/login" className="text-[18px] font-bold">
                  Login
                </Link>
              </div>
              )}
              { !auth ? (
              <div className=" w-full h-[33%] flex items-end">
                <div className={`${styles.button} w-[38%] h-[18%] ml-4`}>
                  <Link to="/sign-up">
                    <h1 className="text-[#fff] flex items-center">
                      {"Sign Up"}
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
              </div>
              ) : null }
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
