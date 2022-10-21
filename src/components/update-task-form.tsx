import { useReducer } from 'react';
import { reducer } from 'next/dist/client/components/reducer';
import Success from './sucess';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTask, getTasks, updateTask } from '../lib/helper';

export default function UpdateTaskForm({ formId, formData, setFormData }) {
	const queryClient = useQueryClient();
	const { isLoading, isError, data, error } = useQuery(['todo', formId], () => getTask(formId));

	const updateMutation = useMutation((newData) => updateTask(formId, newData), {
		onSuccess: async () => {
			await queryClient.prefetchQuery(['todo'], getTasks);
		}
	});
	const info = data?.data;

	const handleSubmit = async (event) => {
		event.preventDefault();
		let updatedTask = Object.assign({}, data?.data, formData);

		await updateMutation.mutate(updatedTask);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" onChange={setFormData} defaultValue={info.name} placeholder="Task Name" name="name" />
			<textarea onChange={setFormData} defaultValue={info.description} placeholder="Task Description" name="description" />
			<input type="text" onChange={setFormData} defaultValue={info.author} placeholder="Task Author" name="author" />
			<div>
				<div>
					<input type="radio" onChange={setFormData} defaultChecked={info.isComplete == true} name="isComplete" value="true" id="radioDefault1" />
					<label htmlFor="radioDefault1">Completed</label>
				</div>
				<div>
					<input type="radio" onChange={setFormData} defaultChecked={info.isComplete == false} name="isComplete" value="false" id="radioDefault2" />
					<label htmlFor="radioDefault2">Not Completed</label>
				</div>
			</div>
			<button>Update Task</button>
		</form>
	);
}
