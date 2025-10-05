import { z } from "zod";

export const zodValidation = {
  username: z
    .string({ required_error: "Vui lòng nhập trường này" })
    .trim()
    .min(3, { message: "Username phải hơn 3 ký tự" })
    .max(50, { message: "Username không vượt quá 50 ký tự" }),
  email: z
    .string({ required_error: "Vui lòng nhập trường này" })
    .email({ message: "Email không hợp lệ" }),
  password: z
    .string({ required_error: "Vui lòng nhập trường này" })
    .min(6, { message: "Mật khẩu phải hơn 6 ký tự" })
    .max(30, { message: "Mật khẩu không vượt quá 30 ký tự" }),
};
