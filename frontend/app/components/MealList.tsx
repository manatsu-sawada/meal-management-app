type Meal = {
    id: number;
    name: string;
    calories: number;
    mealType: string;
    eatenAt: string;
    memo?: string;
};

const meals: Meal[] = [
    {
        id: 1,
        name: "鶏胸肉とご飯",
        calories: 450,
        mealType: "LUNCH",
        eatenAt: "2026-08-10T12:00",
        memo: "昼食",
    },
    {
        id: 2,
        name: "ヨーグルト",
        calories: 120,
        mealType: "SNACK",
        eatenAt: "2026-08-10T15:00",
    },
];

export default function MealList() {
    return (
        <div className="space-y-3">
            {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between rounded-lg border bg-white p-4">
                    <div>
                        <p className="text-xs text-gray-500">
                            {meal.mealType}・{meal.eatenAt}
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
                </div>
            ))}
        </div>
    );
}