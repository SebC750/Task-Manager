import Navbar from "./Navbar";
import NewTask from "./NewTask";
import TaskList from "./TaskList"
async function getData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/tasks`);
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
      <div className="lg:mx-20 mx-36 mt-20 lg:mt-5 ">
       <TaskList tasks={tasks}/>
      </div>
      <NewTask />
    </div>
  );
}
