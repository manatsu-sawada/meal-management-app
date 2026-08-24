import { Meal } from "@/types/meal";

// Props
type CaloriesProps = {
    meals: Meal[];
};

export function TotalCalories({ meals }: CaloriesProps) {
    // 日付取得
    const today = new Date().toDateString();

    const totalCalories = meals.filter((meal) => new Date(meal.eatenAt).toDateString() === today).reduce((total, meal) => total + meal.calories, 0);
    return (
    <div className="ml-auto text-right">
        <p className="text-sm text-gray-500">
            今日の合計カロリー
        </p>
        <p className="text-2xl font-bold">
            {totalCalories} kcal
        </p>
    </div>
);
}