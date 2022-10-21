import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../lib/helper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAction, toggleChangeAction, updateAction } from '../redux/reducer';

export default function Table() {
	const { data, isLoading, isError, error } = useQuery(['todo'], getTasks);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}

	return data.data.length > 0 ? (
		<table className="min-w-full table-auto">
			<thead>
				<tr className="bg-gray-800">
					<th className="px-16 py-2">
						<span className="text-gray-200">Name</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Description</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Author</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Is Completed?</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Created At</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Updated At</span>
					</th>
					<th className="px-16 py-2">
						<span className="text-gray-200">Actions</span>
					</th>
				</tr>
			</thead>

			<tbody className="bg-gray-200">
				{data.data.map((task, i) => (
					<Tr {...task} key={i} />
				))}
			</tbody>
		</table>
	) : (
		<div className="text-center">No data found</div>
	);
}

function Tr({ id, name, description, author, isComplete, createdAt, updatedAt }) {
	const visible = useSelector((state) => state.app.client.toggleForm);
	const dispatch = useDispatch();

	const onUpdate = () => {
		dispatch(toggleChangeAction(id));
		if (visible) {
			dispatch(updateAction(id));
		}
	};

	const onDelete = () => {
		if (!visible) {
			dispatch(deleteAction(id));
		}
	};

	return (
		<tr className="bg-gray-50 text-center">
			<td className="px-16 py-2">{name}</td>
			<td className="px-16 py-2">{description}</td>
			<td className="px-16 py-2">{author}</td>
			{/* Print Completed if isComplete is true */}
			<td>
				<span className={`${isComplete == true ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>
					{isComplete == true ? 'Completed' : 'Not Completed'}
				</span>
			</td>
			<td className="px-16 py-2">{createdAt}</td>
			<td className="px-16 py-2">{updatedAt}</td>
			<td className="px-16 py-2 flex justify-around gap-5">
				<button className="cursor" onClick={onUpdate}>
					Edit
				</button>
				<button className="cursor" onClick={onDelete}>
					Delete
				</button>
			</td>
		</tr>
	);
}
