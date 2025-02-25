import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useAppContext} from "@/context";
import {type Neighborhood, symbolToIcon, TypeSYMBOLS, valueToGreenColor} from "@/lib/utils";
import React from "react";

export default function Cell({id, cells, value, type: symbol, ...props}: Neighborhood) {

  const {dispatch} = useAppContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (val: boolean) => {
    setIsOpen(val);
    dispatch({type: "TOGGLE_TIME_FILTERING", isTimeFiltering: !val});
  }

  // The component should display the value and the symbol of the neighborhood
  // The symbol is displayed as an icon from the `symbolToIcon` map

  // The component should also display a popover with the neighborhood cells
  // The popover should be displayed when the user clicks on the neighborhood
  // The popover should be closed when the user clicks on the neighborhood again
  // Optionally the popover can be closed when the user clicks outside of the popover

  const Icon = symbolToIcon[symbol as TypeSYMBOLS];

  // The component displaying the icon and value should be a button
  return (
    <div id={id} style={{
      color: valueToGreenColor(value),
    }} className="Neighborhood aspect-square" {...props}>
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button aria-current={isOpen} className="flex w-full h-full items-center justify-center border-current border-2">
            <Icon className="size-5 fill-current"/>
            <span>{value}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent asChild>
          <div className="w-[300px] aspect-square grid-cols-3 grid-rows-3 grid text-center">
            {cells.map((row, rowIndex) => row.map((cell, cellIndex) => {
              return (
                <div key={`cell_${rowIndex}${cellIndex}`} id={`cell_${rowIndex}_${cellIndex}`} className="flex flex-items-center justify-center border-current border-2">
                  <span className="inline-block h-auto">{cell}</span>
                </div>
              )
            }))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
