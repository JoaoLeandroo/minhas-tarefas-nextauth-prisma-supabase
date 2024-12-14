import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth, signInWithGoogle } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  if (session) {
    return redirect('/dashboard');
  }

  async function signInAction() {
    'use server';
    await signInWithGoogle();
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Faça login com google</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signInAction}>
            <Button className="w-full">Login with Google</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
