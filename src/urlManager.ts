import { constants } from "./constants";

class urlManager{
    static getCurrentURL ():string {
        return window.location.href
      }
    
    static redirectURL(url: string = constants.HOME_URL): void{
      return window.location.replace(url);
    }

    static rewriteURL(endpoint:string=""): boolean{
        history.pushState({"name": "lopbjorn"}, "", endpoint);
        return `${constants.HOME_URL}/${endpoint}` == this.getCurrentURL();
    }
    static runsLocally(): boolean{
      return window.location.protocol == 'file:';
    }
}
export {urlManager};