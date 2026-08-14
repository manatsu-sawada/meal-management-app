import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URLが設定されていません。");
}
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });
function withPrisma(c, next) {
    if (!c.get("prisma")) {
        c.set("prisma", prisma);
    }
    return next();
}
export default withPrisma;
