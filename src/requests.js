const handleResponse = async (response) => {
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  }

  return Promise.reject(responseData);
};

const request = async (url) => {
  const config = {
    method: "GET"
  };
  const response = await fetch(url, config);
  return handleResponse(response);
};

export { request };
