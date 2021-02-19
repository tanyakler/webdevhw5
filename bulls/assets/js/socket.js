
import {Socket} from "phoenix";

let socket = new Socket(
  "/socket",
  {params: {token: ""}}
);

socket.connect();

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("game:1", {});

let state = {
secret = "____",
guesses = [],
};

let callback = null;

function state_update(st) {
  console.log("New state", st);
  state = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(cb) {
  callback = cb;
  callback(state);
}

export function ch_push(guess) {
  channel.push("guess", guess)
         .receive("ok", state_update)
         .receive("error", resp => { console.log("Unable to push", resp) });
}

channel.join()
       .receive("ok", state_update)
       .receive("error", resp => { console.log("Unable to join", resp) });
