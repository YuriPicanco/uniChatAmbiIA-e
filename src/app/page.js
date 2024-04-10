import Chat from "@/components/Chat";
import Image from "next/image";

export default function Home() {
  return (
    <div className="border border-{red-500} min-h-screen border border-slate-300">
      <div className="flex min-h-screen bg-slate-500 items-center pl-5 border">
        <Chat />
      </div>
    </div>
  );
}
