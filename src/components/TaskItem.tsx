import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { FC } from "react"
import { useMutateTask } from "~/hooks/useMutateTask"
import { UpdateTaskInput } from "~/schema/todo"
import useStore from "~/store"


export const TaskItem : FC<UpdateTaskInput> = ({taskId , body , title}) => {
    const update = useStore(state => state.updateEditedTask)
    const {deleteTaskMutation} = useMutateTask()
    return (
        <li>
            <Link href={`/task/${taskId}`}>
                <span className="cursor-pointer">{title}</span>
            </Link>
            <div className="float-right ml-20 flex">
                <PencilIcon
                    className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                    onClick={() => {
                        update({
                            taskId , 
                            title , 
                            body
                        })
                    }}
                />
                <TrashIcon
                    className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                    onClick={() => {
                        deleteTaskMutation.mutate({taskId})
                    }}
                />
            </div>
            {deleteTaskMutation.isLoading && (
                <p className="mb-3 text-green-500">Mutation under process ...</p>
            )}
        </li>
    )
}
