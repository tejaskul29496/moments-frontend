import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      mobileNum: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[789][0-9]{9}$'),
        Validators.maxLength(10)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\w]).{8,64})')
      ]))
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  submitData() {
    this.spinner.show();
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    let obj = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      mobileNum: '+91' + this.registerForm.value.mobileNum,
      email: this.registerForm.value.email,
      city: this.registerForm.value.city,
      password: this.registerForm.value.password
    }

    this.authService.register(obj).subscribe((response: any) => {
      this.spinner.hide();
      this.toastr.success(response.message);
      this.router.navigate(['sign-in']);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.message);
    })
    
  }

}
