export enum Gender {
    MALE="male",
    FEMALE="female"
}

export interface IStudent {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  isActive:boolean;
  subjectId:number;
  dob:string;
}

export interface ISubject{
  id:number;
  name:string;
}

export enum StudentFormTypes{
  UPDATE="Update",
  DELETE="Delete",
  CREATE="Add"
}