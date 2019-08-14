const fetchJSON = (url) => fetch(url).then((res) => res.json());

export default fetchJSON;
