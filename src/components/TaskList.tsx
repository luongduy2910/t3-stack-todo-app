import { api } from "~/utils/api"
import { TaskItem } from "./TaskItem"


export const TaskList = () => {
    const {data , isLoading , error} = api.todo.getTask.useQuery()
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <ul>
            {data?.map((task) => {
                return <TaskItem
                key={task.id}
                taskId={task.id}
                title={task.title}
                body={task.body}
                />
            })}
        </ul>
    )
}
