import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:8090/livres';
token!:any;
 /* users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
  {"username":"nadhem","password":"123","roles":['USER']} ];*/
  public loggedUser!:string;
  public regitredUser : User = new User();
public isloggedIn: Boolean = false;
public roles?:string[];
  constructor(private router:Router,
              private http : HttpClient) { }
            
  login(user : User)
  {
  return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
  }
 

setRegistredUser(user : User){
  this.regitredUser=user;
}

getRegistredUser(){
  return this.regitredUser;
}


 saveToken(jwt:string){
      localStorage.setItem('jwt',jwt);
      this.token = jwt;
      this.isloggedIn = true; 
      this.decodeJWT();
  }

  getToken():string {
    return this.token;
  }

  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;

   
    


  }

 


 /* SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  }  

  isSuperAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('SUPERADMIN') >-1) ;
    ;
  }  





  logout() {
  this.loggedUser = undefined!;
  this.roles = undefined!;
  this.token= undefined!;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  localStorage.removeItem('isloggedIn');
 
  this.router.navigate(['/login']);
  }

  // setLoggedUserFromLocalStorage(login: string) {
  //   this.loggedUser = login;
  //   this.isloggedIn = true;
  //  // this.getUserRoles(login);
  // }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired()
  {
    return  this.helper.isTokenExpired(this.token);   
  }


  addUser(user : User){
    return this.http.post<User>(this.apiURL+'/Userapi/users', user, {observe:'response'});

  }

  deleteUser(id : number){
    return this.http.delete<User>(this.apiURL+'/Userapi/users/'+id, {observe:'response'});
  }

  getAllUsers(){
    return this.http.get<User[]>(this.apiURL+'/Userapi/users/all');
  }


  updateUser(user : User){
    return this.http.put<User>(this.apiURL+'/Userapi/users', user, {observe:'response'});
  }

  getUserById(id : number){
    return this.http.get<User>(this.apiURL+'/Userapi/users/'+id);
  }
   

  getUserByUsername(username : string){
    return this.http.get<User>(this.apiURL+'/Userapi/users/getByusername/'+ username);
  }
  

  registerUser(user :User){
    console.log(user);
    return this.http.post<User>(this.apiURL+'/Userapi/users/register', user, {observe:'response'});
  }


  changePassword(oldPass : string, newPass : string,id : number){

    const body = new HttpParams()
    .set('oldPass', oldPass)
    .set('newPass', newPass);

    return this.http.put<User>(this.apiURL+'/Userapi/users/changePassword/'+id,body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  validateEmail(email : string,code : string){
    return this.http.get<any>(this.apiURL+'/Userapi/users/verifEmail/'+email+'/'+code);
  }

getRoles(){
  return this.http.get<any>(this.apiURL+'/Userapi/users/roles')
}
  


}
