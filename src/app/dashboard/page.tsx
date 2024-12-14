import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth, signOutWithGoogle } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RegisterUserId } from '@/lib/server-actions';
import FormTasks from '@/components/FormTasks';
import Link from 'next/link';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  RegisterUserId(session.user?.email as string);

  async function signOutAction() {
    'use server';
    await signOutWithGoogle();
  }

  return (
    <div className="max-w-[1280px] w-full mx-auto p-2 h-full flex gap-2">
      <div>
        <Card className="max-w-[350px] w-full flex flex-col">
          <CardHeader>
            <Avatar className="w-14 h-14 mb-4">
              <AvatarImage
                src={session.user?.image as string}
                alt={session.user?.name as string}
              />
              <AvatarFallback className="font-bold">
                {session.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{session.user?.name}</CardTitle>
            <CardDescription>{session.user?.email}</CardDescription>
          </CardHeader>

          <CardContent className="w-full">
            <form action={signOutAction}>
              <Button className="w-full" variant={'destructive'}>
                Logout
              </Button>
            </form>
            <Link
              href={'/dashboard/tasks'}
              className="w-full mt-2 h-9 bg-black text-white flex items-center justify-center rounded"
            >
              Suas tarefas
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Card className="w-full h-full">
          <CardContent>
            <FormTasks id={session.user?.email ?? ''} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
