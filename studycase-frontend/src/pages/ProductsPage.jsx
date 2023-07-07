import React from 'react'
import Product from "../components/Product/ProductList.jsx";
import { useSelector } from 'react-redux';
import { selectLoading } from '../redux/userSelector.js';
import Loader from '../components/Layout/Loader.jsx';

const ProductsPage = () => {
  const loading = useSelector(selectLoading);
  
  return (
    <>
    { loading ? (
    <Loader />
    ):( 
      <div>
        <Product />
      </div>
    )}
    </>
  )
}

export default ProductsPage
