import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { AuthService } from '../services/auth.service';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {
  livres!: any[];
  constructor(private livreService: LivreService,public authService: AuthService,private router:Router) {

    //this.livres = livreService.listeLivres()

  }

  ngOnInit(): void {
    this.livreService.listeLivres().subscribe(livres => {
      console.log(livres);
      this.livres = livres;
      

this.livres.forEach(livre => {
  livre.image.image = 'data:' + livre.image.type + ';base64,' + livre.image.image;
});


      });
  }

  supprimerLivre(l: Livre) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.livreService.supprimerLivre(l.idLivre!).subscribe(() => {
      console.log("produit supprimé");
      });
      this.router.navigate(['livres']).then(() => {
      window.location.reload();
      });
  }

}
