import z from 'zod'

export const imageFileSchema = z.object({
    name: z.string(),
    type: z.enum(['image/jpeg', 'image/png', 'image/gif']), // Validar contra tipos MIME comunes de imágenes
    size: z.number().max(5000000), // Por ejemplo, tamaño máximo de 5MB
  });