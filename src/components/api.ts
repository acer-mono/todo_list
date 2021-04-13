const URL = 'http://localhost:3001';
const defaultHeaders = {
  'Content-Type': 'application/json'
};
async function handleErrors(response: any) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}
const api = {
  todos: {
    add: ({ title }: { title: string }) =>
      fetch(`${URL}/todos`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          title
        })
      }).then(handleErrors),
    list: () =>
      fetch(`${URL}/todos`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleErrors),
    update: ({
      id,
      isChecked,
      title
    }: {
      id: string;
      isChecked: boolean | undefined;
      title: string | undefined;
    }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          title,
          isChecked
        })
      }).then(handleErrors),
    delete: (id: string) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'DELETE',
        headers: defaultHeaders,
        body: JSON.stringify({
          id
        })
      }).then(handleErrors)
  },
  auth: {
    isAuth: () =>
      fetch(`${URL}/auth`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleErrors),
    login: (username: string, password: string) =>
      fetch(`${URL}/auth`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          username,
          password
        })
      }).then(handleErrors),
    logout: () =>
      fetch(`${URL}/auth`, {
        method: 'DELETE',
        headers: defaultHeaders
      }).then(handleErrors)
  }
};

export default api;
