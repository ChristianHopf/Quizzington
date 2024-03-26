import React from "react";
import Header from "../components/ui/Header";
import Question from "../components/create/Question";

type Props = {};

export default function CreatePage({}: Props) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
      <Header />
      <section className="container flex flex-col items-center">
        <Question />
        <button>New question</button>
      </section>
    </main>
  );
}
