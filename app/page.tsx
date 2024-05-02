import dynamic from "next/dynamic";
const Game = dynamic(() => import("@/components/Game"), { ssr: false });
export default function Home() {
  return (
    <>
      <div className="w-[100%] h-[100%] bg-[rgb(155,184,155)] flex justify-center items-center">
        <Game />
      </div>
    </>
  );
}
