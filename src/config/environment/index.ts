import { object, enum as zodEnum, string, coerce } from "zod";

const envSchema = object({
  APP_ENV: zodEnum(["development", "production"]),
  APP_PORT: coerce.number().int().gte(1).lte(65535),
  DATABASE_HOST: string(),
  DATABASE_PORT: coerce.number().int().gte(1).lte(65535),
  DATABASE_USER: string(),
  DATABASE_PASSWORD: string(),
  DATABASE_SCHEMA: string(),
});

export function readEnvs() {
  return envSchema.parse(process.env);
}
