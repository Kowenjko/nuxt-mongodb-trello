import SignupSchema from '~/schemas/Signup.schema'
import { User } from '@/server/models/User.model'

import { Validator } from '#nuxt-server-utils'
import { Board } from '~/server/models/Board.model'
import { List } from '~/server/models/List.model'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	Validator.validateSchema(SignupSchema, body)
	const user = await User.create(body)
	// // Create a board for the user
	// const board = await Board.create({
	// 	name: 'Main Board',
	// 	owner: user._id,
	// 	coverImage: 'https://picsum.photos/seed/picsum/1200/800',
	// })
	// const list = await List.create({
	// 	name: 'To Do',
	// 	board: board._id,
	// 	owner: user._id,
	// })
	// board.lists.push(list._id)
	// await board.save()
	return { ...user.toObject(), password: undefined }
})
