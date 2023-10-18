import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { Type } from '../model/type.model';
import { AuthService } from '../services/auth.service';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html',
  styles: [
  ]
})
export class RechercheParTypeComponent implements OnInit {
livres!:Livre[];
IdType!:number;
types!: Type[];
  constructor(private livreService:LivreService,private router :Router,public authService:AuthService) { }

  ngOnInit(): void {
    this.livreService.listeTypes().subscribe(types => {
      console.log(types);
      this.types = types;
      });
  }

  onChange() {
    console.log(this.IdType);
    this.livreService.RechercheParType(this.IdType).
        subscribe(livres =>{this.livres=livres});

     
     }

     supprimerLivre(l: Livre) {
      //console.log(p);
      let conf = confirm("Etes-vous sûr ?");
      if (conf){
      
        this.livreService.supprimerLivre(l.idLivre!).subscribe(() => {
          console.log("produit supprimé");
          });
          this.router.navigate(['produits']).then(() => {
          window.location.reload();
          });
  
        /* this.livres =  this.livreService.RechercheParType(this.IdType);
         console.log(this.livres);*/
      }
    
    }

}
