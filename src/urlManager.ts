import { constants } from "./constants";

enum HTMLFilesEnum{
  HOME="index",
  ERROR="404",
}
class urlManager{
    static getCurrentURL ():string {
        return window.location.href
      }
    
    static redirectURL(url: string = constants.HOME_URL): void{
      console.log(`redirecting from ${urlManager.getCurrentURL()} to ${url}`)
      if (urlManager.getCurrentURL()!=url && urlManager.getCurrentURL() != url + "/"){
        return window.location.replace(url);
      }
      
    }

    static redirectLocalURL(toHome:boolean=true, article?:string): void{
      let new_url = toHome? this.getCurrentURL().replace(HTMLFilesEnum.ERROR, HTMLFilesEnum.HOME) : 
      `${this.getCurrentURL().replace(HTMLFilesEnum.HOME, HTMLFilesEnum.ERROR)}/${article}`;
      console.log(new_url);
      if (new_url==this.getCurrentURL()){
        return;
      }
      return this.redirectURL(new_url);
    }

    static rewriteURL(endpoint:string=""): boolean{
      if (!this.runsLocally()){
        history.pushState({"name": "lopbjorn"}, "", endpoint);
      }
        
        return `${constants.HOME_URL}/${endpoint}` == this.getCurrentURL();
    }
    static runsLocally(): boolean{
      return window.location.protocol == 'file:';
    }
}
export {urlManager, HTMLFilesEnum};