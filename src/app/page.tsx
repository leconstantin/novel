import Editor from "@/components/editor";
import Menu from "@/components/Menu";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
      <a
        href="/github"
        target="_blank"
        className="absolute bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
      >
        <Github />
      </a>
      <Menu />
      <Editor />
    </div>
  );
}
