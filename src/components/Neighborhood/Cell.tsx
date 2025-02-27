import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useAppContext} from "@/context";
import {type Neighborhood, symbolToIcon, TypeSYMBOLS, valueToGreenColor} from "@/lib/utils";
import React from "react";

// import Airplane_svg from '@/assets/airplane.svg';
// import Bicycle_svg from '@/assets/bicycle.svg';
// import Boat_svg from '@/assets/boat.svg';
// import Bus_svg from '@/assets/bus.svg';
// import CarSport_svg from '@/assets/car.svg';
// import Person_svg from '@/assets/person.svg';


export default function Cell({id, cells, value, type: symbol, ...props}: Neighborhood) {

  const {dispatch} = useAppContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (val: boolean) => {
    setIsOpen(val);
    dispatch({type: "FILTERING_FREEZE_TOGGLE"});
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
          <button aria-current={isOpen} className="flex rounded-lg w-full h-full items-center justify-center border-current border-2">
            <Icon className="fill-current size-4" />
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
