import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  title: z
    .string()
    .min(1, 'Name is required'),

  price: z
    .number()
    .min(1, 'Price is required'),

  content: z
    .string()
    .optional(),
};

const productGenerated = {
  id: z.number().min(1, 'Name is required'),
  createdAt: z.string().min(1, 'Name is required'),
  updatedAt: z.string().min(1, 'Name is required'),
};

const createProductSchema = z.object({
  ...productInput,
});

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
},
  {
    $id: 'ProductSchema', // ✅ VERY IMPORTANT (unique)
  }
);