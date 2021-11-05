import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLog = false;
  constructor() { }

  @Output() toggleSideNav= new EventEmitter<void>();

  ngOnInit(): void {
  }

  onToggleSideNav(): void{
    this.toggleSideNav.emit();
  }

}
