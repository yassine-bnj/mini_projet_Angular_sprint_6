import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  confirmPassword?:string;
  myForm!: FormGroup;
  err=0;
  constructor(
   private authSerice:AuthService ,
   private router:Router,
   private formBuilder: FormBuilder
  ) { 

  //   this.myForm = this.formBuilder.group({
    
    

  //     email : ['', [Validators.required]],
  //     password : ['', [Validators.required]],
  //     confirmPassword : ['', [Validators.required, Validators.minLength(6)]],
  //     //confirrm password = password
  //     nom : ['', [Validators.required]],
  //     prenom : ['', [Validators.required]],

  //  });



  }

  ngOnInit(): void {
  }

onRegister()
{
  console.log(this.user)
if(this.user.password!=this.confirmPassword){
  this.err=1;
}
else{


  this.user.enabled=true
  /*this.authSerice.registerUser(this.user).subscribe((res)=>{
    console.log(res);

   

  })*/

  this.authSerice.registerUser(this.user).subscribe({
    next:(res)=>{
      console.log(res);
       alert("compte créé avec succès veuillez vous connecter")
        this.router.navigate(["/login"])
    },
    error:(err:any)=>{
      this.err = 2;
    }
  }
  )

}


}

}
