import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { Type } from '../model/type.model';
import { RechercheParTypeComponent } from '../recherche-par-type/recherche-par-type.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Image } from '../model/Image.model';
const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class LivreService {
  apiURL: string = 'http://localhost:8090/livres/api';
  types!: Type[]
  livre!: Livre;
  livreRecherche!:Livre[];
  constructor(private router: Router,private http:HttpClient,private authService:AuthService) {
 


  }
 

  listeLivres(): Observable<Livre[]>{
   
    return this.http.get<Livre[]>(this.apiURL);
    }


  ajouterLivre( livre: Livre):Observable<Livre>{
    
    return this.http.post<Livre>(this.apiURL, livre);
    }
 

  supprimerLivre(id : number) {
    const url = `${this.apiURL}/${id}`;
    
    return this.http.delete(url);
    }
  
  consulterLivre(id: number): Observable<Livre> {
    const url = `${this.apiURL}/${id}`;
    
    return this.http.get<Livre>(url);
    }

 
  updateLivre(livre :Livre) : Observable<Livre>
  {
    
  return this.http.put<Livre>(this.apiURL, livre);
  }

  
    listeTypes(): Observable<Type[]>{
      
      return this.http.get<Type[]>(this.apiURL+"/types");
      }

    consulterType(id:number): Type{
      
      return this.types.find(t => t.idType == id)!;
      }


       RechercheParType(id: number):Observable< Livre[]> {
        const url = `${this.apiURL}/getByType/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<Livre[]>(url);
        }
    rechercheParTitre(titre: string):Observable< Livre[]> {
      const url = `${this.apiURL}/getByTitreContains/${titre}`;
      
      return this.http.get<Livre[]>(url);
      }

        ajouterType( type: Type):Observable<Type>{
        
                   return this.http.post<Type>(this.apiURL+"/types", type);
          }


        supprimerType(id : number) {
          const url = `${this.apiURL}/types/${id}`;
          
          return this.http.delete(url);
          }


        updateType(t :Type) : Observable<Livre>
        {
          return this.http.put<Livre>(this.apiURL+'/types', t);
        }   
        
        
        uploadImage(file: File, filename: string): Observable<Image>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${this.apiURL + '/image/upload'}`;
          return this.http.post<Image>(url, imageFormData);
          }
          loadImage(id: number): Observable<Image> {
          const url = `${this.apiURL + '/image/get/info'}/${id}`;
          console.log(url);

          return this.http.get<Image>(url);
          }
        
          





}
