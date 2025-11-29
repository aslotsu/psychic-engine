"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const formSchema = z.object({
  productName: z.string(),
  customerName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\+?(\d[\s-]?)?[\(]?\d{3}[\)]?[\s-]?\d{3}[\s-]?\d{4}$/, {
      message: "Please enter a valid phone number.",
    }),
  shippingAddress: z.string().min(10, {
    message: "Shipping address must be at least 10 characters.",
  }),
  quantity: z.number().min(1, {
    message: "Quantity must be at least 1.",
  }).max(999, {
    message: "Quantity cannot exceed 999.",
  }),
});

export default function PreorderPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "Rekindle",
      customerName: "",
      email: "",
      phoneNumber: "", // Phone number is now required
      shippingAddress: "",
      quantity: 1,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    alert(JSON.stringify(values, null, 2)); // For demonstration
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-6">
      <div className="w-full space-y-6 bg-card p-8 sm:max-w-md sm:rounded-lg sm:shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-card-foreground">Preorder 'Rekindle'</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                The book is currently only available on Amazon Kindle. By filling out this form, we will reach out to you to purchase when the physical books are available.
            </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shipping address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Notify Me
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}



