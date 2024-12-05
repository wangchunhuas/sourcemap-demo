import { defineStore } from "pinia";
export const useEventsStore = defineStore("events", {
  state: () => {
    return {
      events: [],
    };
  },
  getters: {},
  actions: {
    setEvents(_event) {
      this.events = _event;
    },
    getEvents() {
      return this.events;
    },
  },
});
