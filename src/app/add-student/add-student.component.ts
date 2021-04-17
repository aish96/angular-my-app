import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { SubjectsService } from '../subjects.service';
import { IStudent, ISubject } from '../utils/TypesAndIdentifiers';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit  {
  isSubmitting=false;
  subjects:ISubject[]=[];
  /** TODO:
   * 1. Add custom validation for isActive,gender,date,subject
   * 2. Use ng-bootstrap date component
   */
   studentForm = this.fb.group({
    name:['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    dob: ['',Validators.required],
    isActive: [true],
    gender: ["",Validators.required],
    subjectId: ['',Validators.required],
  });

  constructor(private fb: FormBuilder, 
    private studentService:StudentsService,
    private subjectsService:SubjectsService){
  }

  ngOnInit(){
    this.getSubjects();
  }

  getSubjects():void{
    this.subjectsService.subjects.subscribe((subArr:ISubject[])=>this.subjects=subArr);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmitting=true;
   this.studentService.addStudent(this.studentForm.value).subscribe((student:IStudent)=>{
     if(student){
    console.log("added successfully");
    this.studentForm.reset();
    this.isSubmitting=false;
     }
   })
  }
}
