import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verfi-email',
  templateUrl: './verfi-email.component.html',
  styleUrls: ['./verfi-email.component.css']
})
export class VerfiEmailComponent {
  err =0;
  code:string="";
  Obj:any;
  user:User=new User();
    constructor(private route:ActivatedRoute,private authService:AuthService,private router:Router,
      private toastr: ToastrService
      ) {}
  
    ngOnInit(): void {
      this.user =this.authService.regitredUser;
    
      console.log(this.user)
   

      console.log(this.route.snapshot.params['email']);
    }


validateEmail(){


 




  console.log("code"+this.code)
  this.authService.validateEmail(this.route.snapshot.params['email'],this.code).subscribe((res)=>{
    console.log(res);
  //  this.router.navigate(['/login']);

  if(res.emailConfirmed==true){
    console.log(this.user)
    //this.router.navigate(['/login']);
    this.toastr.success('Login successful', 'Success');

    this.authService.login(this.user).subscribe({
      next: (data) => {
      let jwToken = data.headers.get('Authorization')!;
      console.log(jwToken);
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
      },
      error: (err: any) => {
      this.err = 1;
      }
      });
  }
  else{
    this.toastr.error('Email not confirmed', 'Error');

    this.err =1;

    console.log(this.user)
  }





  }
  )

}



}
