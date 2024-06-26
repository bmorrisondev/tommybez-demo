import { getTasksForOwner, getUserInboxTasks } from "@/db";
import { auth } from "@clerk/nextjs/server";
import AddTaskForm from "./AddTaskForm";
import TaskRow from "./TaskRow";
import { Task } from "@/models/task";

export default async function Home() {
  const { sessionClaims } = auth();
  if(!sessionClaims) throw new Error('No session claims')
  const tasks = await getUserInboxTasks(sessionClaims.sub) as Task[];

  return (
    <div className='flex flex-col'>
      <AddTaskForm listId={0} />
      <div className='flex flex-col gap-2 p-2'>
        {tasks.map(task => <TaskRow key={task.id} task={task} />)}
      </div>
    </div>
  );
}
