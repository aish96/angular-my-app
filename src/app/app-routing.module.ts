import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { HomeComponent } from './home/home.component';
import { ViewStudentsComponent } from './view-students/view-students.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'view-students', component: ViewStudentsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
