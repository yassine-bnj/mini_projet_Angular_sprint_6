import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!:User;
  oldPassword!:string;
  newPassword!:string;
  confirmPassword!:string;

  constructor(private authService :AuthService) { }

  ngOnInit(): void {
   
if(this.authService.loggedUser){

  this.authService.getUserByUsername(this.authService.loggedUser).subscribe((res)=>{
    console.log(res);
    this.user =res
  
  })

}


  }


  onUsernameChange(){
    console.log(this.user)
    this.authService.updateUser(this.user).subscribe((res)=>{
      console.log(res);
      alert("username modifié avec succès veuillez vous reconnecter")
      this.authService.logout()
    })
  }

  onChangePassword(){
    if (this.newPassword==this.confirmPassword){
    //  this.authService.changePassword(this.oldPassword,this.newPassword,this.user.user_id).subscribe((res)=>{
    //     console.log(res);
    //     alert("mot de passe modifié avec succès veuillez vous reconnecter")
    //     this.authService.logout()
    //   }
    //   )

    this.authService.changePassword(this.oldPassword,this.newPassword,this.user.user_id).subscribe({
      next: (data) => {
        alert("mot de passe modifié avec succès veuillez vous reconnecter")
        this.authService.logout()
      },
      error: (err: any) => {
       alert("l'ancien mot de passe est incorrecte");
      }
      }
    )

    }
    else{
      alert("nouveau mot de passe et confirmation non identiques..");
    }
    
  }




}
