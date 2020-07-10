import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelConsService} from '@shared/services/modelcons.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loginUrl: string = ModelConsService.LOGIN_URL;


  constructor(private _fb: FormBuilder) {
    this.registerForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
    });
  }

  ngOnInit() {
  }

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.registerForm.controls.password.value) {
      return {error: true, confirm: true};
    }
    return {};
  };
}
