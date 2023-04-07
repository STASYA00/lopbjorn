import { constants } from "./constants";

function getCurrentURL () {
    return window.location.href
  }

function redirectURL(url: string = constants.HOME_URL){
  return window.location.replace(url);
}

  export {getCurrentURL, redirectURL};