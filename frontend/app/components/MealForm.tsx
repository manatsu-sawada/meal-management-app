"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { MealForm } from "@/types/meal";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";

const initialForm: MealForm = {
    name: "",
    calories: "",
    mealType: "朝食",
    eatenAt: "",
    memo: "",
};

export default function MealFormModal() {
    const [isOpen, setIsOpen] = useState(false);

    // Monitor Esc key
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen])

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
        setIsOpen(false);
    }

    return (
        <>
            {/* OPEN button */}
            <button type="button" onClick={() => setIsOpen(true)} className="rounded-lg bg-blue-600 px-5 py-2.5 mb-2 font-medium text-white transition hover:bg-blue-700">
                食事を追加
            </button>

            {isOpen && (
                <div role="dialog" aria-modal="true" aria-labelledby="meal-modal-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
                        {/* close button */}
                        <button type="button" onClick={() => setIsOpen(false)} aria-label="閉じる" className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-700">×</button>

                        <h2 id="meal-modal-title" className="mb-8 text-2x1 font-bold">
                            食事を登録
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-7">
                            {/* meal */}
                            <div className="relative">
                                <label htmlFor="name">食事内容</label>
                                <input type="text" id="name" name="name" required maxLength={100} placeholder=" " autoFocus className="peer block w-full border-0 border-b-2 border-gray-400 outline-none focus:border-blue-600 focus:ring-0" />
                            </div>

                            {/* calories */}
                            <div className="relative">
                                <label htmlFor="calories">カロリー</label>
                                <input type="number" id="calories" name="calories" required min={0} placeholder=" " className="peer block w-full border-0 border-b-2 border-gray-400 outline-none focus:border-blue-600 focus:ring-0" />
                                <span className="absolute right-0 text-sm text-gray-400">kcal</span>
                            </div>

                            {/* meal type */}
                            <div className="relative">
                                <select name="mealType" id="mealType" defaultValue={"BREAKFAST"} className="block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-2 pt-5 outline-none focus:border-blue-600 focus:ring-0">
                                    <option value="BREAKFAST">朝食</option>
                                    <option value="LUNCH">昼食</option>
                                    <option value="DINNER">夕食</option>
                                    <option value="SNACK">間食</option>
                                </select>
                                <label htmlFor="mealType" className="absolute left-0 top-0 text-xs text-gray-500">食事区分</label>
                            </div>

                            {/* set date */}
                            <div className="relative">
                                <input type="datetime-local" name="eatenAt" id="eatenAt" required className="block w-full border-0 border-b-2 border-gray-300
                             bg-transparent px-0 pb-2 pt-5 text-gray-900
                             outline-none focus:border-blue-600 focus:ring-0" />

                                <label htmlFor="eatenAt" className="absolute left-0 top-0 text-xs text-gray-500">日時</label>
                            </div>

                            {/* memo */}
                            <div className="relative">
                                <label htmlFor="memo">メモ</label>
                                <textarea name="memo" id="memo" rows={3} maxLength={500} placeholder=" " className="peer block w-full resize-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-2 pt-5 text-gray-900 outline-none focus:border-blue-600 focus:ring-0" />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg border px-5 py-2 border-gray-100 hover:bg-gray-100">
                                    キャンセル
                                </button>
                                <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">
                                    登録
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    )

}