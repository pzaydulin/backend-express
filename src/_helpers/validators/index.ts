import {z} from 'zod'

export const loginSchema = z.object({
  email: z.string({required_error: 'Email is required'}).email('Invali email address'),
  password: z.string({required_error: 'Password is required'})
});

export const registerSchema = z.object({
  name: z.string({required_error: 'Name is required'}).min(3),
  email: z.string({required_error: 'Email is required'}).email(),
  password: z.string({required_error: 'Password is required'}).min(6),
});

export const messageSchema = z.object({
  to: z.string({ required_error: "TO is required" }),
  sender: z.string({ required_error: "SENDER is required" }),
  subject: z.string({ required_error: "SUBJECT is required" }),
  body: z.string({ required_error: "BODY is required" }),
});