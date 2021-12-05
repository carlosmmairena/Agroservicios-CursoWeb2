import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {

    if(!this.authService.isAuthenticated()) {
      this.route.navigate(['login']);
    } 
  }

}
