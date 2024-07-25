import z from 'zod'

export const productSchema = z.object({
    nombre_producto: z.string(
        {
        required_error: 'El cambo del nombre producto es necesario.',
        message: 'El campo nombre de producto debe ser un string.'
        }
    ).min(4, 
        {
        message: 'El nombre del producto debe tener al menos 4 caracteres.'
        }
    ).max(50,
        {
        message: 'El nombre del producto no puede tener mas de 50 caracteres.'
        }
    ),
    precio: z.number({
        invalid_type_error: 'El precio debe ser un numero.',
        required_error: 'El producto debe tener un precio.'
    }).positive({
        message: 'El precio debe ser un numero positivo.'
    }),
    imagen: z.string().refine((value) => {
        // Verifica que el valor termine en '.jpg' o '.png'
        return value.endsWith('.jpg') || value.endsWith('.png');
      }, {
        message: "La imagen debe ser de tipo JPG o PNG", // Mensaje de error personalizado
      }).optional()
})


