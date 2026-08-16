fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((user) => {
            document.getElementById("userData").innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                </tr>`;
        });
    })
    .catch((error) => {
        console.log("Error:", error);
    });