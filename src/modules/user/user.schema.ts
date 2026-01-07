import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod'

const userCore = {
    email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),

  name: z
    .string()
    .min(1, 'Name is required'),
}

const createUserSchema = z.object({
    ...userCore,
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
})

const loginSchema = z.object({
    email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),

    password: z
      .string(),
})

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});