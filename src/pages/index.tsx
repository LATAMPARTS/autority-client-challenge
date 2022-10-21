import type { NextPage } from 'next';
import Head from 'next/head';
import Table from '../components/table';
import Form from '../components/form';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAction, toggleChangeAction } from '../redux/reducer';
import { deleteTask, getTasks } from '../lib/helper';
import { useQueryClient } from '@tanstack/react-query';

const IndexPage: NextPage = (props) => {
	const visible = useSelector((state) => state.app.client.toggleForm);
	const deleteId = useSelector((state) => state.app.client.deleteId);
	const queryClient = useQueryClient();

	const dispatch = useDispatch();

	const handlerVisible = () => {
		dispatch(toggleChangeAction());
	};

	const deleteHandler = async () => {
		if (deleteId) {
			await deleteTask(deleteId);
			await queryClient.prefetchQuery(['todo'], getTasks);

			await dispatch(deleteAction(null));
		}
	};
	const cancelHandler = async () => {
		await dispatch(deleteAction(null));
	};

	return (
		<div>
			<Head>
				<title>Autority Challenge</title>
			</Head>

			<main className="py-5">
				<h1 className="text-xl md:text-5xl text-center font-bold py-10">Autority Challenge</h1>
				<div className="container mx-auto flex justify-between py-5 border-b">
					<div className="left flex gap-3">
						<button
							onClick={handlerVisible}
							className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
							Add Task
						</button>
					</div>
					{deleteId ? DeleteComponent({ deleteHandler, cancelHandler }) : null}
				</div>

				{visible ? <Form /> : null}
				<div className="mx-auto">
					<Table />
				</div>
			</main>
		</div>
	);
};

export default IndexPage;

const DeleteComponent = ({ deleteHandler, cancelHandler }) => {
	return (
		<div className="flex gap-5">
			<p>Are you sure?</p>
			<button
				onClick={cancelHandler}
				className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50">
				No
			</button>
			<button
				onClick={deleteHandler}
				className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50">
				Yes
			</button>
		</div>
	);
};
