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
  onLoggedin()
  {
    console.log(this.user)
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
}
