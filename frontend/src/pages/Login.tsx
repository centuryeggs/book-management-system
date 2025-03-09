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
})

const Login: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange"
  });
  
  const navigate = useNavigate();

  const submit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    axios.post('http://localhost:3000/user/login', {
      username: values.username,
      password: values.password,
    }).then((res: any) => {
      if (res.data.statusCode === 400) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        // 跳转至首页
        navigate('/');
      }
    }).catch((err: any) => {
      console.log(err?.response?.data);
      if (err?.response?.data?.statusCode === 400) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error(err?.message || 'Login failed');
      }
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="grid w-full items-center gap-3">
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
              <Button type="submit" className="w-full cursor-pointer transition-colors duration-200">Login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm flex justify-center">
            Don&apos;t have an account?
            <Button 
              variant="link" 
              className="ml-2 p-0 h-auto underline underline-offset-4 cursor-pointer" 
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
