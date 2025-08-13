import { Component,OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sam and Victory Project';

  ngOnInit(): void {
      initFlowbite();
  }

  // ng add @angular/material
}
