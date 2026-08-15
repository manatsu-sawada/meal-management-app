import type {
    CreateMealInput, Meal, UpdateMealInput,
} from "@/types/meal";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8787";

// Create
export async function createMeal(
    input: CreateMealInput,
): Promise<Meal> {
    const url = `${API_URL}/api/meals`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
    if (!response.ok) {
        throw new Error("食事の登録に失敗しました");
    }
    return response.json();
}

// Read
export async function getMeal(): Promise<Meal[]> {
    const url = `${API_URL}/api/meals`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("食事一覧の取得に失敗しました");
    }
    return response.json();
}

// Update
export async function updateMeal(    
    id: number,
    input: UpdateMealInput
): Promise<Meal> {
    const url = `${API_URL}/api/meals/${id}`;
    const response = await fetch(url,{ 
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input)});
    if (!response.ok) {
        throw new Error("食事の更新に失敗しました");
    }
    return response.json();
}

// Delete
export async function deleteMeal(
    id: number
) {
    const url = `${API_URL}/api/meals/${id}`;
    const response = await fetch(url,{
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("食事の削除に失敗しました");
    }
}