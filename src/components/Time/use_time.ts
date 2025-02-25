import React, {useEffect} from "react";

type TimeState = {
  time: string;
  timePeriod: number;
  isTimeStopped: boolean;
}

type TimeAction = {
  type: 'SET_TIME',
} | {
  type: 'TOGGLE_TIME', isTimeStopped: boolean;
}

/**
 * Takes a date object and returns the time period of the date.
 * The time period is the first digit of the seconds of the date.
 */
function getTimePeriod(date: Date) {
  const seconds = date.getSeconds();
  return Math.floor(seconds / 10); // 0 - 5
}

/**
 * Takes a date object and converts it to a string in format 'YYYY-MM-DD HH:mm:SS'
 */
function dateToString(date: Date) {
  // ISO String is in format 'YYYY-MM-DDTHH:mm:SS.SSSZ', so we replace the 'T' with a space and
  // keep only the part up to the seconds, normally we would use day.js for this, but there is no reason to
  // add another dependency for this simple task
  return date.toISOString().replace('T', ' ').slice(0, 19);
}

export function useTime() {

  const [timeState, timeDispatch] = React.useReducer(function (prevState: TimeState, args: TimeAction) {
    switch (args.type) {
      case 'SET_TIME':
        return {
          ...prevState,
          time: dateToString(new Date()),
          timePeriod: getTimePeriod(new Date())
        }
      case 'TOGGLE_TIME':
        return {
          ...prevState,
          isTimeStopped: args.isTimeStopped
        }
      default:
        return prevState;
    }
  }, {
    time: dateToString(new Date()),
    timePeriod: getTimePeriod(new Date()),
    isTimeStopped: false
    // TODO: what are the use cases for this state?
  });

  useEffect( () => {
    const interval = setInterval(() => {
      if (!timeState.isTimeStopped) {
        timeDispatch({type: 'SET_TIME'});
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeState.isTimeStopped]);


  // const [time, setTime] = React.useState(dateToString(new Date()));
  // const [timePeriod, setTimePeriod] = React.useState(getTimePeriod(new Date()));
  // const [isTimeStopped, setTimeStopped] = React.useState(false);

  return {
    ...timeState,
    timeDispatch: timeDispatch,
  }
}
