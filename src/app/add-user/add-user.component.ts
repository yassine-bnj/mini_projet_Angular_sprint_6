import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
user:User=new User()
confirmPassword!:String
err:string="";
  constructor(
    private authService:AuthService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }


  addUser(){
if(this.confirmPassword!=this.user.password){
  console.log("error")


  this.toastr.error('les deux mot de passe ne sont pas identiques', 'Error');
  
}else{
  console.log(this.user)
  this.user.enabled=true

 
  this.authService.addUser(this.user).subscribe({
    next:(res)=>{
      console.log(res);
       this.router.navigate(["/allUsers"])
    },
    error:(err:any)=>{
    
      if(err.status=400){
        this.err= err.error.message;
        console.log(err);

      }
    }
  }
  )




}

    
  }

}
