import { useRef } from "react";

export const usePubSub = () => {
  // our DS -- >
  // {
  //     'event_name 1' : [the fns subscribing to that event],
  //     'event_name 2' : [the fns subscringing dfor that event],
  // }

  const eventsAndSubs = useRef(new Map());
  const publish = (event_name, dataToExec) => {
    const allCBSForthatEvent = eventsAndSubs.current.get(event_name) || [];
    allCBSForthatEvent.forEach((callbackFn) => callbackFn(dataToExec));
  };

  const subscribe = (eventNameARGS, CB) => {
    const existingCallbacksForThatEvent = eventsAndSubs.current.get(eventNameARGS) || [];
    eventsAndSubs.current.set(eventNameARGS, [...existingCallbacksForThatEvent, CB]);
  };

  const unsubscribe = (eventNameARGS, CB) => {
    const existingCallbacksForThatEvent = eventsAndSubs.current.get(eventNameARGS) || [];
    eventsAndSubs.current.set(
      eventNameARGS,
      existingCallbacksForThatEvent.filter((existingCB) => existingCB !== CB)
    );
  };

  return { publish, subscribe, unsubscribe };
};
