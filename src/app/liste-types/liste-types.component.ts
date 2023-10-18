import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: [
  ]
})
export class ListeTypesComponent implements OnInit {
  ajout:boolean=true;
types!:any[];
updatedType:Type = {"idType":0,"nomType":""};

  constructor(private livreService:LivreService,private router:Router) { }

  ngOnInit(): void {
this.livreService.listeTypes().subscribe(types => {
  console.log(types);
  this.types = types;
  });

  }

  supprimerType(t: Type) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.livreService.supprimerType(t.idType!).subscribe(() => {
        console.log("type supprimé");
        });
        this.router.navigate(['listeTypes']).then(() => {
        window.location.reload();
        });
  }


  typeUpdated(t:Type){
    console.log("type udated ",t);
    if(this.ajout){
      this.livreService.ajouterType(t).subscribe(type => {

        console.log(type);
        });
        this.router.navigate(['listeTypes']).then(() => {
          window.location.reload();
          });
    }else{
      this.livreService.updateType(t).subscribe(type => {
        console.log(type);
        });;
    }
    
    }

  updateType(t:Type) {
      this.updatedType=t;
      this.ajout=false;
      }

}
