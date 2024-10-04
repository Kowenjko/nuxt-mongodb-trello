<script lang="ts" setup>
import type { BoardDocument } from '@/server/models/Board.model'
import type { ListDocument } from '@/server/models/List.model'

definePageMeta({
	middleware: 'auth',
})

const { boardId } = useRoute().params
const showCreateList = ref(false)
const selectedList = ref<ListDocument | null>(null)

const { data, refresh } = await useFetch<BoardDocument>(`/api/boards/${boardId}`)

provide('refresh-board', refresh)

if (!data.value) {
	throw createError({
		statusCode: 404,
		message: 'Board not found',
	})
}

useHead({
	title: data.value.name,
	titleTemplate: '%s - Boards',
})

const coverImage = computed(() => data.value?.coverImage || '')
const lists = computed(() => data.value?.lists as ListDocument[])
</script>
<template>
	<WrapperDefault
		v-if="data"
		class="h-screen"
		:style="{
			backgroundImage: `url(${coverImage})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}"
	>
		<template #actions>
			<UButton @click="showCreateList = true" size="xs">Create a list</UButton>
		</template>

		<h1 class="tex-3xl font-semibold mb-4 inline-block">
			{{ data!.name }}
		</h1>

		<ListContainer :lists="lists" :board-id="boardId as string" />

		<USlideover v-model="showCreateList">
			<SlideoverHeader
				:title="selectedList ? 'Update list' : 'Create list'"
				:on-click="() => (showCreateList = false)"
			></SlideoverHeader>

			<FormList
				:type="selectedList ? 'update' : 'create'"
				:board-id="String(boardId)"
				:initial-data="selectedList"
				:on-create="
					() => {
						refresh()
						showCreateList = false
					}
				"
				:on-update="
					() => {
						refresh()
						showCreateList = false
					}
				"
				class="p-4"
			/>
		</USlideover>
	</WrapperDefault>
</template>
