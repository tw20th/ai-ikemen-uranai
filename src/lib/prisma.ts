import { PrismaClient } from "@prisma/client";

// Prisma クライアントのシングルトンインスタンスを作成
const prisma = new PrismaClient();

export default prisma;
