import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCart, selectUser } from "../../redux/userSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles"
import { City, State } from "country-state-city";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

const Checkout = () => {
  const user = useSelector(selectUser);
  const {cart} = useSelector(selectCart);
  const [userInfo, setUserInfo] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [data, setData] = useState([]);
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [detail, setDetail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = async () => {
    const shippingAddress = {
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      detail
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      user,
      shippingAddress
    };

    // update local storage with the updated orders array
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  const handleSubmitAdd = async (e) => {
    console.log(user);
    e.preventDefault();
    axios
      .post(`/address/${user._id}`, {
        nama: user.name,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        detail,
        user: user._id,
      })
      .then(function (response) {
        console.log(response);
        window.location.reload(true);
        toast.success("success add new address!!");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Cann't proccess your progress!!");
      });
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.001;

  const totalPrice = (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            provinsi={provinsi}
            setProvinsi={setProvinsi}
            kabupaten={kabupaten}
            setKabupaten={setKabupaten}
            kecamatan={kecamatan}
            setKecamatan={setKecamatan}
            kelurahan={kelurahan}
            setKelurahan={setKelurahan}
            detail={detail}
            setDetail={setDetail}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            data={data}
            setData={setData}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            handleSubmitAdd={handleSubmitAdd}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({ 
  user,
  provinsi,
  setProvinsi,
  kabupaten,
  setKabupaten,
  kecamatan,
  setKecamatan,
  kelurahan,
  setKelurahan,
  detail,
  setDetail,
  userInfo,
  setUserInfo,
  data,
  setData,
  openAdd,
  setOpenAdd,
  handleSubmitAdd
}) => {

  useEffect(() => {
    console.log(user);
    axios
      .get(`/address/user/${user._id}`)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className={`${styles.input} !w-[95%] bg-[rgb(197,191,255)]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className={`${styles.input} !w-[95%] bg-[rgb(197,191,255)]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Provincy</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your provincy
              </option>
              {State &&
                State.getStatesOfCountry("ID").map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={kabupaten}
              onChange={(e) => setKabupaten(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {City &&
                City.getCitiesOfCountry("ID").map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Kecamatan</label>
            <input
              type="address"
              required
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Kelurahan</label>
            <input
              type="address"
              value={kelurahan}
              onChange={(e) => setKelurahan(e.target.value)}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[97%]">
            <label className="block pb-2">Details</label>
            <input
              type="address"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <div className="w-full flex justify-between">
        <h5
          className="text-[18px] font-bold cursor-pointer text-[#3473c7dd] inline-block"
          onClick={() => setUserInfo(!userInfo)}
        >
          Choose from saved address
        </h5>
          <div
            className=" w-[100px] bg-[#acc6ecf8] h-[40px] mr-4 mt-2 flex items-center justify-center cursor-pointer !rounded-md"
            onClick={() => setOpenAdd(true)}
          >
            <span className="text-black">Add New</span>
          </div>
      </div>
      {userInfo && (
        <div>
          {data &&
            data.map((item, index) => (
              <div key={index} className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.kabupaten}
                  onClick={() =>
                    setProvinsi(item.provinsi) ||
                    setKabupaten(item.kabupaten) ||
                    setKecamatan(item.kecamatan) ||
                    setKelurahan(item.kelurahan) ||
                    setDetail(item.detail)
                  }
                />
                <h2>{item.kabupaten}</h2>
              </div>
            ))}
        </div>
      )}
      {openAdd && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenAdd(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form className="w-full" onSubmit={handleSubmitAdd}>
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your Provincy</label>
                    <select
                      name=""
                      id=""
                      value={provinsi}
                      onChange={(e) => setProvinsi(e.target.value)}
                      className={`${styles.input}`}
                    >
                      <option value="" className="block border pb-2">
                        choose your provincy
                      </option>
                      {State &&
                        State.getStatesOfCountry("ID").map((item, index) => (
                          <option
                            key={index}
                            className="block pb-2"
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={kabupaten}
                      onChange={(e) => setKabupaten(e.target.value)}
                      className={`${styles.input}`}
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {City &&
                        City.getCitiesOfCountry("ID").map((item, index) => (
                          <option
                            key={index}
                            className={"block pb-2"}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Kecamatan</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={kecamatan}
                      onChange={(e) => setKecamatan(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Kelurahan</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={kelurahan}
                      onChange={(e) => setKelurahan(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Details</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                    />
                  </div>
                  <div className=" w-full flex items-center justify-center pb-2">
                    <input
                      className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                      required
                      value="Submit"
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  const CartData = ({
    totalPrice,
    shipping,
    subTotalPrice,
  }) => {
    return (
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600]">
            {subTotalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
          </h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(shipping.toFixed(2))}
          </h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">total:</h3>
          <h5 className="text-[18px] font-[600]">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}
          </h5>
        </div>
        <br />
      </div>
    );
  };

export default Checkout;
