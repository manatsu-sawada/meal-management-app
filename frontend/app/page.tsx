"use client";

import { useEffect, useState } from "react";
// import {} from "react"; React から呼ばないとダメな機能
import { MealFormModal } from "./components/MealForm";
import MealList from "./components/MealList";
import { AuthStatus } from "./components/AuthStatus";
import { Meal } from "@/types/meal";
import { getMeal } from "@/lib/mealApi";
import { TotalCalories } from "./components/TotalCalories";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http:localhost:8787";

export default function Home() {
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

  // Update
  function handleUpdated(updateMeal: Meal) {
    setMeals((prev) => prev.map((meal) =>
      meal.id === updateMeal.id ? updateMeal : meal));
  }

  // Delete
  function handleDeleted(id: number) {
    setMeals((prev) =>
      prev.filter((item) => item.id !== id)
    )
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
              Meal Log
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              食事管理
            </h1>
          </div>

          <AuthStatus />
        </header>

        <div className="mb-4 flex items-center justify-between gap-4">
          <MealFormModal onCreated={handleCreated} />
          <TotalCalories meals={meals} />
        </div>

        <MealList
          meals={meals}
          onDeleted={handleDeleted}
          onUpdated={handleUpdated}
        />
      </div>
    </main>
  );
}