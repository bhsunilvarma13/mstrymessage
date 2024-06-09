"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import messages from "../../messages.json";
import AutoPlay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="h-[calc(100vh-96px)] bg-slate-800 text-slate-100 flex flex-col items-center justify-center pb-24">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Conversations.
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore MstryMessage - where your identity remains a secret
          </p>
        </section>

        <Carousel
          plugins={[AutoPlay({ delay: 2000 })]}
          className="w-full md:max-w-xl max-w-xs"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h1 className="text-2xl font-semibold">{message.title}</h1>
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-300 w-8 h-8 flex items-center justify-center rounded-full text-slate-900">
                        <span>{message.title.split(" ")[2][0]}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs text-gray-500">
                          {message.received}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6 absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-slate-900 text-white">
        © 2023 Mstry Message. All rights reserved.
      </footer>
    </>
  );
}
