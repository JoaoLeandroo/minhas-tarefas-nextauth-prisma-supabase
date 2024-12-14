'use client';
import { FormEvent } from 'react';
import { Button } from './ui/button';
import { RegisterTask } from '@/lib/server-actions';
import { useState } from 'react';

interface FormTasksProps {
  id: string;
}

const FormTasks = ({ id }: FormTasksProps) => {
  const [title, setTtitle] = useState('');
  const [content, setContent] = useState('');

  const newRegisterTask = async (e: FormEvent) => {
    e.preventDefault();

    if (title === '' || content === '') {
      return alert('Preencha todos os campos.');
    }
    const data = {
      userId: id,
      title: title,
      content: content,
    };

    alert('Tarefa criada com sucesso!');
    RegisterTask(data);
    return;
  };
  return (
    <form className="flex gap-y-4 flex-col mt-10" onSubmit={newRegisterTask}>
      <input
        type="text"
        className="h-11 p-2 mt-2 bg-gray-100 rounded border border-zinc-200"
        placeholder="Digite aqui o titulo da tarefa"
        onChange={(e) => setTtitle(e.target.value)}
      />
      <input
        type="text"
        className="h-11 p-2 mt-2 bg-gray-100 rounded border border-zinc-200"
        placeholder="Digite aqui a descrição da tarefa"
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" className="h-11">
        Enviar Tarefa
      </Button>
    </form>
  );
};

export default FormTasks;
