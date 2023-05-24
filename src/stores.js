import { writable } from "svelte/store";
import { readable } from "svelte/store";
export const counter = writable(0);
export const time = readable(new Date(), function (set) {
    setInterval(() => {
        set(new Date());
    }, 1000)
    return function stop() {
        clearInterval(interval);
    }
});