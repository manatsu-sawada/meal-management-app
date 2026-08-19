"use client";

import { useEffect, useState } from "react";
// import {} from "react"; React から呼ばないとダメな機能
import {MealFormModal} from "./components/MealForm";
import MealList from "./components/MealList";
import { Meal } from "@/types/meal";
import { getMeal } from "@/lib/mealApi";

const API_URL = 
  process.env.NEXT_PUBLIC_API_URL ?? "http:localhost:8787";

export default function Home(){
  //親コンポネントにStateを持たせる
  const [meals, setMeals] = useState<Meal[]>([]);

  // Read
  useEffect(() => {
    async function fetchMeals() {
      try {
        const data = await getMeal();
        setMeals(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMeals();
  }, []);

  // Create
  function handleCreated(newMeal: Meal) {
    setMeals((prev) => [newMeal, ...prev]);
  }

  // Delete
  function handleDeleted(id: number) {
    setMeals((prev) =>
    prev.filter((item) => item.id !== id)
  )};

  return(
  <main className="min-h-screen bg-gray-100 p-8">
    <h1 className="mb-6 text-5xl font-bold text-gray-900">
      食事管理アプリ
    </h1>

    <MealFormModal onCreated={handleCreated} />
    <MealList meals={meals} onDeleted={handleDeleted} />

  </main>
  );
}