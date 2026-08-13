"use client";

import { useState } from "react";
import { EditMealModal } from "./EditMealModal";
import type { Meal } from "@/types/meal";

// example data 
const meals: Meal[] = [
    {
        id: 1,
        name: "鶏胸肉とご飯",
        calories: 450,
        mealType: "LUNCH",
        eatenAt: "2026-08-10T12:00",
        memo: "健康的でいいね。",
        createdAt: "2026-08-10T12:00",
        updatedAt: "2026-08-10T12:00",
    },
    {
        id: 2,
        name: "ヨーグルト",
        calories: 120,
        mealType: "SNACK",
        eatenAt: "2026-08-10T15:00",
        memo: "",
        createdAt: "2026-08-10T12:00",
        updatedAt: "2026-08-10T12:00",
    },
];


export default function MealList() {
    // when pushing Edit Button - setEditingMeal(meal) can change default value(null) to meal
    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

    return (
        <div className="space-y-3">
            {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between rounded-lg border bg-white p-4">
                    <div>
                        <p className="text-xs text-gray-500">
                            {meal.mealType}・{new Date(meal.eatenAt).toLocaleString("ja-JP")}
                        </p>
                        <p className="font-medium">{meal.name}</p>
                        {meal.memo && (
                            <p className="text-sm text-gray-400">
                                {meal.memo}
                            </p>
                        )}
                    </div>

                    <p className="font-semibold">
                        {meal.calories} kcal
                    </p>

                    <div className="mt-3 flex gap-2">
                        {/* UPDATE */}
                        <button type="button" onClick={() => setEditingMeal(meal)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            編集
                        </button>

                        {/* DELETE */}
                        <button type="button" className="bg-white hover:bg-red-300 text-red-800 font-semibold py-2 px-4 border border-red-800 rounded shadow">
                            削除
                        </button>
                    </div>
                </div>
            ))}

            {editingMeal && (
                <EditMealModal
                    meal={editingMeal}
                    onClose={() => setEditingMeal(null)}
                />
            )}
        </div>
    );
}