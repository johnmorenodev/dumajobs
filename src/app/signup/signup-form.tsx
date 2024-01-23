// components/form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signup } from "../lib/actions";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export const CreateUserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const SignupForm = () => {
  const form = useForm<CreateUserDTO>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const onSubmit = async (values: CreateUserDTO) => {
  //   const res = await fetch(`http://localhost:3000/api/signup`, {
  //     method: "POST",
  //     body: JSON.stringify({ values: values }),
  //   });

  //   if (!res.ok) {
  //     const error = await res.json();
  //     console.log(error);
  //     return;
  //   }

  //   const data = await res.json();
  // };
  const router = useRouter();

  const onSubmit = async (values: CreateUserDTO) => {
    const result = await signup(values);
    if (result?.sucess) return router.push("/home");

    toast.error("Error signing up");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
