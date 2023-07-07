import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { server } from "../../../server";
import axios from "axios";

const FeaturedProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${server}/product`)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
  
    return true;
  }

  useEffect(() => {
    const allProductsData = data ? [...data] : [];
    const sortedData = allProductsData?.sort()
    const firstFive = sortedData && sortedData.slice(0, 10);
    
    if (!arraysEqual(firstFive, data)) {
      setData(firstFive);
    }
  }, [data]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((item, index) => <ProductCard data={item} key={item._id} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
