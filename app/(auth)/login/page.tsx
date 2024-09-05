"use client";
import { loginAction } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

function AuthPage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      startTransition(() => {
        // Call login action and redirect to dashboard
        loginAction(values.username, values.password).then(() => {
          window.location.href = "/dashboard";
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Card className="w-[450px]">
        <CardHeader className="text-center">
          <CardTitle className="uppercase text-2xl">
            <div className="flex justify-center items-center flex-col">
              <Image
                className="items-center mb-2 justify-center"
                src={"/logo.png"}
                width={100}
                height={100}
                priority
                alt={"Logo RS. ST Elisabeth"}
              />
              Makaryo App
            </div>
          </CardTitle>
          <CardDescription className="text-md">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="h-10"
                          placeholder="Username"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="h-10"
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" disabled={isPending} className="w-full">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthPage;
