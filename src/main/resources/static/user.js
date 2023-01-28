const urlUser = 'http://localhost:8070/api/user/'
let loggedInUser = document.querySelector('#UserInfo');
let loggedUser = document.querySelector('#navBarUser')

fetch(urlUser)
    .then(res => res.json())
    .then(data => {
        loggedUser.innerHTML = `
                <span class="align-middle mr-1">${data.username}
                With Roles: ${data.roles.map(r => r.roleName === 'ROLE_USER' ? ' USER' : ' ADMIN')} </span>
                `;
        loggedInUser.innerHTML = `
                                <td>${data.id}</td>
                                <td>${data.username}</td>
                                <td>${data.surname}</td>
                                <td>${data.phone}</td>
                                <td>${data.roles.map( role =>role.roleName === 'ROLE_USER' ? 'USER' : 'ADMIN')}</td>
                                `;
    })