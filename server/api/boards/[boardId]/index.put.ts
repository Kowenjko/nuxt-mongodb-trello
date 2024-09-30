import { Validator } from '#nuxt-server-utils'
import BoardSchema from '@/schemas/Board.schema'
import { Board } from '@/server/models/Board.model'

export default defineEventHandler(async (event) => {
	const boardId = getRouterParam(event, 'boardId')
	const user = event.context.user

	const body = await readBody(event)

	Validator.validateSchema(BoardSchema.partial(), body)

	const board = await Board.findOneAndUpdate(
		{ _id: boardId, owner: user._id },
		{
			$set: body,
		}
	)

	return board
})
