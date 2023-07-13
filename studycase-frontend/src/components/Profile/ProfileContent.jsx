import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setAuth } from "../../redux/actions/userAction";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/userSelector";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { MdUpdate } from "react-icons/md";
import { City, State } from "country-state-city";
import { RxCross1 } from "react-icons/rx";

const ProfileContent = ({ active }) => {
  const user = useSelector(selectUser);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .patch(`/user/${user._id}`, {
        name,
        username,
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
        toast.success("your update is success, please sign in again!!");
        dispatch(setAuth(false));
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Cann't proccess your update!!");
      });
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative mr-11 pr-9">
              <FaUserCircle size={100} />
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Username</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[70%]">
                  <label className="block pb-2">Password</label>
                  <div className="mt-1 relative">
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    />
                    {visible ? (
                      <AiOutlineEyeInvisible
                        className="absolute right-11 top-1 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEye
                        className="absolute right-11 top-1 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
                <input
                  className={`w-[250px] 800px:mb-0 h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/*  user Address */}
      {active === 3 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/invoice/user/${user._id}`)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [user._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Paid"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/invoice/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.order.cart.length + " items",
        total: item.total,
        status: item.payment_status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={20}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const Address = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState([]);
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [detail, setDetail] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    axios
      .post(`/address/${user._id}`, {
        nama: user.name,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        detail,
        user: user._id
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

  const handleSubmitUpdate = async (id) => {
    axios
      .patch(`/address/${id}/user/${user._id}`, {
        nama: user.name,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        detail,
        user: user._id
      })
      .then(function (response) {
        console.log(response);
        window.location.reload(true);
        toast.success("success update your address!!");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Cann't proccess your progress!!");
      });
  };

  useEffect(() => {
    axios
      .get(`/address/user/${user._id}`)
      .then(function (response) {
        dispatch(setAddress(response.data.data));
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dispatch, user._id]);

  const removeAddress = async (id) => {
    try {
      axios.delete(`/address/${id}/user/${user._id}`);
      window.location.reload(true);
      toast.success("Delete address success!!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-5">
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
      {openUpdate && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenUpdate(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Update Address
            </h1>
            <div className="w-full">
              <form className="w-full" onSubmit={() => handleSubmitUpdate(selectedId)}>
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
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpenAdd(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {data &&
        data.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{index + 1}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="font-[600] 800px:text-[unset]">
                {item.detail.length > 35
                  ? item.detail.slice(0, 35) + "..."
                  : item.detail}
              </h6>
            </div>
            <div className="flex justify-center">
              <h6 className="font-[600] 800px:text-[unset]">{item.provinsi}</h6>
            </div>
            <div className="min-w-[20%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => removeAddress(item._id)}
              />
              <div onClick={() => setOpenUpdate(true)}>
                <MdUpdate
                  size={25}
                  className="cursor-pointer"
                  onClick={() => 
                    setSelectedId(item._id) ||
                    setProvinsi(item.provinsi) ||
                    setKabupaten(item.kabupaten) ||
                    setKecamatan(item.kecamatan) ||
                    setKelurahan(item.kelurahan) ||
                    setDetail(item.detail)
                  }
                />
              </div>
            </div>
          </div>
        ))}

      {data && data.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
