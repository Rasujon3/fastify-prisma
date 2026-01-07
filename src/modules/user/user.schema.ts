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

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
});