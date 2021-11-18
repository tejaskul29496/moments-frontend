import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup
  hide = true;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  get f() {
    return this.signInForm.controls;
  }

  submitData() {
    this.spinner.show();
    // if(this.registerForm.invalid) {
    //   this.registerForm.markAllAsTouched();
    //   return;
    // }

    let obj = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }

    this.authService.login(obj).subscribe((response: any) => {
      this.spinner.hide();
      localStorage.setItem('token', response.token);
      this.toastr.success(response.message)
      this.router.navigate(['dashboard'])
      
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.message)
    })
    
  }

}
