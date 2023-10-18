import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';
import { Image } from '../model/Image.model';
@Component({
  selector: 'app-add-livre',
  templateUrl: './add-livre.component.html',
  styleUrls: ['./add-livre.component.css']
})
export class AddLivreComponent implements OnInit {
  newLivre = new Livre();
  types! : Type[];
newIdType! : number;
newType! : Type;

uploadedImage!: File;
imagePath: any = null;

  constructor(private livreService: LivreService,private router:Router) {
  }

  ngOnInit(): void {
    this.livreService.listeTypes().subscribe(types => {
      console.log(types);
      this.types = types;
      });
  }
  addLivre() {

    this.livreService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.newLivre.image=img;
    this.newLivre.type = this.types.find(t => t.idType
    == this.newIdType)!;
    this.livreService
    .ajouterLivre(this.newLivre)
    .subscribe(() => {
    this.router.navigate(['livres']);
    });
    });

    /*
    this.newLivre.type = this.types.find(type => type.idType == this.newIdType)!;
  console.log(this.newLivre);
    this.livreService.ajouterLivre(this.newLivre).subscribe(livre => {
    console.log(livre);
    this.router.navigate(['livres']);

    });*/
    //window.location.href="/livres";
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }

}
