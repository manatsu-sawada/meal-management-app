export type Meal = {
    id: number;
    name: string;
    calories: number;
    mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
    eatenAt: string;
    memo: string | null;
    createAt: string;
    updateAt: string;
};

export type Weight = {
    id: number;
    weight: string;
    measuredAt: string;
    memo: string | null;
    createAt: string;
    updateAt: string;
};

export type MealForm = {
    name: string;
    calories: string;
    mealType: string;
    eatenAt: string;
    memo: string;
};