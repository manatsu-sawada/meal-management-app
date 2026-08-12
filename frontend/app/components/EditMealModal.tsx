import type { Meal } from "@/types/meal";

type EditMealProps = {
    meal: Meal;
    onClose: () => void;
};

export function EditMealModal({
    meal,
    onClose,
}: EditMealProps) {
    return (
        <div>
            <h2>食事を編集</h2>
            <p>{meal.name}</p>

            <button type="button" onClick={onClose}>
                閉じる
            </button>
        </div>
    );
}

