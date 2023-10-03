import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { IRouteProps } from "./App";
import React from "react";

export class StudentModel {
    id: number;
    name: string;
    gpa: number;
  
    constructor(id: number, name: string, age: number) {
      this.id = id;
      this.name = name;
      this.gpa = age;
    }
  
    //Mock API call
    static getStudents(): Promise<StudentModel[]> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            new StudentModel(1, "John", 3.5),
            new StudentModel(2, "Jane", 3.7),
            new StudentModel(3, "Bob", 3.1),
            new StudentModel(4, "Alice", 3.9),
          ]);
        }, 10);
      });
    }
    //Mock API call
    static getStudent(): Promise<StudentModel> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(new StudentModel(1, "John", 3.5));
        }, 10);
      });
    }
  }

  export function Students(props: IRouteProps) {
    const data: StudentModel[] = useLoaderData() as StudentModel[];
    const location = useLocation();
  
    return location.pathname === props.baseRoute ? (
      <div>
        <h1>Students</h1>
        <ul>
          {data.map((student) => (
            <li key={student.id}>
              <Link to={`${props.baseRoute}/${student.id}`}>{student.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    ) : <Outlet />;
  }
  
  export function StudentWithoutDataLoader(props: IRouteProps) {
    const [loading, setLoading] = React.useState(true)
    const [student, setStudent] = React.useState<StudentModel>()
    
    React.useEffect(() => {
      StudentModel.getStudent().then((student) => {
        setStudent(student)
        setLoading(false)
      })
    }, [])
    
    return (
      <div>
        <h1>student</h1>
        {loading? <div>Loading...</div> : (
          <>
            <div>Name: {student?.name}</div>
            <div>GPA: {student?.gpa}</div>
          </>
        )}
      </div>
    );
  }

  export function StudentWithDataLoader(props: IRouteProps) {
    const data: StudentModel = useLoaderData() as StudentModel;
  
    return (
      <div>
        <h1>student</h1>
        <div>Name: {data.name}</div>
        <div>GPA: {data.gpa}</div>
      </div>
    );
  }