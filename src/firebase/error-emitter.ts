// A simple singleton event emitter
// See: https://github.com/ai/nanoevents

type EventCallback = (...args: any[]) => void;

export interface Emitter {
  events: Record<string, EventCallback[]>;
  on(event: string, cb: EventCallback): () => void;
  emit(event: string, ...args: any[]): void;
  off(event: string, cb: EventCallback): void;
}

export function createEmitter(): Emitter {
  return {
    events: {},
    on(event, cb) {
      this.events[event] = this.events[event] || [];
      this.events[event].push(cb);
      return () => {
        this.events[event] = this.events[event].filter(
          (i: EventCallback) => i !== cb
        );
      };
    },
    emit(event, ...args) {
      if (event in this.events) {
        for (const cb of this.events[event]) {
          cb(...args);
        }
      }
    },
    off(event, cb) {
      if (event in this.events) {
        this.events[event] = this.events[event].filter(
          (i: EventCallback) => i !== cb
        );
      }
    },
  };
}

export const errorEmitter = createEmitter();