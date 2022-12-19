const instanceAxios = axios.create({
    baseURL: 'http://localhost:5000',
});

const setBtn = document.querySelector('#set');
const getBtn = document.querySelector('#get');

const fetchData = (url) => {
    return async () => {
        const data = await instanceAxios.get(url, { withCredentials: true });
        console.log(data.data);
    };
};

setBtn.addEventListener('click', fetchData('/set'));
getBtn.addEventListener('click', fetchData('/get'));
