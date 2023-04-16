import { Canvas } from "./canvas";
import { urlManager } from "./urlManager";

console.log(window.location.href);
let c = new Canvas();
console.log(window.location.href);
console.log("error");
throw new Error();
console.log(urlManager.getCurrentURL());
c.make();