import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {useAppContext} from "@/context";
import {SYMBOLS, symbolToIcon, type TypeSYMBOLS} from "@/lib/utils";
import React from "react";

export default function Filter({children}: {
  children: React.ReactNode
}) {
  const [selectedSymbol, setSelectedSymbol] = React.useState<TypeSYMBOLS>();

  const {dispatch} = useAppContext();

  const handleSymbolChange = (symbol: TypeSYMBOLS) => {
    setSelectedSymbol(symbol);
    dispatch({type: "SELECT_SYMBOL", symbol: symbol});
  }

  return (
    <aside className="flex items-center justify-between p-4 text-white/80 container">
      <div className="flex items-center gap-4">
      <ToggleGroup type="single" variant="outline" size="sm" value={selectedSymbol} onValueChange={handleSymbolChange} asChild>
        <nav className="space-x-2">
          {SYMBOLS.map(symbol => {
            const Icon = symbolToIcon[symbol];
            return (
              <ToggleGroupItem key={symbol} value={symbol} asChild>
                <button aria-current={"true"}>
                  <Icon className="size-5 fill-current" />
                </button>
              </ToggleGroupItem>
            )
          })}
        </nav>
      </ToggleGroup>
      </div>
      <div>
        {children}
      </div>
    </aside>
  )
}
