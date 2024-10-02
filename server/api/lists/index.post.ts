import { useValidatedBody } from 'h3-zod'
import ListSchema from '~/schemas/List.schema'
import { Board } from '~/server/models/Board.model'
import { List } from '~/server/models/List.model'

export default defineEventHandler(async (event) => {
	const body = await useValidatedBody(event, ListSchema)

	const user = event.context.user

	const list = await List.create({
		...body,
		owner: user._id,
	})

	if (!list) {
		throw createError({
			statusCode: 400,
			message: 'Something went wrong',
		})
	}

	await Board.findOneAndUpdate(
		{
			_id: body.board,
			owner: user._id,
		},
		{
			// lists: {
			//   $each: [list._id],
			//   $position: 0,
			// },
			$push: { lists: list._id },
		},
		{
			new: true,
		}
	)

	return list
})
