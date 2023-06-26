import { api } from "~/utils/api"
import useStore from "~/store"

export const useMutateTask = () => {
    const utils = api.useContext()
    const reset = useStore(state => state.resetEditedTask)
    const createTaskMutation = api.todo.createTask.useMutation({
        onSuccess : (res) => {
            const previousTasks = utils.todo.getTask.getData()
            if (previousTasks) {
                utils.todo.getTask.setData(undefined , [...previousTasks, res])
            }
            reset()
        }
    })
    const updateTaskMutation = api.todo.updateTask.useMutation({
        onSuccess : (res) => {
            const previousTasks = utils.todo.getTask.getData()
            if (previousTasks) {
                utils.todo.getTask.setData(undefined , previousTasks.map(task => task.id === res.id ? res : task))
            }
            reset()
        }
    })
    const deleteTaskMutation = api.todo.deleteTask.useMutation({
        onSuccess : (_, variables) => {
            const previousTasks = utils.todo.getTask.getData()
            if (previousTasks) {
                utils.todo.getTask.setData(undefined , previousTasks.filter(task => task.id !== variables.taskId))
            }
            reset()
        }
    })
    return {
        createTaskMutation,
        updateTaskMutation, 
        deleteTaskMutation
    }
}
