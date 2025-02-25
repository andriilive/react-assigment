import './App.css'
import Header from "@/components/Header";
import List from "@/components/Neighborhood/List";
import Timer from "@/components/Time/Timer";
import {useAppContext} from "@/context";
import {clsx} from "clsx";

function App() {

  const {state} = useAppContext();

  return (
    <div id="layout" className={clsx("flex flex-col grow", state.theme)}>
      <Header />
      <Timer />
      <List />
    </div>
  )
}

export default App
