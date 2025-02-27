import Filter from "@/components/Neighborhood/Filter";
import NeighborhoodEl from "@/components/Neighborhood/Cell";
import {useTime} from "@/components/Time/use_time";
import {Button} from "@/components/ui/button";
// import {DialogPortal} from "@/components/ui/dialog";
// import {ScrollArea, ScrollBar} from "@/components/ui/react-scroll-area";
// import {ScrollAreaCorner, ScrollAreaViewport} from "@radix-ui/react-scroll-area";
import {useAppContext} from "@/context";
import {generateInputData, type Neighborhood} from "@/lib/utils";
import {RefreshCcw} from "lucide-react";
import React from "react";
import useSWR from "swr";


const fetcher = (url: string) => fetch('http://localhost:5001' + url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    matrix: generateInputData(),
  }),
}).then((res) => res.json());

/**
 * Filter neighborhoods by time period
 * - when the period is 0, only neighborhoods with value of 0 - 9 are displayed
 * - When the period is 1, only neighborhoods with value of 10 - 19 are displayed, ... etc.
 * - When the period is 5, neighborhoods with value 50 - 72 are displayed.
 * @param {number} value
 * @param {number} timePeriod
 */
function filterByPeriod(value: number, timePeriod: number): boolean {
  // [min, max]
  const ranges = [
    [
      0,
      9
    ],
    [
      10,
      19
    ],
    [
      20,
      29
    ],
    [
      30,
      39
    ],
    [
      40,
      49
    ],
    [
      50,
      72
    ],
  ];
  const [min, max] = ranges[timePeriod];
  return value >= min && value <= max;
}

const MemorizedItem = React.memo(NeighborhoodEl);

export default function List() {

  const {state} = useAppContext()
  const {data: neighborhoods, error, mutate} = useSWR<Neighborhood[]>("/", fetcher);
  const [countFiltered, setCountFiltered] = React.useState(0);
  const {timePeriod} = useTime();

  const count_neighborhoods = React.useMemo(() => neighborhoods?.length || 0, [neighborhoods])

  const filtered = React.useMemo(() => {

    if (!neighborhoods) return [];

    let filtered = neighborhoods;

    if (state.isTimeFiltering) {
      filtered = neighborhoods.filter(({value}) => filterByPeriod(value, timePeriod));
    }

    if (state.selectedSymbol) {
      filtered = filtered.filter(({type}) => type === state.selectedSymbol);
    }

    setCountFiltered(filtered.length);

    return filtered;

  },[neighborhoods, state.isTimeFiltering, state.selectedSymbol, timePeriod]);

  return (
    <>
      <Filter>
        Showing {countFiltered} of {count_neighborhoods} neighborhoods
      </Filter>
      <div id="content_boundary">
        {!neighborhoods && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <main id="content" className="">
          <div id="popover-portal" />
          <div className="h-full w-full grid grid-cols-10 gap-10 px-20">
            {filtered.map((neighborhood) => <MemorizedItem key={neighborhood.id} {...neighborhood} />)}
          </div>
        </main>
      </div>
      <Button className="fixed bottom-4 right-4" size="sm" onClick={() => mutate()}>
        <RefreshCcw/>
      </Button>
    </>
  )
}


// function WithVirtualization({
//   filtered: Neighborhood[],
// }: {
//   filtered: Neighborhood[];
// }) {
//   return (
//     <main id="content" className="">
//       <ScrollArea className={"relative overflow-hidden"}
//       >
//         <ScrollAreaViewport asChild className="h-full w-full rounded-[inherit]"
//         >
//           <div className="h-full w-full grid grid-cols-10 gap-10 px-20">
//             {filtered.map((neighborhood) => <MemorizedItem key={neighborhood.id} {...neighborhood} />)}
//           </div>
//         </ScrollAreaViewport>
//         <ScrollBar/>
//         <ScrollAreaCorner/>
//       </ScrollArea>
//     </main>
//   )
// }
