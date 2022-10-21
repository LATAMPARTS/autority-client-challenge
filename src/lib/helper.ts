const BASE_API_URL = 'http://localhost:4000';
export const getTasks = async () => {
	const response = await fetch(`${BASE_API_URL}/tasks`);
	const data = await response.json();

	return data;
};

export const getTask = async (id: string) => {
	const response = await fetch(`${BASE_API_URL}/task/${id}`);
	const data = await response.json();

	if (response.status === 404) {
		throw new Error(data.message);
	}

	return data;
};

export const createTask = async (formData) => {
	try {
		const response = await fetch(`${BASE_API_URL}/task`, {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			}
		});
		const data = await response.json();

		if (response.status === 400) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const updateTask = async (id: string, formData) => {
	try {
		const response = await fetch(`${BASE_API_URL}/task/${id}`, {
			method: 'PUT',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			}
		});
		const data = await response.json();

		if (response.status === 400) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const deleteTask = async (id: string) => {
	try {
		const response = await fetch(`${BASE_API_URL}/task/${id}`, {
			method: 'DELETE'
		});

		if (response.status === 404) {
			throw new Error('Task not found');
		}

		return true;
	} catch (error) {
		throw new Error(error.message);
	}
};
