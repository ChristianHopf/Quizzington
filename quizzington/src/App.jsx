import { useState } from "react";
import Header from "./components/Header";
import BaseCard from "./components/ui/BaseCard";
import HomeInfo from "./components/HomeInfo";
import BrowseQuizzes from "./components/browse/BrowseQuizzes";

function App() {
  return (
    <>
      <main className="flex w-full flex-col items-center bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
        <Header />
        <section className="container flex flex-col mb-12">
          <HomeInfo />
        </section>
      </main>
      <BrowseQuizzes />
    </>
  );
}

export default App;
