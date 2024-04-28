"use client";

import { useEffect, useState } from "react";
import { fetchSpecificProduct } from "@/app/lib/actions";

export default function TransactionsList({ transactions }) {
  const [productNames, setProductNames] = useState({});

  useEffect(() => {
    console.log(transactions);
    fetchProductNames(transactions);
  }, [transactions]);

  const fetchProductNames = async (transactions) => {
    const names = {};
    for (const transaction of transactions) {
      for (const product of transaction.products) {
        for (const [key, value] of Object.entries(product)) {
          if (!names[key]) {
            try {
              const productData = await fetchSpecificProduct(key);
              names[key] = productData.product[0].apparatus;
            } catch (error) {
              console.error(
                `Error fetching product details for ID: ${key}`,
                error,
              );
              names[key] = "Unknown";
            }
          }
        }
      }
    }
    setProductNames(names);
  };

  useEffect(() => {
    console.log(productNames);
  }, [productNames]);

  // Check if transactions is an array
  if (!Array.isArray(transactions)) {
    return <div>No transactions found.</div>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => {
        return (
          <div
            key={transaction._id}
            className="bg-white p-6 rounded-3xl shadow-md"
          >
            <p className="text-lg font-semibold">{transaction._id}</p>
            <p className="text-3xl text-blue-500">
              Approved? {transaction.approved.toString()}
            </p>
            {transaction.products &&
              transaction.products.map((product) => {
                return Object.entries(product).map(([key, value]) => {
                  return (
                    <div key={key} className="mt-4 p-4 bg-gray-100 rounded-3xl">
                      <p className="text-sm font-medium">Product ID: {key}</p>
                      <p className="text-sm">
                        Product Name: {productNames[key] || "Loading..."}
                      </p>
                      <p className="text-sm">Quantity: {value}</p>
                    </div>
                  );
                });
              })}
          </div>
        );
      })}
    </div>
  );
}
