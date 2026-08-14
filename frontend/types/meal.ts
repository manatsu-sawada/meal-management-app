// From DB
export type Meal = {
    id: number;
    name: string;
    calories: number;
    mealType: MealType;
    eatenAt: string;
    memo: string | null;
    createdAt: string;
    updatedAt: string;
};

export type MealType = 
    "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

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
    mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
    eatenAt: string;
    memo: string;
};

// sending from POST
export type CreateMealInput = {
    name: string;
    calories: number;
    mealType: MealType;
    eatenAt: string;
    memo?: string | null;
}

// sending from PATCH
export type UpdateMealInput = Partial<CreateMealInput>;