import { Container } from "@/components/container";
import { Nav } from "./_components/nav";
import { PropsWithChildren } from "react";
import { Avatar } from "@/components/avatar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container className="overflow-hidden flex flex-col">
      <div className="flex h-20 border border-transparent border-b-gray-700 items-center px-6 justify-between">
        <span className="text-lg font-bold text-text">{"<Logo>"}</span>
        <Avatar>
          <Avatar.Fallback>RI</Avatar.Fallback>
          <Avatar.Image
            alt="Avatar"
            src={"https://github.com/ricardoracki.png"}
          />
        </Avatar>
      </div>
      <div className="flex flex-row flex-1 overflow-hidden">
        <Nav />
        <section className="flex-1">{children}</section>
      </div>
    </Container>
  );
}
