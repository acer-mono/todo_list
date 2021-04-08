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
    add: ({ title, position }: { title: string; position: number }) =>
      fetch(`${URL}/todos`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          title,
          position
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
      title,
      position
    }: {
      id: string;
      isChecked: boolean | undefined;
      title: string | undefined;
      position: number | undefined;
    }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          title,
          isChecked,
          position
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
  }
};

export default api;
