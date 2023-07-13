import React, { useEffect, useState } from 'react'
import { selectUser } from '../../redux/userSelector';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

const Invoice = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState([]);
    const user = useSelector(selectUser)
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
          .get(`/invoice/user/${user._id}`)
          .then(function (response) {
            setInvoice(response.data.data);
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [user._id]);

    useEffect(() => {
        const data = invoice && invoice.find((i) => i._id === id);
        setData(data);
    },[invoice]);
    
      return (
        <div className="container mx-auto px-4">
          <div className="max-w-screen-md mx-auto mt-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="w-full flex justify-end p-3">
              </div>
              <div className="px-6 py-4">
                {data ? (
                <>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Invoice #{data._id}</h3>
                  <span className={`px-4 py-2 rounded-full ${data.payment_status === 'Paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'}`}>
                    {data.payment_status}
                  </span>
                </div>
                <div className="mt-4">
                  <div>
                    <h4 className="text-gray-600 font-semibold">Delivery Address:</h4>
                    <p className="mt-2">{data.delivery_address.detail}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-gray-600 font-semibold">Sub Total:</h4>
                    <p className="mt-2">{data.sub_total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-gray-600 font-semibold">Total:</h4>
                    <p className="mt-2">{data.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-gray-600 font-semibold">Payment Info:</h4>
                    <p className="mt-2">{data.paymentInfo.type}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-gray-600 font-semibold">User:</h4>
                    <p className="mt-2">{data.user.name}</p>
                  </div>
                </div>
                </>
                ): null}
              </div>
            </div>
          </div>
        </div>
      );
}

export default Invoice
