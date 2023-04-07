import { constants } from "./constants";

class urlManager{
    static getCurrentURL () {
        return window.location.href
      }
    
    static redirectURL(url: string = constants.HOME_URL){
      return window.location.replace(url);
    }

    static rewriteURL(endpoint:string=""){
        history.pushState({"name": "lopbjorn"}, "", endpoint);
        return `${constants.HOME_URL}/${endpoint}` == this.getCurrentURL();
    }
}
export {urlManager};