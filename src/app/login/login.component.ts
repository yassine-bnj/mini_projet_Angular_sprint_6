import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [

  ]
})
export class LoginComponent implements OnInit {
  user = new User();
  err=0;

  constructor(private authService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken()!=null){
      this.router.navigate(['/livres']);
    }
  }
 async onLoggedin()
  {
    console.log(this.user)
  this.authService.login(this.user).subscribe({
  next: async(data) => {
  let jwToken = data.headers.get('Authorization')!;
  console.log(jwToken);
  this.authService.saveToken(jwToken);
  this.authService.getToken()
  this.authService.decodeJWT();
await this.getLoggedUser();


console.log(this.user)
  if(this.user.enabled==false){
    alert("votre compte n'est pas encore activé ,veillez contactez l'administrateur")
    this.user = new User();
    this.authService.logout();
  }
else{
  this.router.navigate(['/']);
}




  },
  error: (err: any) => {
  this.err = 1;
  }
  });
  }


  async getLoggedUser() {
    try {
      const data = await this.authService.getUserByUsername(this.authService.loggedUser).toPromise();
      console.log(data);
      this.user= data!;
    } catch (error) {
      console.error(error);
    }
  }
  
}
