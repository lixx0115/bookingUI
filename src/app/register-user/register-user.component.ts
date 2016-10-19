import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/Rx"
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
 genders = ['male', 'female'];
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      username: new FormControl("huan li", [Validators.required, this.exampleValidator], this.asyncExampleValidator),
      email: new FormControl("something@somewhere.com", [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      password: new FormControl("", [Validators.required]),
      gender: new FormControl('male', Validators.required),
      hobbies: this.formBuilder.array([
        new FormControl("", Validators.required)]
      )
    });

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

  }
  ngOnDestroy() {

  }


  onAddHobbies() {
    (<FormArray>this.myForm.controls["hobbies"]).controls.push(new FormControl("", Validators.required));

  }
  onSubmit() {
    console.log(this.myForm);
  }
  exampleValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Example') {
      return { example: true };
    }
    return null;
  }

  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Fuck') {
            resolve({ 'invalid': true });
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }

}
