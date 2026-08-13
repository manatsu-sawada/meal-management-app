"use client";

import type { SubmitEvent } from "react";
import type { Meal } from "@/types/meal";

type EditMealProps = {
    meal: Meal;
    onClose: () => void;
};

export function EditMealModal({
    meal,
    onClose,
}: EditMealProps) {
    // Procedure when sending a form 
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        console.log({
            name: formData.get("name"),
            calories: formData.get("calories"),
            mealType: formData.get("mealType"),
            eatenAt: formData.get("eatenAt"),
            memo: formData.get("memo"),
        });

        // APIへの保存処理はあとでここに追加
        onClose();
    }

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="edit-meal-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 text-slate-900">
                <button type="button" onClick={onClose} aria-label="閉じる" className="absolute right-4 top-4 text-2xl">×</button>

                <h2 id="edit-meal-title" className="mb-8 text-2xl font-bold">編集</h2>

                <form onSubmit={handleSubmit} className="space-y-7">
                    <div>
                        <label htmlFor="edit-name">食事内容</label>
                        <input type="text" name="name" id="edit-name" defaultValue={meal.name} maxLength={100} autoFocus className="peer block w-full border-0 border-b-2 border-gray-400 outline-none focus:border-blue-600 focus:ring-0" required />
                    </div>

                    <div className="relative">
                        <label htmlFor="edit-calories">カロリー</label>
                        <input id="edit-calories" name="calories" type="number" defaultValue={meal.calories} min={0} className="peer block w-full border-0 border-b-2 border-gray-400 outline-none focus:border-blue-600 focus:ring-0" />
                        <span className="absolute right-0 text-sm text-gray-400">kcal</span>
                    </div>

                    <div className="relative">
                        <label htmlFor="edit-meal-type" className="absolute left-0 top-0 text-xs text-gray-500">
                            食事区分
                        </label>
                        <select id="edit-meal-type" name="mealType" defaultValue={meal.mealType} className="block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-2 pt-5 outline-none focus:border-blue-600 focus:ring-0">
                            <option value="BREAKFAST">朝食</option>
                            <option value="LUNCH">昼食</option>
                            <option value="DINNER">夕食</option>
                            <option value="SNACK">間食</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="edit-eaten-at">日時</label>
                        <input id="edit-eaten-at" name="eatenAt" type="datetime-local" defaultValue={meal.eatenAt} required className="block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-2 pt-5 text-gray-900 outline-none focus:border-blue-600 focus:ring-0" />
                    </div>

                    <div className="relative">
                        <label htmlFor="edit-memo">メモ</label>
                        <textarea name="memo" id="edit-memo" defaultValue={meal.memo ?? ""} rows={3} maxLength={500} className="peer block w-full resize-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-2 pt-5 text-gray-900 outline-none focus:border-blue-600 focus:ring-0" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="rounded-lg border px-5 py-2 border-gray-300 hover:bg-gray-100">
                            キャンセル
                        </button>

                        <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">
                            更新
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

