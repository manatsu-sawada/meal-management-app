"use client";

import { MealForm } from "@/types/meal";
import MealForm from "../app/components/MealForm";

const API_URL = 
  process.env.NEXT_PUBLIC_API_URL ?? "http:localhost:8787";

const initialForm: MealForm = {
  name: "",
  calories: "",
  mealType: "朝食",
  eatenAt: "",
  memo: "",
};

export default function Home(){
  return (
    <main>
      <h1>食事管理アプリ</h1>
      <MealForm />
    </main>
  );
}
