import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksUser } from '@/lib/server-actions';
import { auth } from '@/lib/auth';
import Link from 'next/link';

const TasksPage = async () => {
  const session = await auth();
  const tasks = await TasksUser(session?.user?.email as string);

  return (
    <div className='max-w-[720px] p-2 mx-auto'>
      <div className='w-full h-11 mb-1 mt-2'>
        <Link href={'/dashboard'} className='flex items-center justify-center h-9 bg-black text-white rounded'>Voltar ao dashboard</Link>
      </div>
      {tasks.length > 0 ? (
        <ul className='flex flex-col gap-y-3'>
          {tasks.map((task) => (
            <li key={task.id}>
              <Card>
                <CardHeader>
                  <CardTitle className='overflow-hidden break-words'>{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='overflow-hidden break-words'>
                    {task.content}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma Tarefa encontrada</p>
      )}
    </div>
  );
};

export default TasksPage;
