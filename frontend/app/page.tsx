"use client";

import MealFormModal from "./components/MealForm";

const API_URL = 
  process.env.NEXT_PUBLIC_API_URL ?? "http:localhost:8787";

export default function Home(){
  return(
  <main className="min-h-screen bg-gray-100 p-8">
    <h1 className="mb-6 text-3x1 font-bold text-gray-900">
      食事管理アプリ
    </h1>

    <MealFormModal />
  </main>
  );
}