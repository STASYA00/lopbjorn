import { Canvas } from "./canvas";
import { urlManager } from "./urlManager";


let c = new Canvas();
console.log(window.location.href);
console.log(urlManager.getCurrentURL());
c.make();