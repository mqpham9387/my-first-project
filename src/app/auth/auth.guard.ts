import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, from } from "rxjs";
import { Menus } from "../main/model/menu/menu";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  menu = Menus;
  active
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(next, state);
    this.menu.forEach((e) => {
      e.child.forEach((e) => {
        if (e.child) {
          e.child.forEach((e) => {
            if (e.url == next.routeConfig.path) {
              this.active=e.clicked
            }
          });
        }
        else{
          if(e.url==next.routeConfig.path){
            this.active = e.clicked
          }
        }
      });
    });
 if (!this.active){
   window.alert('URL GUARD BY OF1')
 }
    
    return this.active;
  }
}
