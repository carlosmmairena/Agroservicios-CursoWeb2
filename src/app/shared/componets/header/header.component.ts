import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLog = false;

  constructor(private authService: AuthService) { }

  @Output() toggleSideNav= new EventEmitter<void>();

  ngOnInit(): void {

    this.authService.user$.subscribe((user)=>{
      this.isLog = user?.yourToken != null;
    });

    if(this.authService.isAuthenticated()) {
      this.isLog = true;
    } else {
      this.isLog = false;
    }
  }

  onToggleSideNav(): void{
    this.toggleSideNav.emit();
  }

  onlogout(){
    this.authService.onlogout();
  }

}
