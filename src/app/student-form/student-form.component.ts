import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { SubjectsService } from '../subjects.service';
import { IStudent, ISubject, StudentFormTypes } from '../utils/TypesAndIdentifiers';

@Component({
  selector: 'app-add-student',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit  {
  @Input() studentDetails?:IStudent;
  @Input() formType?:StudentFormTypes;
  @Output() eventEmitter = new EventEmitter();
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
    subjectId: ["",Validators.required],
  });

  constructor(private fb: FormBuilder, 
    private studentService:StudentsService,
    private subjectsService:SubjectsService){
      this.formType = StudentFormTypes.CREATE;

  }

  ngOnInit(){
    if(this.studentDetails){
      this.studentForm.setValue({
        name:this.studentDetails.name,
        email:this.studentDetails.email,
        dob:this.studentDetails.dob,
        isActive:this.studentDetails.isActive,
        gender:this.studentDetails.gender,
        subjectId:this.studentDetails.subjectId
      });
    }
    this.getSubjects();
  }

  getSubjects():void{
    this.subjectsService.subjects.subscribe((subArr:ISubject[])=>this.subjects=subArr);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmitting=true;
    switch(this.formType){
      case StudentFormTypes.CREATE:{
        this.createNewStudent();
        break;
      }
      case StudentFormTypes.UPDATE:{
        this.updateStudent();
        break;
      }
      case StudentFormTypes.DELETE:{
        this.deleteStudent();
      }
    }
  }

  private createNewStudent() {
  this.studentService.addStudent(this.studentForm.value).subscribe((student: IStudent) => {
      if (student) {
        console.log("added successfully");
        this.studentForm.reset();
        this.studentForm.setValue({ subjectId: "select" });
        this.isSubmitting = false;
      }
    });
  }

  
  private updateStudent() {
    let updatedStudentDetails:IStudent ={...this.studentForm.value,id:this.studentDetails?.id};
    this.studentService.updateStudent(updatedStudentDetails).subscribe((student: IStudent) => {
      if (student) {
        console.log("updated successfully");
        this.eventEmitter.emit();
        this.isSubmitting = false;
      }
    });
  }

  private deleteStudent() {
    this.studentService.deleteStudent(this.studentDetails!.id).subscribe((student: IStudent) => {
      if (student) {
        console.log("deleted successfully");
        this.eventEmitter.emit();
        this.isSubmitting = false;
      }
    });
  }
}
