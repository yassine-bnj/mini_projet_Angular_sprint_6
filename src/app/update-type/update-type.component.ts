import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styles: [
  ]
})
export class UpdateTypeComponent implements OnInit {
  @Input()
  type! : Type;
  @Input()
 ajout!:boolean;
  @Output()
  typeUpdated = new EventEmitter<Type>();
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.type);
  }
  saveType(){
    this.typeUpdated.emit(this.type);
  }

}
