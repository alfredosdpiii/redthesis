"use server";

import { getUserTransactions } from "../../lib/actions";
import { Suspense } from "react";
import { auth } from "../../auth";
import TransactionsList from "../../components/TransactionsList";

export default async function Transactions() {
  const session = await auth();
  const { transactions } = await getUserTransactions(session.user.id);

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center text-black">
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionsList transactions={transactions} />
      </Suspense>
    </div>
  );
}
