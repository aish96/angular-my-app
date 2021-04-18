import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentsService } from '../students.service';
import { SubjectsService } from '../subjects.service';
import { IStudent, ISubject, StudentFormTypes } from '../utils/TypesAndIdentifiers';
import { faEdit,faTrash,faCheck,faTimes,faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  private students:IStudent[]=[];
  subjects:ISubject[]=[];
  selectedSubject = new FormControl("");
  selectedStudents:IStudent[]=[];
  loading={students:true,subjects:true};
  selectedStudentsDetails?:IStudent;
  studentAction?:StudentFormTypes;
 icons ={edit:faEdit,delete:faTrash,yes:faCheck,no:faTimes,add:faPlus};
 
  constructor(private studentsService:StudentsService,
    private subjectsService:SubjectsService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getStudents();
    this.getSubjects();
    this.addListenerOnSubjectFilter();
  }
  addListenerOnSubjectFilter():void{
    this.selectedSubject.valueChanges.subscribe(sel=>{
      console.log(sel)
      if(sel==="all"){
        this.selectedStudents=this.students;
      }else{
        this.selectedStudents = this.students.filter(stud=>stud.subjectId===sel);
      }
    })
  }
  getStudents():void{
    this.loading.students=true;
    this.studentsService.students.subscribe((studentArr:IStudent[])=>{
      this.students=studentArr;
      this.selectedStudents = this.students;
      this.selectedSubject.setValue("all");
      this.loading.students=false;
    });
  }
  getSubjects():void{
    this.loading.subjects=true;
    this.subjectsService.subjects.subscribe((subArr:ISubject[])=>{
      this.subjects=subArr;
      this.loading.subjects=false;
      this.selectedSubject.setValue("all");
    });
  }
  getSubjectName(subjectId:number):string{
    let sub= this.subjects.find(ob=>ob.id===+subjectId);
    return sub!.name;
  }

  onEdit(content:TemplateRef<any>,student:IStudent){
    this.selectedStudentsDetails = student;
    this.studentAction = StudentFormTypes.UPDATE;
    this.modalService.open(content,{centered:true});
  }
  onDelete(content:TemplateRef<any>,student:IStudent){
    this.selectedStudentsDetails = student;
    this.studentAction = StudentFormTypes.DELETE;
    this.modalService.open(content,{centered:true});
  }

  listenToStudentForm():void{
    this.modalService.dismissAll();
    this.getStudents();
  }
}

/** Dummy Data
 * 
        {
            "id":"1",
            "name":"Aishwarya",
            "email":"a@g.com",
            "subject":"Math",
            "gender":"female",
            "isActive":false
        },
        {
            "id":"2",
            "name":"Aishwarya",
            "email":"a@g.com",
            "subject":"Math",
            "gender":"female",
            "isActive":false
        }
 */