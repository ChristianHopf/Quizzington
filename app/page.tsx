import Image from "next/image";
import Header from "./components/ui/Header";
import HomeInfo from "./components/home/HomeInfo";
import BrowseQuizzes from "./components/home/BrowseQuizzes";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-slate-100 to-white">
      <Header />
      <section className="flex flex-col items-center w-full">
        <HomeInfo />
        <BrowseQuizzes />
      </section>
    </main>
  );
}
