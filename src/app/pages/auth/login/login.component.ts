import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginFormBase } from 'src/app/shared/Utils/loginForms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginForm: LoginFormBase, private srvAuth: AuthService, private route: Router){}
   

  ngOnInit(): void {
  }

  
  onLogin():void{
    if(this.loginForm.baseForm.invalid){
      return;
    }


    const dataUser= this.loginForm.baseForm.value;

    this.srvAuth.onLogin(dataUser).subscribe((res)=>{

      //Accedo a la ruta home
      this.route.navigate(['home']);

      //ver lo que devuelve el server
        console.log(res);

    },(error)=>{

      alert(error);
    });
    
  }
}
