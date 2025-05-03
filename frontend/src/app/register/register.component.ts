import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.usernameControl.valid && this.passwordControl.valid) {
      const newUser  = {
        username: this.usernameControl.value!,
        password: this.passwordControl.value!,
      };

      this.http.post('http://localhost:3000/api/auth/register', newUser ).subscribe({
        next: () => {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Registration failed: ' + (err.error.message || 'Try a different username.'));
        },
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}