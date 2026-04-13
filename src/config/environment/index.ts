import z from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "production"]),
  APP_PORT: z.coerce.number().int().gte(1).lte(65535),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().int().gte(1).lte(65535),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_SCHEMA: z.string(),
});

export function readEnvs() {
  return envSchema.parse(process.env);
}
