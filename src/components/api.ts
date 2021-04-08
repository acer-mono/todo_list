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
      }).then(handleErrors)
  }
};

export default api;
