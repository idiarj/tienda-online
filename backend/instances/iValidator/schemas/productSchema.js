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
    fecha_creacion: z.date({
        required_error: 'El producto debe tener una fecha e creacion.',
        message: 'Fecha de creacion no valida.'
    }),
    imagen: z.string().end

})