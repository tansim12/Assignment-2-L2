import { z } from "zod";

export const VariantsObjectSchemaZod = z.object({
  type: z.string().nonempty("Variant type is required"),
  value: z.string().nonempty("Variant value is required"),
});

export const InventoryObjectSchemaZod = z.object({
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  inStock: z.boolean().refine(val => typeof val === 'boolean', {
    message: "InStock must be a boolean"
  }),
});

export const ProductSchemaZod = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  tags: z.array(z.string().nonempty("Tag must be a non-empty string")).nonempty("At least one tag is required"),
  variants: z.array(VariantsObjectSchemaZod).nonempty("At least one variant is required"),
  inventory: InventoryObjectSchemaZod,
});

export default ProductSchemaZod