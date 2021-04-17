import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from './utils/TypesAndIdentifiers';

const serverUrl ="http://localhost:3000/students";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(public http:HttpClient) { }

  public get students():Observable<IStudent[]>{
    return this.http.get<IStudent[]>(serverUrl);
  };

  public getStudent(id:string):Observable<IStudent>{
    return this.http.get<IStudent>(`${serverUrl}/${id}`);
  };

  public addStudent(studentDetails:IStudent):Observable<IStudent>{
    return this.http.post<IStudent>(
      serverUrl,
      studentDetails
      ,this.header)
   };

  public updateStudent(studentDetails:IStudent):Observable<IStudent>{
    return this.http.put<IStudent>(
      `${serverUrl}/${studentDetails.id}`,
      studentDetails
      ,this.header)
   };

  public deleteStudent(id:string):Observable<IStudent> {
    return this.http.delete<IStudent>(
      `${serverUrl}/${id}`
      ,this.header)
   };

   private get header() {
    return { headers: { contentType: "application/json" } };
  }
}
