import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { server } from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DropDown = ({ selectCategory }) => {
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server}/category`)
      .then(function (response) {
        setCategory(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  selectCategory = (item) => {
    navigate(`/product?category=${item.name}`);
  };

  return (
    <div className="pb-4 w-[270px] bg-[white] absolute z-30 rounded-b-md shadow-sm">
      {categories &&
        categories.map((item, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => selectCategory(item)}
          >
              <h3
                className="m-3 flex  cursor-pointer select-none">
                {item.name}
              </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
