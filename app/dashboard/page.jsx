"use server";
import { fetchProducts } from "../lib/actions";
import { Suspense } from "react";
import Products from "../components/Products";
import { auth } from "../auth";

export default async function Dashboard() {
  const products = await fetchProducts();
  const session = await auth();

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center">
      <Suspense fallback={<div>Loading... </div>}>
        <Products products={products.products} session={session} />
      </Suspense>
    </div>
  );
}
