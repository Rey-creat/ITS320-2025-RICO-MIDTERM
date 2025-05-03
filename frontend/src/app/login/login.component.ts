import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Do not automatically redirect to todolist on token presence
    // This prevents direct access to todolist without login
    // Remove any auto navigation here
  }

  login() {
    if (this.usernameControl.valid && this.passwordControl.valid) {
      const credentials = {
        username: this.usernameControl.value!,
        password: this.passwordControl.value!,
      };

      this.http.post<{ token: string }>('http://localhost:3000/api/auth/login', credentials).subscribe({
        next: (res) => {
          localStorage.setItem('authToken', res.token);
          alert('Login successful!');
          this.router.navigate(['/todolist']);
        },
        error: (err) => {
          alert('Login failed: ' + (err.error.message || 'Invalid credentials'));
        },
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
