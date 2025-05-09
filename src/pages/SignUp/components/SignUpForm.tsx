import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/FormShadCN";
import { Input } from "../../../components/Input";
import { userApi } from "../../../api/userApi";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const formSchema = z
  .object({
    username: z
      .string({ required_error: "Vui lòng nhập trường này" })
      .min(3, { message: "Username phải hơn 3 ký tự" })
      .max(50),
    email: z
      .string({ required_error: "Vui lòng nhập trường này" })
      .email({ message: "Email không hợp lệ" }),
    password: z
      .string({ required_error: "Vui lòng nhập trường này" })
      .min(6, { message: "Mật khẩu phải hơn 6 ký tự" }),
    confirmPassword: z.string({ required_error: "Vui lòng nhập trường này" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export type UserRegisterForm = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<UserRegisterForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: UserRegisterForm) {
    try {
      setIsPending(true);
      await userApi.verify(values);

      form.reset();
    } finally {
      setIsPending(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[24px]"
      >
        <div className="flex justify-between gap-[16px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Tên người dùng" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Mật khẩu" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} label="Nhập lại mật khẩu" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          disabled={isPending}
          className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[4px] bg-[#644646] text-center text-[1.4rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <ArrowPathIcon className="size-[24px] animate-spin" />
          ) : (
            "Tạo tài khoản"
          )}
        </button>
      </form>
    </Form>
  );
};
