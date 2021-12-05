import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//import {takeUntil} from 'rxjs/operators'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLog = false;
  constructor(private srvAuth: AuthService) { }

  @Output() toggleSideNav= new EventEmitter<void>();

  ngOnInit(): void {

    this.srvAuth.user$
    .subscribe((user)=>{
      this.isLog= user?.yourToken!=null;
    });
  }

  onToggleSideNav(): void{
    this.toggleSideNav.emit();
  }

  onlogout(){
    this.srvAuth.onlogout();
  }
}
