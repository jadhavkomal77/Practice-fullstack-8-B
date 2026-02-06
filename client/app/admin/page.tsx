"use client";

import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/redux/apis/todo.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const todoSchema = z.object({
  task: z.string().min(1, "Task is required"),
  desc: z.string().min(1, "Description is required"),
  priority: z.string().min(1, "Priority is required"),
});

type TodoFormType = z.infer<typeof todoSchema>;

const Dashboard = () => {
  const { data, isLoading, isError } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormType>({
    defaultValues: {
      task: "",
      desc: "",
      priority: "",
    },
    resolver: zodResolver(todoSchema),
  });

  const handleCreate = async (values: TodoFormType) => {
    try {
      await addTodo(values).unwrap();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (
    item: any,
    isComplete: boolean
  ) => {
    try {
      await updateTodo({ ...item, complete: isComplete }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteTodo(_id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong...</p>;

  // Support both: direct array OR { todos: [] }
  // const todos = Array.isArray(data) ? data : data?.result || [];

  return (
    <>
      <form onSubmit={handleSubmit(handleCreate)}>
        <input {...register("task")} type="text" placeholder="enter task" />
        <p>{errors.task?.message}</p>

        <input {...register("desc")} type="text" placeholder="enter desc" />
        <p>{errors.desc?.message}</p>

        <select {...register("priority")}>
          <option value="">Choose priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <p>{errors.priority?.message}</p>

        <button type="submit">Add Todo</button>
      </form>

      <br />
      <br />

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data && data.map((item: any) => (
            <tr
              key={item._id}
              className={item.complete ? "bg-green-300" : "bg-red-300"}
            >
              <td>{item._id}</td>
              <td>{item.task}</td>
              <td>{item.desc}</td>
              <td>{item.priority}</td>
              <td>{item.complete ? "Complete" : "Pending"}</td>
              <td>
                {item.complete ? (
                  <button
                    onClick={() => handleUpdate(item, false)}
                  >
                    Mark Incomplete
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdate(item, true)}
                  >
                    Mark Complete
                  </button>
                )}

                <button onClick={() => handleDelete(item._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
