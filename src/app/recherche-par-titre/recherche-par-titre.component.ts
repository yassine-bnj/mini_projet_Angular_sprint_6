import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { AuthService } from '../services/auth.service';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-recherche-par-titre',
  templateUrl: './recherche-par-titre.component.html',
  styles: [
  ]
})
export class RechercheParTitreComponent implements OnInit {

  livres!:Livre[];
filtredLivres!:Livre[];
titreLivre!:string;
searchTerm!:string;
  constructor(private router:Router,private livreservice: LivreService,public authService:AuthService ) { }

  ngOnInit(): void {
    this.livreservice.listeLivres().subscribe(liv => {
      console.log(liv);
      this.livres = liv;
      });
  }
  

// onKeyUp(filterText : string){
 
//   this.livreservice.rechercheParTitre(filterText).
// subscribe(livres => {
// this.filtredLivres = livres;
// console.log(livres)});
// }


supprimerLivre(l: Livre) {
  //console.log(p);
  let conf = confirm("Etes-vous sûr ?");
  if (conf){
  
    this.livreservice.supprimerLivre(l.idLivre!).subscribe(() => {
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
