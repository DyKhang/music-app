import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/FormShadCN";
import { Input } from "../../../components/Input";
import { userApi } from "../../../api/userApi";
import { update } from "../../../features/auth/authSlice";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { zodValidation } from "../../../utils/validations";

const formSchema = z.object({
  username: zodValidation.username,
});
export type UserUpdateForm = z.infer<typeof formSchema>;

export const UpdateProfileForm = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<UserUpdateForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: session?.username },
  });
  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form;

  const dispatch = useAppDispatch();

  async function onSubmit(values: UserUpdateForm) {
    try {
      setIsPending(true);
      await userApi.update(values);
      dispatch(update(values));
      reset(values);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <label className="flex flex-col space-y-3">
        <div className="text-[1.4rem] font-medium">Email</div>
        <input
          type="text"
          value={session?.email}
          disabled
          className="border-input ring-offset-background file:text-foreground placeholder:text-muted-foreground } flex h-[44px] w-full rounded-md border-[2px] border-[#79747E] px-3 py-2 text-[1.6rem] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-80"
        />
      </label>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <>
                  <label className="flex flex-col space-y-3">
                    <div className="text-[1.4rem] font-medium">
                      Tên người dùng
                    </div>
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </label>
                  <div className="flex justify-end">
                    <button
                      disabled={isPending || !isDirty}
                      className={clsx(
                        "flex h-[36px] w-[113px] items-center justify-center rounded-md bg-[#644646] px-6 py-3 text-[1.4rem] font-medium text-white",
                        {
                          "cursor-not-allowed opacity-80":
                            isPending || !isDirty,
                        },
                      )}
                    >
                      {isPending ? (
                        <ArrowPathIcon className="size-[20px] animate-spin" />
                      ) : (
                        "Lưu thay đổi"
                      )}
                    </button>
                  </div>
                </>
              );
            }}
          />
        </form>
      </Form>
    </>
  );
};
