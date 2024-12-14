'use server';
import { prisma } from './prisma';

export const RegisterUserId = async (userId: string) => {
  const verifyUser = await prisma.accounts.findUnique({
    where: {
      user_id: userId,
    },
  });

  if (verifyUser) return;

  const user = await prisma.accounts.create({
    data: {
      user_id: userId,
    },
  });

  return user;
};

export const RegisterTask = async (data: {
  title: string;
  content: string;
  userId: string;
}) => {
  try {
    const createTask = await prisma.task.create({
      data: {
        userId: data.userId,
        title: data.title,
        content: data.content,
      },
    });

    return createTask;
  } catch {
    console.log('request failed');
  }
};

export const TasksUser = async (id: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: id,
    },
    orderBy: {createAt: 'desc'}
  })
  return tasks
}