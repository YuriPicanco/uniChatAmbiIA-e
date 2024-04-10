"use client";
import dotenv from "dotenv";
import OpenAI from "openai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

dotenv.config();

export const Chat = () => {
  const [input, setInput] = useState();
  const [messages, setMessages] = useState("Teste messages");
  const [arrayImages, setArrayImages] = useState([]);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AQUIS");
    geraImagem(input);
  };

  const geraImagem = async (prompt) => {
    const req = {
      model: "dall-e-2",
      prompt,
      n: 5,
      size: "256x256",
    };
    const response = await openai.images.generate(req);
    setArrayImages(response.data); //.data[0].url;
  };

  console.log("TESTE IMAGE:", arrayImages);
  return (
    <div className="flex justify-around">
      <Card className="w-[450px] bg-slate-300">
        <CardHeader>
          <CardTitle>UniChat-AmbiIA</CardTitle>
          <CardDescription className="text-base">
            Ambiente Integrado de IA
          </CardDescription>
          <CardDescription>Gerador de Imagens</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[520px] w-full pr-4">
            {/* Fazer um histórico de geração de imagens do usuário */}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <Input
              className="bg-slate-200"
              placeholder="No que posso te ajudar"
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit"> &gt;:_</Button>
          </form>
        </CardFooter>
      </Card>

      <Card className="w-[900px] ml-10 bg-slate-300">
        <CardContent className=" flex flex-wrap justify-around items-center m-1">
          {arrayImages.map((image, index) => {
            return (
              <div key={index} className="m-2">
                <img src={image.url}></img>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
