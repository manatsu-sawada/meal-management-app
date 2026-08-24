import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "./lib/prisma.js";
import { sValidator } from "@hono/standard-validator";
import { z } from "zod";
import { auth } from "./lib/auth.js";
const app = new Hono();
// Validation
const createMealSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "食事内容を入力してください")
        .max(100, "食事内容は100文字以内です"),
    calories: z.coerce
        .number()
        .int("カロリーは整数で入力してください")
        .min(0, "カロリーは0以上で入力してください"),
    mealType: z.enum([
        "BREAKFAST",
        "LUNCH",
        "DINNER",
        "SNACK",
    ]),
    eatenAt: z.coerce.date(),
    memo: z
        .string()
        .trim()
        .max(500, "メモは500文字以内です")
        .optional(),
});
// .partial() - add optional to all data
const updateMealSchema = createMealSchema.partial();
app.use("*", cors({
    origin: "http://localhost:3000",
    allowMethods: [
        "GET", "POST", "PATCH", "DELETE", "OPTIONS",
    ],
    allowHeaders: ["Content-Type"],
    credentials: true,
}));
// Better Auth
app.all("/api/auth/*", (c) => auth.handler(c.req.raw));
app.get("/", (c) => {
    return c.json({ message: "Meal Management API" });
});
// Create
app.post("/api/meals", sValidator("json", createMealSchema), async (c) => {
    const data = c.req.valid("json");
    const meal = await prisma.meal.create({
        data: {
            name: data.name,
            calories: data.calories,
            mealType: data.mealType,
            eatenAt: data.eatenAt,
            memo: data.memo || null,
        },
    });
    return c.json(meal, 201);
});
// Read
app.get("/api/meals", async (c) => {
    const meals = await prisma.meal.findMany({
        orderBy: {
            eatenAt: "desc",
        },
    });
    return c.json(meals);
});
// Update
app.patch("/api/meals/:id", sValidator("json", updateMealSchema), async (c) => {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "IDが正しくありません。" }, 400);
    }
    const data = c.req.valid("json");
    const existingMeal = await prisma.meal.findUnique({
        where: { id },
    });
    if (!existingMeal) {
        return c.json({ error: "食事内容が見つかりません。" }, 404);
    }
    // update data
    const updateMeal = await prisma.meal.update({
        where: { id },
        data,
    });
    return c.json(updateMeal, 200);
});
// Delete
app.delete("/api/meals/:id", async (c) => {
    const id = Number(c.req.param("id"));
    // check id
    if (!Number.isInteger(id)) {
        return c.json({ error: "IDが正しくありません。" }, 400);
    }
    // meal info check
    const meal = await prisma.meal.findUnique({
        where: { id },
    });
    if (!meal) {
        return c.json({ error: "食事記録が見つかりません。" }, 404);
    }
    // delete data
    await prisma.meal.delete({
        where: { id },
    });
    return c.body(null, 204);
});
// total calories
app.get("/api/meals/daily-summary", async (c) => {
    const date = c.req.query("date");
    if (!date) {
        return c.json({ message: "日付を指定してください。" }, 400);
    }
    // create defined duration
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59.999`);
    // check the date 
    if (Number.isNaN(start.getTime())) {
        return c.json({ message: "正しい日付を指定してください " }, 400);
    }
    // return sum
    const result = await prisma.meal.aggregate({
        where: {
            eatenAt: {
                // gte - grater than or equal
                gte: start,
                // lte - less than or equal
                lte: end,
            },
        },
        // calculate 
        _sum: {
            calories: true,
        },
    });
    return c.json({
        date,
        totalCalories: result._sum.calories ?? 0,
    });
});
// details
app.get("/api/meals/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id)) {
        return c.json({ message: "IDが正しくありません。" }, 400);
    }
    const meal = await prisma.meal.findUnique({
        where: { id },
    });
    if (!meal) {
        return c.json({ message: "食事記録が見つかりません。" }, 404);
    }
    return c.json(meal);
});
serve({
    fetch: app.fetch,
    port: 8787,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
