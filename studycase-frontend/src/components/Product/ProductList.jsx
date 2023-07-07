import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import Tags from "../Route/Tags/Tags";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const tagData = searchParams.getAll("tag");
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    if (categoryData === null && tagData.length === 0) {
      setData(product);
    } else {
      const filteredData = product.filter((i) => {
        let isCategoryMatched = true;
        let isTagMatched = true;
  
        if (categoryData !== null && i.category.name !== categoryData) {
          isCategoryMatched = false;
        }
  
        if (tagData.length > 0) {
          const tagNames = i.tag.map((t) => t.name);
          isTagMatched = tagData.every((tag) => tagNames.includes(tag));
        }
  
        return isCategoryMatched && isTagMatched;
      });
  
      setData(filteredData);
    }
  }, [product, categoryData, tagData]);

  return (
    <>
      <div>
        <Header activeHeading={3} />
        <br />
        <Tags />
        <br />
        {data && data.length > 0 ? (
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.map((i) => (
                <ProductCard data={i} key={i._id} />
              ))}
            </div>
          </div>
        ) : (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        )}
        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
