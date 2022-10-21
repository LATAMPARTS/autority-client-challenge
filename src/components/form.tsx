import { useReducer } from 'react';
import AddTaskForm from './add-task-form';
import UpdateTaskForm from './update-task-form';
import { useSelector } from 'react-redux';

const formReducer = (state, event) => {
	return {
		...state,
		[event.target.name]: event.target.value
	};
};

export default function Form() {
	const [formData, setFormData] = useReducer(formReducer, {});

	const formId = useSelector((state) => state.app.client.formId);

	return (
		<div className="container mx-auto py-5">
			{formId ? UpdateTaskForm({ formId, formData, setFormData }) : AddTaskForm({ formData, setFormData })}
		</div>
	);
}
