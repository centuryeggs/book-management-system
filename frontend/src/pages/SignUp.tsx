import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(50),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }).max(50),
  confirmPassword: z.string().min(1, {
    message: "Confirm your password.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

const SignUp: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange"
  });
  
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle registration logic
    axios
      .post("http://localhost:3000/auth/register", {
        username: form.getValues("username"),
        password: form.getValues("password"),
      })
      .then((res) => {
        console.log(res);
        toast.success("Registration successful");
        // Redirect to login page after successful registration
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="grid w-full items-center gap-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Username" 
                        {...field} 
                        className={form.formState.errors.username ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <div className="min-h-[20px] text-sm text-red-500">
                      <FormMessage />
                    </div>
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
                      <Input 
                        type="password"
                        placeholder="Password" 
                        {...field}
                        className={form.formState.errors.password ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <div className="min-h-[20px] text-sm text-red-500">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="Confirm Password" 
                        {...field}
                        className={form.formState.errors.confirmPassword ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <div className="min-h-[20px] text-sm text-red-500">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 w-full cursor-pointer transition-colors duration-200">Sign Up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm flex justify-center">
            Already have an account?
            <Button 
              variant="link" 
              className="ml-2 p-0 h-auto underline underline-offset-4 cursor-pointer" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp; 