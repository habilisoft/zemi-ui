import { z } from 'zod';

const MoneyValidationSchema = z.object({
  currency: z.string().refine(currency => ['USD', 'DOP'].includes(currency)),
  value: z.number({ message: "Ingrese un valor numérico" })
    .min(1, { message: 'Debe ser mayor que cero' })
});

const passwordValidation = z
    .string({ required_error: "Campo requerido" })
    .min(6, { message: "Mínimo 6 caracteres" });

const positiveNumber = z.preprocess(
  (args) => (args === '' ? undefined : args),
  z.coerce
    .number({ invalid_type_error: 'Ingrese un valor válido' })
    .positive('Ingrese un valor mayor que cero'));


export { MoneyValidationSchema, passwordValidation, positiveNumber }
