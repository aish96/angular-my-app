import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubject } from './utils/TypesAndIdentifiers';

const serverUrl ="http://localhost:3000/subjects";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(public http:HttpClient) { }

  public get subjects():Observable<ISubject[]>{
    return this.http.get<ISubject[]>(serverUrl);
  };

  public getsubject(id:string):Observable<ISubject>{
    return this.http.get<ISubject>(`${serverUrl}/${id}`);
  };

  // public addsubject(subjectDetails:ISubject):Observable<ISubject>{
  //   return this.http.post<ISubject>(
  //     serverUrl,
  //     subjectDetails
  //     ,this.header)
  //  };

  // public updatesubject(subjectDetails:ISubject):Observable<ISubject>{
  //   return this.http.put<ISubject>(
  //     `${serverUrl}/${subjectDetails.id}`,
  //     subjectDetails
  //     ,this.header)
  //  };

  // public deletesubject(id:string):Observable<ISubject> {
  //   return this.http.delete<ISubject>(
  //     `${serverUrl}/${id}`
  //     ,this.header)
  //  };

  //  private get header() {
  //   return { headers: { contentType: "application/json" } };
  // }
}
