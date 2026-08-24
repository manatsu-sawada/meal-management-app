"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function AuthStatus() {
    const router = useRouter();
    const {
        data: session,
        isPending,
    } = authClient.useSession();

    if (isPending) {
        return (
            <div className="h-10 w-40 animate-pulse rounded-full bg-slate-200" />
        );
    }

    if (!session) {
        return (
            <button
                type="button"
                onClick={() => router.push("/sign-in")}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
                ログイン
            </button>
        );
    }

    async function handleSignOut() {
        await authClient.signOut();
        router.push("/sign-in");
        router.refresh();
    }

    const initial =
        session.user.name.trim().charAt(0).toUpperCase();

    return (
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {initial}
            </div>

            <span className="hidden max-w-32 truncate pl-1 text-sm font-medium text-slate-700 sm:block">
                {session.user.name}
            </span>

            <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
                ログアウト
            </button>
        </div>
    );
}