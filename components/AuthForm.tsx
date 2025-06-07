"use client";
import React from "react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { get, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createAccount,signInUser } from "@/lib/actions/user.actions";
import { create } from "domain";
import { Emblema_One } from "next/font/google";
import OTPModal from "./OTPModal";


type FormType = "sign-in" | "sign-up";


const AuthForm = ({ type }: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState(null);

    const formSchema = z.object({
        email: z.string().email("Please enter a valid email"),
        fullName:
            type === "sign-up"
                ? z.string().min(2, "Full name must have at least 2 characters").max(50)
                : z.string().optional(), // Optional for "sign-in"
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading (true);
      setErrorMessage("");
try{
      const user = type==="sign-up"? 
      await createAccount({
        fullName:data.fullName||"",
        email:data.email,
    })
    :await signInUser({
        email: data.email,
    })
      setAccountId(user.accountId);
}

    catch {
        setErrorMessage("Failed to create account. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                    <h1 className="form-title">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </h1>
                    {type === "sign-up" && (
                        <FormField control={form.control} name="fullName"

                        render={({ field }) =>(
                                <FormItem >
                                    <div className="shad-form-item">
                                        <FormLabel className="shad-form-label">Full Name</FormLabel>
                                        <FormControl >
                                            <input    {...field} placeholder="enter you full name" className="shad-input">
                                                               
                                      </input>
                                        </FormControl>


                                    </div>
                                    <FormMessage className="shad-form-message"></FormMessage>
                                </FormItem>


                            )}

                        />
                    )}

                    <FormField control={form.control} name="email"

                        render={({ field }) => (
                            <FormItem >
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Email</FormLabel>
                                    <FormControl >
                                        <input   {...field} placeholder="enter you full name" className="shad-input">
                                            
                                        </input>
                                    </FormControl>


                                </div>
                                <FormMessage className="shad-form-message"></FormMessage>
                            </FormItem>


                        )}

                    />






                    <Button type="submit" className="form-submit-button" disabled={isLoading}>Submit</Button>
                    <div className=" body-2 flex justify-center">
                        <p className="text=light-100"> 
 {type==="sign-in"? "Don't have account ?  ":"Already have account  ? "}
                        </p>
                        <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>

</div>
                </form>
            </Form>
          
            {accountId && (<OTPModal email ={form.getValues("email")} accountId ={accountId} />)}
        </>
    );
};

export default AuthForm;
