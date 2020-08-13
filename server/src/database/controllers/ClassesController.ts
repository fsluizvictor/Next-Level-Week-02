import { Request, Response } from 'express'
import db from "../connection"
import { ScheduleItem } from "../../utils/types"
import convertHourToMinutes from "../../utils/convertHourToMinutes"

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query

        const week_day = filters.week_day as string
        const subject = filters.subject as string
        const time = filters.time as string

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class.schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.users_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        return response.json({
            classes
        })

    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
        } = request.body

        const trx = await db.transaction()

        try {

            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            })

            const user_Id = insertedUsersIds[0]

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_Id
            })

            const class_Id = insertedClassesIds[0]

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_Id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })

            await trx('class_schedule').insert(classSchedule)

            await trx.commit()

            return response.send({
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schedule,
            })

        } catch (error) {

            await trx.rollback()

            return response.send({
                error
            })
        }

    }
}