import { z } from 'zod'
import SigninSchema from './Signin.schema'

export default SigninSchema.extend({
	name: z
		.string({
			required_error: 'Please enter your name',
			invalid_type_error: 'Please enter a valid name',
		})
		.min(2)
		.max(50),
	passwordConfirm: SigninSchema.shape.password,
}).refine((data) => data.password === data.passwordConfirm, {
	message: 'Passwords do not match',
	path: ['passwordConfirm'],
})
