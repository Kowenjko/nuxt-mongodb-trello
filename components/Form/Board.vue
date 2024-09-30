<script lang="ts" setup>
// @ts-ignore
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import type { z } from 'h3-zod'
import BoardSchema from '~/schemas/Board.schema'
import type { BoardDocument } from '@/server/models/Board.model'

interface Props {
	type: 'create' | 'update'
	initialData?: Partial<BoardDocument>
	onUpdate?: (data?: any) => void
	onCreate?: (data?: any) => void
}

const props = withDefaults(defineProps<Props>(), {
	type: 'create',
})

const isLoading = ref(false)
const formState = reactive<Partial<BoardDocument>>({
	name: '',
	coverImage: '',
})

async function handleSubmit(event: FormSubmitEvent<z.output<typeof BoardSchema>>) {
	try {
		isLoading.value = true
		if (props.type === 'update' && props.initialData?._id) {
			const updatedBoard = await useFetch(`/api/boards/${props.initialData._id}`, {
				method: 'PUT',
				body: event.data,
				watch: false,
			})
			props.onUpdate?.(updatedBoard)
			useToast().add({
				title: 'Board update',
			})
			return
		}

		const { data, error } = await useFetch('/api/boards', {
			method: 'POST',
			body: event.data,
			watch: false,
		})

		if (error.value) {
			if (error.value.statusCode === 403) {
				useSubscription().showSubscriptionModal({
					title: 'Multiple boards is a Premium Feature',
					description:
						'You can create only one board in free plan. Please upgrade to premium to create more boards.',
				})
			}
		}

		props.onCreate?.(data)
		useToast().add({
			title: 'Board create',
		})
	} catch (e) {
	} finally {
		isLoading.value = false
	}
}

watchEffect(() => {
	if (props.type === 'update' && props.initialData) {
		formState.name = props.initialData.name
		formState.coverImage = props.initialData.coverImage
	}

	if (props.type === 'create') {
		formState.name = ''
		formState.coverImage = ''
	}
})
</script>
<template>
	<UForm :state="formState" :schema="BoardSchema" class="p-4" @submit="handleSubmit">
		<UFormGroup class="mb-4" name="name" label="Board Name">
			<UInput v-model="formState.name" type="text" placeholder="Board name" />
		</UFormGroup>

		<UFormGroup class="mb-4" name="coverImage" label="Select cover image">
			<ImagePicker v-model="formState.coverImage" />
		</UFormGroup>

		<UButton type="submit" color="primary" block :loading="isLoading">
			{{ type === 'create' ? 'Create board' : 'Update board' }}
		</UButton>
	</UForm>
</template>
