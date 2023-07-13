import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/userSelector";
import { setAuth } from "../../redux/actions/userAction";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbAddressBook } from "react-icons/tb";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ButtonLogout({ action }) {
  return (
    <>
    <div className="single_item flex items-center cursor-pointer w-full mb-8" onClick={action}>
      <AiOutlineLogin
        size={20}
      />
      <span
        className={`pl-3 800px:block hidden`}
      >
        Log out
      </span>
    </div>
    </>
  );
}

const ProfileSideBar = ({ setActive, active }) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(setAuth(false));
    navigate("/");
    // window.location.reload(true);
    toast.success("Log out success!!");
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <TbAddressBook size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      {auth && (
          <ButtonLogout action={logOut} />
      )}
    </div>
  );
};

export default ProfileSideBar;
