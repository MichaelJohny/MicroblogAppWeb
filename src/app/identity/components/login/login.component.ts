import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {IdentityService} from "../../services/identity.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      let v = {
        "loginViewModel" : this.loginForm.value
      }
      this.identityService.login(v).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
        }
      });
    }
  }
}
