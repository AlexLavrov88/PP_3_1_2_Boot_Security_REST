const url = 'http://localhost:8070/api/admin/'
const addUserForm = document.querySelector('#addUser')
const editUserForm = document.querySelector('#modalEdit')
const deleteUserForm = document.querySelector('#modalDelete')
let currentUserId = null;

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(users => {
            let temp = '';
            users.forEach(function (user) {
                temp += `
                  <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.surname}</td>
                        <td>${user.phone}</td>
                        <td>${user.roles.map(r => r.roleName === 'ROLE_USER' ? ' USER' : ' ADMIN')}</td>

                  <td>
                       <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info"
                        data-toggle="modal" data-target="modal" id="edit-user" data-id="${user.id}">Edit</button>
                   </td>
                   <td>
                       <button type="button" class="btn btn-danger" id="delete-user" data-action="delete"
                       data-id="${user.id}" data-target="modal">Delete</button>
                        </td>
                  </tr>`;
            });
            document.querySelector('#allUsers').innerHTML = temp;
        });
}
getAllUsers()

function refreshTable() {
    let table = document.querySelector('#allUsers')
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    setTimeout(getAllUsers, 50);
}

///////////ADD user/////////////////////
const addUserName = document.getElementById('username1')
const addSurname = document.getElementById('surname1')
const addPhone = document.getElementById('phone1')
const addPassword = document.getElementById('password1')
const addRoles = document.getElementById('roles1')


const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: addUserName.value,
            surname: addSurname.value,
            phone: addPhone.value,
            password: addPassword.value,
            roles: [
                addRoles.value
            ]
        })
    })
        .then(res => res.json())
        .then(data => {
            users = data;
            getAllUsers(users);
        })
        .then(res => {
            document.getElementById('add_new_user').click()
        })
    refreshTable()
});


//////////// EDIT user////////////////

on(document, 'click', '#edit-user', e => {
    const userInfo = e.target.parentNode.parentNode
    document.querySelector('#id2').value = userInfo.children[0].innerHTML
    document.getElementById('username2').value = userInfo.children[1].innerHTML
    document.getElementById('surname2').value = userInfo.children[2].innerHTML
    document.getElementById('phone2').value = userInfo.children[3].innerHTML
    document.getElementById('password2').value = userInfo.children[4].innerHTML
    document.getElementById('roles2').value = userInfo.children[5].innerHTML
    $("#modalEdit").modal("show")

})


editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('id2').value,
            username: document.getElementById('username2').value,
            surname: document.getElementById('surname2').value,
            phone: document.getElementById('phone2').value,
            password: document.getElementById('password2').value,
            roles: [
                document.getElementById('roles2').value
            ]
        })
    }).then(res => res.json())
        .then(data => {
            users = data;
            getAllUsers(users);
        })
        .then(res => {
            document.getElementById('edit_user').click()
            // alert('???????????????????????? ????????????????')
        })
    refreshTable()
});

/////////Delete user/////////////////////////////////
deleteUserForm.addEventListener('submit', (e) => {
    console.log(e.target.parentNode.parentNode)
    e.preventDefault();
    e.stopPropagation();
    fetch(url + currentUserId, {
        method: 'DELETE'
    })
        .then()

    $("#modalDelete").modal("hide")
    refreshTable()
})

on(document, 'click', '#delete-user', e => {
    const fila2 = e.target.parentNode.parentNode
    currentUserId = fila2.children[0].innerHTML

    document.getElementById('id3').value = fila2.children[0].innerHTML
    document.getElementById('username3').value = fila2.children[1].innerHTML
    document.getElementById('surname3').value = fila2.children[2].innerHTML
    document.getElementById('phone3').value = fila2.children[3].innerHTML
    document.getElementById('roles3').value = fila2.children[4].innerHTML
    $("#modalDelete").modal("show")
})