export const useBoard = () => {
	async function destroy(id: string, onDestroy?: () => void) {
		try {
			useToast().add({
				title: 'Delete board',
				description: 'Are you sure you want to delete this board?',
				actions: [
					{
						label: 'Canel',
						click: () => {},
					},
					{
						label: 'Yes',
						color: 'red',
						click: async () => {
							await useFetch(`/api/boards/${id}`, {
								method: 'DELETE',
							})
							onDestroy?.()
						},
					},
				],
				timeout: 5000,
				color: 'red',
			})
		} catch (e: any) {
			useToast().add({
				title: 'Error',
				description: e.message || 'Something went wrong',
			})
		}
	}

	return {
		destroy,
	}
}
