import Image from "next/image";
import Navbar from "./Navbar";
import NewTask from "./NewTask";
import TaskList from "./TaskList"
async function getData() {
  try {
    const response = await fetch("http://localhost:3000/api/tasks");
    const data = await response.json();
    console.log(data)
    return data.data;
  } catch (e) {
    console.log(e)
  }
}
export default async function Home() {
  const tasks = await getData();
  return (
    <div>
      <Navbar />
      <div className="mx-20 mt-5">
       <TaskList tasks={tasks}/>
      </div>
      <NewTask />
    </div>
  );
}
