const dataPostService = async request => {
  try {
    const { endpoint, method, body, headers } = request;
    const fetchUrl = `https://starnavi-frontend-test-task.herokuapp.com/${endpoint}`;
    const fetchedData = await fetch(fetchUrl, {
      method: method,
      body: body,
      headers: headers,
    });
    const response = await fetchedData.json();
    return response;
  } catch (err) {
    console.log("something went wrong ", err);
  }
};

const postData = request => {
  return dataPostService(request);
};

export default postData;
