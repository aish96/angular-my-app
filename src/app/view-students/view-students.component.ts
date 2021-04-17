import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentsService } from '../students.service';
import { SubjectsService } from '../subjects.service';
import { IStudent, ISubject } from '../utils/TypesAndIdentifiers';
import { faEdit,faTrash,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';

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
 icons ={edit:faEdit,delete:faTrash,yes:faCheck,no:faTimes};
 
  constructor(private studentsService:StudentsService,private subjectsService:SubjectsService) { }

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

  onEdit(id:number){
    let details= this.students.find(stud=>stud.id===id);
    this.studentsService.updateStudent(details!).subscribe((student)=>{
      if(student){
        this.getStudents();
      }
    });
  }
  onDelete(id:number){
    this.studentsService.deleteStudent(id).subscribe((student)=>{
      if(student){
        this.getStudents();
      }
    }); 
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