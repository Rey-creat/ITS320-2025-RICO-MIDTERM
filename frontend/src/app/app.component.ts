import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Keep RouterModule if you're routing
import { CommonModule } from '@angular/common'; // CommonModule is required for *ngIf and other directives
import { DisplayquotesComponent } from './displayquotes/displayquotes.component';
import { TodolistComponent } from './todolist/todolist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Using standalone components
  imports: [
    RouterModule, // If you plan to use routing in this component
    CommonModule, // Import CommonModule for ngIf and other Angular directives
    DisplayquotesComponent, // Import your standalone components
    TodolistComponent,
    PortfolioComponent,
    LoginComponent
  ]
})
export class AppComponent {
  title = 'its320frontend-rico';
}
