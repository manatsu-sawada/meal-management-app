"use client";

import { useState } from "react";
import { EditMealModal } from "./EditMealModal";
import type { Meal } from "@/types/meal";
import { deleteMeal } from "@/lib/mealApi";

type MealListProps = {
    meals: Meal[];
    onDeleted: (id: number) => void;
};

export default function MealList({ meals, onDeleted }: MealListProps) {
    // Update (OPEN THE EDIT MODAL)
    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

    // Delete (deleteMeal() + refresh)
    async function handleDeleted(id: number) {
        await deleteMeal(id);
        onDeleted(id);
    }
    
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
                        <button type="button" onClick={() => handleDeleted(meal.id)} className="bg-white hover:bg-red-300 text-red-800 font-semibold py-2 px-4 border border-red-800 rounded shadow">
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