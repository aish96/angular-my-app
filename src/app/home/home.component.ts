import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { SubjectsService } from '../subjects.service';
import { IStudent, ISubject } from '../utils/TypesAndIdentifiers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  studentCount=0;
  subjectsCount=0;
  loading=true;
  constructor(
    private studentService:StudentsService,private subjectService:SubjectsService) { }

   ngOnInit():void {
    this.getStudentCount();
    this.getSubjectCount();
  }

  getStudentCount():void{
    this.studentService.students.subscribe((students:IStudent[])=>this.studentCount=students.length);
  }
  getSubjectCount():void{
    this.subjectService.subjects.subscribe((subjects:ISubject[])=>this.subjectsCount=subjects.length);
  }
}
