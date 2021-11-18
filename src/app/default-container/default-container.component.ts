import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-container',
  templateUrl: './default-container.component.html',
  styleUrls: ['./default-container.component.scss']
})
export class DefaultContainerComponent implements OnInit {

  panelOpenState = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['sign-in']);
  }
}
