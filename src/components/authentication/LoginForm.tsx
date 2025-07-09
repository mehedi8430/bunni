import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/use-login";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import AppleLogin from "./AppleLogin";
import GoogleLogin from "./GoogleLogin";
import { PasswordInput } from "./PasswordInput";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { form, onSubmit } = useLogin();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" size={"lg"}>
            Login
          </Button>
          <div className="after:border-dashed relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <GoogleLogin />
            <AppleLogin />
          </div>
        </div>
      </form>
    </Form>
  );
}
