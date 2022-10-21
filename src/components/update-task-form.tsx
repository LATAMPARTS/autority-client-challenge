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
		<form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
			<div className="input-type">
				<input
					type="text"
					onChange={setFormData}
					defaultValue={info.name}
					placeholder="Task Name"
					name="name"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<textarea
					onChange={setFormData}
					defaultValue={info.description}
					placeholder="Task Description"
					name="description"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					onChange={setFormData}
					defaultValue={info.author}
					placeholder="Task Author"
					name="author"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="flex gap-10 items-center">
				<div className="form-check">
					<input
						type="radio"
						onChange={setFormData}
						defaultChecked={info.isComplete == true}
						name="isComplete"
						value="true"
						id="radioDefault1"
						className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
					/>
					<label htmlFor="radioDefault1">Completed</label>
				</div>
				<div className="form-check">
					<input
						type="radio"
						onChange={setFormData}
						defaultChecked={info.isComplete == false}
						name="isComplete"
						value="false"
						id="radioDefault2"
						className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
					/>
					<label htmlFor="radioDefault2">Not Completed</label>
				</div>
			</div>
			<button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
				Update Task
			</button>
		</form>
	);
}
