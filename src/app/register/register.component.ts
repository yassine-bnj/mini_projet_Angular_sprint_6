import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 public user = new User();
  confirmPassword?:string;
  myForm!: FormGroup;
  err=""
  loading= false;
  constructor(
   private authSerice:AuthService ,
   private router:Router,
   private formBuilder: FormBuilder
  ) { 

    this.myForm = this.formBuilder.group({
    
    
      username : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required]],

   },
    {
    validator: this.matchPasswords 
  });



  }

  ngOnInit(): void {
  }

onRegister()
{
  this.loading=true;
  this.err=""
  console.log(this.myForm.value);
  this.user.username=this.myForm.value.username;
  this.user.email=this.myForm.value.email;
  this.user.password=this.myForm.value.password;
  
  console.log(this.user);


  this.user.enabled=true
  /*this.authSerice.registerUser(this.user).subscribe((res)=>{
    console.log(res);

   

  })*/

  this.authSerice.registerUser(this.user).subscribe({
    next:(res)=>{
      this.authSerice.setRegistredUser(this.user);
      this.loading=false;
      console.log(res);
       alert("veillez confirmer votre email");
        this.router.navigate(["/verifEmail",this.user.email]);

    },
    error:(err:any)=>{
      this.loading=false;
      if(err.status=400){
        this.err= err.error.message;
        console.log(err);

      }
    }
  }
  )




}



matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null; 
} 
}
