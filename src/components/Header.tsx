import Author from "@/components/Author";
import {Button} from "@/components/ui/button";
import {useAppContext} from "@/context";

export default function Header() {

  const {state, dispatch} = useAppContext();

  return (
    <header className="top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center text-black">
      {/* inner content */}
      <section className="container p-4 grow flex items-center justify-between gap-3">
        <Author />
        <h1 className="text-lg font-bold">25.02.2025</h1>
        {/* application/author image/logo placeholder */}
        {/* user menu */}
        <Button onClick={() => dispatch({type: "SWITCH_THEME"})}>
          {state.theme === "light" ? "🌞" : "🌚"}
        </Button>
      </section>
    </header>
  )
}
