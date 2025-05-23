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
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập trường này" })
    .email({ message: "Email không hợp lệ" }),
  password: z
    .string({ required_error: "Vui lòng nhập trường này" })
    .min(6, { message: "Mật khẩu phải hơn 6 ký tự" }),
});

export type UserLoginForm = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const form = useForm<UserLoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "lmk76511@gmail.com",
      password: "123456",
    },
  });

  async function onSubmit(values: UserLoginForm) {
    try {
      setIsPending(true);
      await userApi.login(values);
      form.reset();
      navigate("/");
    } finally {
      setIsPending(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[30px]"
      >
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
        <button
          disabled={isPending}
          className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[4px] bg-[#644646] text-center text-[1.4rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <ArrowPathIcon className="size-[24px] animate-spin" />
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
    </Form>
  );
};
