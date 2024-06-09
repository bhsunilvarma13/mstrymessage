"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MessagePage = ({ params }: { params: { username: string } }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post("/api/send-messages", {
        username: params.username,
        content: data.content,
      });

      if (response.data.message === "User not accepting messages") {
        toast({
          title: response.data.message,
        });
      }

      form.resetField("content");

      toast({
        title: response.data.message,
      });
    } catch (error) {
      console.error("Error in sending message", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Failed to send message",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-screen-md mt-16">
      <h1 className="text-center text-4xl font-bold mb-8">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Send anonymous message to @{params.username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your anonymous message here"
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Send Message</Button>
        </form>
      </Form>
    </div>
  );
};

export default MessagePage;
