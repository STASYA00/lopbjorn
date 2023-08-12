import { constants } from "./constants";

enum HTMLFilesEnum{
  HOME="index",
  ERROR="404",
}

class UrlHolder{
  
  static readonly article_endpoint: string = "get";
  static readonly structure_endpoint: string = "structure";

  static get(local:boolean=false, is_article:boolean=false):string{
    let endpoint = is_article ? UrlHolder.article_endpoint : UrlHolder.structure_endpoint;
    return UrlHolder.construct(local, endpoint);
  }

  private static construct(local:boolean, endpoint:string):string{
    console.log(local, endpoint);
    return local ? UrlHolder.getLocal(endpoint): UrlHolder.getServer(endpoint);
  }

  private static getLocal(endpoint:string=""):string{
    return `${constants.LOCALHOST_URL}/${endpoint}`;
  }

  private static getServer(endpoint:string=""):string{
    return `https://${endpoint}-${constants.SERVERNAME}`;
  }


}

class urlManager{
    static getCurrentURL ():string {
      return urlManager.is_server()? "" : window.location.href
      }
    
    static redirectURL(url: string = constants.HOME_URL): void{
      if (!urlManager.is_server()){
        console.log(`redirecting from ${urlManager.getCurrentURL()} to ${url}`);

        if (urlManager.getCurrentURL()!=url && urlManager.getCurrentURL() != url + "/"
              && urlManager.getCurrentURL() + "/" != url ){
          console.log("executing redirect");
          return window.location.replace(url);
        }
      }
      
      
    }

    static redirectLocalURL(toHome:boolean=true, article?:string): void{
      if (!urlManager.is_server()){
        let new_url = toHome? this.getCurrentURL().replace(HTMLFilesEnum.ERROR, HTMLFilesEnum.HOME) : 
        `${this.getCurrentURL().replace(HTMLFilesEnum.HOME, HTMLFilesEnum.ERROR)}`; // /{$article}`;
        console.log(new_url);

        if (new_url==this.getCurrentURL()){
          return;
        }
        return this.redirectURL(new_url);
      }
    }

    static rewriteURL(endpoint:string=""): boolean{
      if (!urlManager.is_server()){
        if (!urlManager.runsLocally()){
          history.pushState({"name": "lopbjorn"}, "", endpoint);
        }
          
          return `${constants.HOME_URL}/${endpoint}` == this.getCurrentURL();
        }
        return false;
      }

      static runsLocally(): boolean{
        return window.location.protocol == 'file:';
      }

      static is_server() {
        return ! (typeof window != 'undefined' && window.document);
      }
}
export {urlManager, UrlHolder, HTMLFilesEnum};