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
		<form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
			<div className="input-type">
				<input
					type="text"
					onChange={setFormData}
					placeholder="Task Name"
					name="name"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<textarea
					onChange={setFormData}
					placeholder="Task Description"
					name="description"
					className="border w-full px-5 py-3 focus:outline-none rounded-md"
				/>
			</div>
			<div className="input-type">
				<input
					type="text"
					onChange={setFormData}
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
						name="isComplete"
						value="true"
						id="radioDefault1"
						className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
					/>
					<label htmlFor="radioDefault1" className="inline-block tet-gray-800">
						Completed
					</label>
				</div>
				<div>
					<input
						type="radio"
						onChange={setFormData}
						name="isComplete"
						value="false"
						id="radioDefault2"
						className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
					/>
					<label htmlFor="radioDefault2" className="inline-block tet-gray-800">
						Not Completed
					</label>
				</div>
			</div>
			<button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
				Add Task
			</button>
		</form>
	);
}
