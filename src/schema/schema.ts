import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(8, { message: 'Password must have more than 8 characters' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email('Invalid email address'),
    password: z
      .string({
        required_error: 'password is required',
      })
      .min(8, { message: 'Password must have more than 8 characters' }),
    passwordConfirm: z.string(),
    username: z.string().min(6, { message: 'Username must have more than 6 characters' }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
