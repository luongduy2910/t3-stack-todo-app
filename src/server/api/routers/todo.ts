import { createTaskSchema , updateTaskSchema , deleteTaskSchema , getSingleTaskSchema } from "~/schema/todo";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
    createTask : protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ctx , input}) => {
        const task = await ctx.prisma.task.create({
            data : {
                ...input , 
                user : {
                    connect : {
                        id : ctx.session?.user?.id
                    }
                }
            } 
        })
        return task
    }) ,
    getTask : protectedProcedure
    .query(({ctx}) => {
        return ctx.prisma.task.findMany({
            where : {
                userId : ctx.session?.user?.id
            } ,
            orderBy : {
                createdAt : 'desc'
            }
        })
    }), 
    getSingleTask : protectedProcedure
    .input(getSingleTaskSchema)
    .query(({ctx , input}) => {
        return ctx.prisma.task.findUnique({
            where : {
                id : input.taskId
            }
        })
    }), 
    deleteTask : protectedProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ctx , input}) => {
        await ctx.prisma.task.delete({
            where : {
                id : input.taskId,  
            }
        })
    }), 
    updateTask : protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ctx , input}) => {
        return await ctx.prisma.task.update({
            where : {
                id : input.taskId
            } , 
            data : {
                title : input.title , 
                body : input.body
            }
        })
    })
})