/*
Avec la version 16 de Angular l'interface CanActivate est "deprecated"
le code de la classe LivreGuard ne marche plus, ci-dessous le code qui marche avec 
les nouvelles versions de Angular. Section 16 "Angular : L’authentification et les droits d’accès"
session 103 : "Création d'un guard"
*/



import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
 
@Injectable({
  providedIn: 'root'
})
 
class PermissionsService  {
 
  constructor (private authService: AuthService,
    private router : Router) {}
 
 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAdmin())
    return true;
  else {
    this.router.navigate(['app-forbidden']);
    return false;
  }
  }
 
}
 
export const LivreGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService ).canActivate(next, state);
}
 
 