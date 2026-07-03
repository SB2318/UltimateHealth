const { z } = require('zod');

const mongoIdSchema = z
    .string({
        error: 'Id must be a string',
    })
    .trim()
    .regex(/^[a-f\d]{24}$/i, 'Invalid Id format');

const createGlossarySchema = z.object({
  term: z.string().trim().min(1, 'Term is required'),
  slug: z.string().trim().min(1, 'Slug is required'),
  synonyms: z.array(z.string().trim()).optional(),
  shortDescription: z.string().max(160, 'Short description must be 160 characters or less').optional(),
  definition: z.string().min(1, 'Definition is required'),
  categories: z.array(mongoIdSchema).optional(),
  relatedTerms: z.array(mongoIdSchema).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

const updateGlossarySchema = z.object({
  term: z.string().trim().min(1, 'Term is required').optional(),
  slug: z.string().trim().min(1, 'Slug is required').optional(),
  synonyms: z.array(z.string().trim()).optional(),
  shortDescription: z.string().max(160, 'Short description must be 160 characters or less').optional(),
  definition: z.string().min(1, 'Definition is required').optional(),
  categories: z.array(mongoIdSchema).optional(),
  relatedTerms: z.array(mongoIdSchema).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
}).strict();

module.exports = {
  createGlossarySchema,
  updateGlossarySchema
};