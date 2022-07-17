import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  userDetails:any;

  constructor(private fb:FormBuilder,
    private router:Router,
    private authservice:AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login(value){
    this.userDetails={
      email:value.email,
      password:value.password
    }
    this.authservice.login(this.userDetails).subscribe((resp:any)=>{
      if(resp.error)
      {
        return;
      }
      this.router.navigate(['main']);
    });
  }

}
