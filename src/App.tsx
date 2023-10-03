import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
  useLocation,
  useMatches,
} from "react-router-dom";
import { StudentModel, StudentWithoutDataLoader, Students } from "./Student";
export interface IRouteProps {
  baseRoute: string;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout baseRoute="/" />,
    handle: {
      crumb: (data: any) => "App",
      title: (data: any) => "Home",
    },
    children: [
      {
        path: "students",
        element: <Students baseRoute="/students" />,
        loader: async (data: any) => {
          return await StudentModel.getStudents();
        },
        handle: {
          crumb: (data: any) => "Students",
          title: (data: any) => "All Students",
        },
        children: [
          {
            path: ":id",
            element: <StudentWithoutDataLoader baseRoute=":id" />,
            loader: async (data: any) => {
              return await StudentModel.getStudent();
            },
            handle: {
              crumb: (data: any) => "Student",
              title: (data: any) => "Student",
            },
          },
        ],
      },
    ],
  },
]);

function Layout(props: IRouteProps) {
  const location = useLocation();

  return (
    <>
      <nav style={{ width: "100%" }}>
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
      </nav>
      {location.pathname === props.baseRoute ? <Home /> : <Outlet />}
    </>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
