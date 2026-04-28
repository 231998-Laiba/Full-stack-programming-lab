// Function returning a Promise
function fetchUsers() {

    return new Promise(function (resolve, reject) {

        let success = true; // change to false to test reject

        setTimeout(function () {

            if (success) {

                // Array of user objects
                let users = [
                    { id: 1, name: "Ali" },
                    { id: 2, name: "Sara" },
                    { id: 3, name: "Ahmed" }
                ];

                resolve(users);

            } else {
                reject("Failed to load data from server!");
            }

        }, 3000); // 3 seconds delay
    });
}

function loadUsers() {

    document.getElementById("status").innerHTML = "Loading users...";
    document.getElementById("userList").innerHTML = "";

    fetchUsers()
        .then(function (users) {

            document.getElementById("status").innerHTML = "Users Loaded Successfully ";

            let list = document.getElementById("userList");

            users.forEach(function (user) {
                let li = document.createElement("li");
                li.innerHTML = "ID: " + user.id + " | Name: " + user.name;
                list.appendChild(li);
            });

        })
        .catch(function (error) {

            document.getElementById("status").innerHTML = error;

        });
}