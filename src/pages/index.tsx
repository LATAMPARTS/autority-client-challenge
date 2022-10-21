import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
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
		<div className={styles.container}>
			<Head>
				<title>Autority Challenge</title>
			</Head>

			<button onClick={handlerVisible}>Add Task</button>
			{deleteId ? DeleteComponent({ deleteHandler, cancelHandler }) : null}

			{visible ? <Form /> : <></>}
			<Table />
		</div>
	);
};

export default IndexPage;

const DeleteComponent = ({ deleteHandler, cancelHandler }) => {
	return (
		<div>
			<p>Are you sure?</p>
			<button onClick={deleteHandler}>Yes</button>
			<button onClick={cancelHandler}>No</button>
		</div>
	);
};
