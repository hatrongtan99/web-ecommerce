const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const userNameBtn = $('#username');
const passwordBtn = $('#password');
const submit = $('#submit');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const info = {
        email: userNameBtn.value,
        password: passwordBtn.value,
    };
    const data = await (
        await fetch('http://localhost:5000/v2/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(info),
        })
    ).json();
    console.log(document.cookie);
    console.log(data);
});
