export enum Gender {
    MALE="male",
    FEMALE="female"
}

export interface IStudent {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  isActive:boolean;
  subject:string;
}

export interface ISubject{
  id:number;
  name:string;
}
