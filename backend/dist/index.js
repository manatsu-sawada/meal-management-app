import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "./lib/prisma";
const app = new Hono();
app.use("*", cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-type"],
}));
