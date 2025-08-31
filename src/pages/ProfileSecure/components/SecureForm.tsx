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
import { userApi } from "../../../api/userApi";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { zodValidation } from "../../../utils/validations";
import clsx from "clsx";
import { useAppDispatch } from "../../../store";
import { logout } from "../../../features/auth/authSlice";
import { InputPassword } from "../../../components/InputPassword";

const formSchema = z
  .object({
    currentPassword: zodValidation.password,
    newPassword: zodValidation.password,
    confirmNewPassword: z.string({
      required_error: "Vui lòng nhập trường này",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Mật khẩu xác nhận không khớp",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "Mật khẩu mới phải khác với mật khẩu hiện tại",
  });

export type UserChangePasswordForm = z.infer<typeof formSchema>;

export const SecureForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<UserChangePasswordForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmNewPassword: "",
      currentPassword: "",
      newPassword: "",
    },
  });
  const dispatch = useAppDispatch();

  async function onSubmit(values: UserChangePasswordForm) {
    try {
      setIsPending(true);
      await userApi.changePassword(values);
      dispatch(logout());
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
        <label className="flex flex-col space-y-3">
          <div className="text-[1.4rem] font-medium">Mật khẩu hiện tại</div>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </label>

        <label className="flex flex-col space-y-3">
          <div className="text-[1.4rem] font-medium">Mật khẩu mới</div>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </label>

        <label className="flex flex-col space-y-3">
          <div className="text-[1.4rem] font-medium">Nhập lại mật khẩu mới</div>
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </label>

        <div className="flex justify-end">
          <button
            disabled={isPending}
            className={clsx(
              "flex h-[36px] w-[120px] items-center justify-center rounded-md bg-[#644646] px-6 py-3 text-[1.4rem] font-medium text-white",
              {
                "cursor-not-allowed opacity-80": isPending,
              },
            )}
          >
            {isPending ? (
              <ArrowPathIcon className="size-[20px] animate-spin" />
            ) : (
              "Đổi mật khẩu"
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};
