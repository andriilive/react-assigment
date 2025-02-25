import {useTime} from "@/components/Time/use_time";
import {Switch} from "@/components/ui/switch";
import {useAppContext} from "@/context";

export default function Timer() {
  const {time, timePeriod, isTimeStopped, timeDispatch} = useTime();
  const {dispatch, state} = useAppContext();

  const handleTimeFilteringChange = (value: boolean) => {
    dispatch({type: "TOGGLE_TIME_FILTERING", isTimeFiltering: value});
  }

  const timeStopHandle = (value: boolean) => {
    timeDispatch({
      type: "TOGGLE_TIME", isTimeStopped: value
    })
  }

  return (
    <aside className='Header-Info justify-between items-center w-full py-4 flex bg-gray-300 text-black'>
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch id="stopTime" checked={isTimeStopped} onCheckedChange={timeStopHandle}/>
            <label htmlFor="stopTime">⌛️ Stop time</label>
          </div>
          <div className='Header-Time space-x-4 text-black'>
            <time aria-current="time">{time}</time>
            <span className='Header-Period'>Time period: <span className={'Period-Value'}>{timePeriod}</span></span>
          </div>
        </div>
        <div className="flex items-center space-x-10 divide-gray-400 text-black">
          <div className="flex items-center space-x-2">
            <Switch id="timeFiltering" checked={state.isTimeFiltering} onCheckedChange={handleTimeFilteringChange}/>
            <label htmlFor="timeFiltering">Filter results by time</label>
          </div>
        </div>
      </div>
    </aside>
  )
}
