import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { Type } from '../model/type.model';
import { LivreService } from '../services/livre.service';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-livre',
  templateUrl: './update-livre.component.html',
  styleUrls: ['./update-livre.component.css'],
  styles: [
  ]
})
export class UpdateLivreComponent implements OnInit {
  currentLivre = new Livre();
  types! : Type[];
updatedTypeId! : number;

uploadedImage!: File;
myImage! : any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private livreService: LivreService) { }

  ngOnInit() {
    

      this.livreService.listeTypes().
      subscribe(types => {this.types = types;
      console.log(types);
      });


      this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).
      subscribe( livre =>{ this.currentLivre = livre;
      this.updatedTypeId =this.currentLivre.type.idType;
      console.log(this.currentLivre);
      this.livreService
      .loadImage(this.currentLivre.image.idImage)
      

      .subscribe((img: Image) => {
      this.myImage = 'data:' + img.type + ';base64,' + img.image;
      
      console.log(this.myImage);
      });
      



      } ) ;
      

  }
  updateLivre() {
     console.log(this.uploadedImage)
   if (this.uploadedImage!=null) {
    this.livreService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
      this.currentLivre.image=img
      this.currentLivre.type = this.types.find(type => type.idType == this.updatedTypeId)!;
      this.livreService.updateLivre(this.currentLivre).subscribe(livre => {
      this.router.navigate(['livres']); }
      );
    
    })
  }else{

    this.currentLivre.type = this.types.find(type => type.idType == this.updatedTypeId)!;
    this.livreService.updateLivre(this.currentLivre).subscribe(livre => {
    this.router.navigate(['livres']); }
    );
  }


  }


  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.myImage = reader.result; }
    }

  

}
