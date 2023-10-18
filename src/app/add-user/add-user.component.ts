import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
user:User=new User()
confirmPassword!:String
err:number=0;
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }


  addUser(){
if(this.confirmPassword!=this.user.password){
  console.log("error")
  alert("les deux mot de passe ne sont pas identiques")
}else{
  console.log(this.user)
  this.user.enabled=true
 
  this.authService.registerUser(this.user).subscribe({
    next:(res)=>{
      console.log(res);
       this.router.navigate(["/allUsers"])
    },
    error:(err:any)=>{
      this.err = 1;
    }
  }
  )




}

    
  }

}
