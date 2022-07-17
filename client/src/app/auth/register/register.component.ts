import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  userDetails:any;

  constructor(private fb:FormBuilder,
    private router:Router,
    private authservice:AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  registry(value){
    console.log(value.email);
    console.log(value.password);
    console.log(value.confirmpassword);
    if (this.registerForm.invalid) {
      //this.validator.markControlsTouched(this.registerForm);
      return;
    }
    //sending data
    this.userDetails={
      name:value.name,
      email:value.email,
      password:value.password
    }
    this.authservice.register(this.userDetails).subscribe((resp:any)=>{
      if(resp.error)
      {
        return;
      }
      this.router.navigateByUrl('auth/login');
    });
  }

}
