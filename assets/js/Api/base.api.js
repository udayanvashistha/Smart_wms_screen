const BASE_URL = "https://gntestapi.smartwms.app/";

const postApi = async (url, body) => {
    try {
        const response = await fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            const errorData = JSON.parse(errorText);
            return { error: true, status: response.status, data: errorData };
        }

        const responseText = await response.text();
        const responseData = JSON.parse(responseText);
        return { error: false, data: responseData };
    } catch (error) {
        return { error: true, data: error.message };
    }
};


// Login Page POST API Call
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await postApi('user/login', { username: email, password });

    if (!response.error) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id.toString());

        localStorage.setItem('loginSuccess', 'true');

        window.location.href = "../pages/Homepage/home.html";
    } else {
        alert("Login failed: " + response.data.message || "Please check your credentials.");
    }
});
