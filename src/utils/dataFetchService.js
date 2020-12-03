const dataFetchService = async endpoint => {
  try {
    const fetchUrl = `https://starnavi-frontend-test-task.herokuapp.com/${endpoint}`;
    const fetchedData = await fetch(fetchUrl);
    const parsedData = await fetchedData.json();
    return parsedData;
  } catch (err) {
    console.log("something went wrong ", err);
  }
};

const fetchedData = endpoint => {
  return dataFetchService(endpoint);
};

export default fetchedData;
