import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent  {
  /** TODO:
   * 1. Add custom validation for isActive,gender,date,subject
   * 2. Use ng-bootstrap date component
   */
   studentForm = this.fb.group({
    name:['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    birthdate: ['',Validators.required],
    isActive: [true],
    gender: ["",Validators.required],
    subject: ['',Validators.required],

    
  });
  model="";
  constructor(private fb: FormBuilder){

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.studentForm.value);
  }
}
