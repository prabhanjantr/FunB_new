import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import {LoginService} from '../_services/login.service'

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/MustMatch';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    msg : string ='' ;
   
    constructor(private formBuilder: FormBuilder,private _loginService: LoginService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    data:any ='';

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        let formData = JSON.stringify(this.registerForm.value);
        // this._loginService.RegisterUser(formData);
        this._loginService.RegisterUser(formData).subscribe(
            res=>
            {this.msg = res.message;
            console.log(res);
            },
            err=> {this.msg = err.error.ModelState['']
                console.log(err.error.ModelState['']);
            }
            )
            ;
            // this.data =   res.message + '\n' +res.stack });
         alert(JSON.stringify(this.registerForm.value) +'\n\n' );
    }
}
