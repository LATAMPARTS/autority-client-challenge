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

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Author</th>
					<th>Completed?</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.data.map((task, i) => (
					<Tr {...task} key={i} />
				))}
			</tbody>
		</table>
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
		<tr>
			<td>{name}</td>
			<td>{description}</td>
			<td>{author}</td>
			{/* Print Completed if isComplete is true */}
			<td>{isComplete ? 'Completed' : 'Not Completed'}</td>
			<td>{createdAt}</td>
			<td>{updatedAt}</td>
			<td>
				<button onClick={onUpdate}>Edit</button>
				<button onClick={onDelete}>Delete</button>
			</td>
		</tr>
	);
}
