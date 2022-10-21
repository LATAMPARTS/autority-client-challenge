import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createTask, getTasks } from '../lib/helper';

export default function AddTaskForm({ formData, setFormData }) {
	const queryClient = useQueryClient();
	const addMutation = useMutation(createTask, {
		onSuccess: () => {
			queryClient.prefetchQuery(['todo'], getTasks);
		}
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		if (Object.keys(formData).length === 0) {
			return <div>Error</div>;
		}
		let { name, description, author, isComplete } = formData;

		addMutation.mutate({ name, description, author, isComplete });
	};

	if (addMutation.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" onChange={setFormData} placeholder="Task Name" name="name" />
			<textarea onChange={setFormData} placeholder="Task Description" name="description" />
			<input type="text" onChange={setFormData} placeholder="Task Author" name="author" />
			<div>
				<div>
					<input type="radio" onChange={setFormData} name="isComplete" value="true" id="radioDefault1" />
					<label htmlFor="radioDefault1">Completed</label>
				</div>
				<div>
					<input type="radio" onChange={setFormData} name="isComplete" value="false" id="radioDefault2" />
					<label htmlFor="radioDefault2">Not Completed</label>
				</div>
			</div>
			<button>Submit</button>
		</form>
	);
}
