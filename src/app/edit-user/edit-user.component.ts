import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../model/Role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user!:User;
  r!:string;
  err:number = 0;
  roles : Role[]=[]
  _addRole:boolean=false;
  constructor(
    private authService :AuthService,
    private router:Router,
    private  activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
   
   this.authService.getUserById(this.activatedRoute.snapshot.params['id']).subscribe((res)=>{
      console.log(res);
      this.user =res
    
    }
    )



  }
showAddRole(){
  this._addRole=true;
  this.getRoles()
}

hideAddRole(){
  this._addRole=false;
}

  updateUser(){
    console.log(this.user)
    this.authService.updateUser(this.user).subscribe({
      next:(res)=>{
        console.log(res);
         this.router.navigate(["/allUsers"])
      },
      error:(err:any)=>{
        this.err = 1;
      }
    }
    )





    // this.authService.login(this.user).subscribe({
    //   next: (data) => {
    //   let jwToken = data.headers.get('Authorization')!;
    //   this.authService.saveToken(jwToken);
    //   this.router.navigate(['/']);
    //   },
    //   error: (err: any) => {
    //   this.err = 1;
    //   }
    //   });








  }

getRoles() {
  this.authService.getRoles().subscribe(data=>{
    console.log(data)
    this.roles=data;
//delete roles that user already have
    this.roles = this.roles.filter((r)=>!this.user.roles?.find((ur)=>ur.role==r.role))
    console.log(this.roles)

  })
  
}


deleteRole(role : string){
  
  this.user.roles = this.user.roles?.filter((r)=>r.role!=role)
  this.getRoles()

}

addRole(){
  console.log(this.r)
  let  role:Role = new Role();
  role.role=this.r;
//test if role exist
  if(this.user.roles?.find((r)=>r.role==role.role)||this.r=="" ){
    return
  }

  this.user.roles?.push(role)
  console.log(this.user)
 this.getRoles()

}


}
