import Image from "next/image";
import Header from "./components/ui/Header";
import HomeInfo from "./components/home/HomeInfo";
import BrowseQuizzes from "./components/home/BrowseQuizzes";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
      <Header />
      <section className="flex flex-col w-full">
        <HomeInfo />
        <BrowseQuizzes />
      </section>
    </main>
  );
}
