import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(8, 'Password must have more than 8 characters'),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email('Invalid email address'),
    password: z.string({
      required_error: 'password is required',
    }),
    passwordConfirm: z.string(),
    username: z.string().min(6, 'Username must have more than 6 characters'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
