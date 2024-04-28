"use client";

import { useEffect, useState } from "react";
import { createTransaction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function Products({ products, session }) {
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productsWithQuantity, setProductsWithQuantity] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log(JSON.stringify(products));
    if (products.length > 0) {
      setSelectedCategory(products[0].cat);
    }
  }, [products]);

  useEffect(() => {
    const updatedProductsWithQuantity = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId]) => products.find((p) => p._id === productId));
    setProductsWithQuantity(updatedProductsWithQuantity);
  }, [quantities, products]);

  useEffect(() => {
    setQuantities({});
    setProductsWithQuantity([]);
  }, [selectedCategory]);

  useEffect(() => {
    console.log(quantities);
  }, [quantities]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (!Array.isArray(products)) {
    return <div>No products available.</div>;
  }

  const categories = products.reduce((acc, product) => {
    if (!acc.includes(product.cat)) {
      acc.push(product.cat);
    }
    return acc;
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.cat === selectedCategory)
    : products;

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 0;
      const product = products.find((p) => p._id === productId);
      const newQuantity = Math.min(
        Math.max(currentQuantity + change, 0),
        product.quantity,
      );
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const handleSubmit = async () => {
    const submitDetails = createTransaction([quantities], session.user.id);
    if (submitDetails) {
      console.log("AAAA");
      router.push("/dashboard/transactions");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 font-bold">
          Filter by Category:
        </label>
        <select
          id="category"
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl text-black"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category + " Lab"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between text-black"
          >
            <p>{product.apparatus}</p>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded-3xl"
                onClick={() => handleQuantityChange(product._id, 1)}
                disabled={quantities[product._id] === product.quantity}
              >
                +
              </button>
              <span>{quantities[product._id] || 0}</span>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-3xl"
                onClick={() => handleQuantityChange(product._id, -1)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="py-8 flex justify-center">
        <button
          className="py-4 px-8 bg-green-500 border border-solid rounded-3xl text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
