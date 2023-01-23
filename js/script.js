const article = document.querySelector(".article");
const header = document.querySelector(".header");

const newClient = document.querySelector(".new__client");
const modal = document.querySelector(".modal");
const tableBtn = document.querySelector("#clients__table>tbody");

const form = document.querySelector(".form");
const saveBtn = document.querySelector(".save__client");
const closeBtn = document.querySelector(".cancel");
const fields = document.querySelectorAll(".modal__field")
const clientName = document.querySelector(".name");
const clientCpf = document.querySelector(".cpf");
const clientTel = document.querySelector(".tel");
const clientEmail = document.querySelector(".email");
const clientCity = document.querySelector(".city");
const clientValue = document.querySelector(".value");
const clientDate = document.querySelector(".date");

// Funções

// CRUD

const getLocalStorage = () => JSON.parse(localStorage.getItem("client")) ?? [];
const setLocalStorage = (listClients) => localStorage.setItem("client", JSON.stringify(listClients));

const deleteClient = (index) => {
    const listClients = readClient();
    listClients.splice(index, 1);
    setLocalStorage(listClients)
}

const updateClient = (index, client) => {
    const listClients = readClient()
    listClients[index] = client
    setLocalStorage(listClients)
}

const readClient = () => getLocalStorage();

const createClient = (client) => {
    const listClients = getLocalStorage()
    listClients.push(client)
    setLocalStorage(listClients)
}

const isValidFields = () => {
    return form.reportValidity()
}

// Layout Interact

const openModal = () => {
    modal.style.display = "block";
    article.classList.toggle("active");
    header.classList.toggle("active");
}

const closeModal = () => {
    clearFields();
    modal.style.display = "none";
    article.classList.toggle("active");
    header.classList.toggle("active");
}

clearFields = () => {
    fields.forEach((field) => field.value = "")
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            name: clientName.value,
            cpf: clientCpf.value,
            telephone: clientTel.value,
            email: clientEmail.value,
            city: clientCity.value,
            value: clientValue.value,
            date: clientDate.value
        }
        const index = document.querySelector(".name").dataset.index;
        if (index == "new") {
            createClient(client);
            updateTable();
            closeModal();
        } else {
            updateClient(index, client);
            updateTable();
            closeModal();
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${client.name}</td>
    <td>${client.cpf}</td>
    <td>${client.telephone}</td>
    <td>${client.email}</td>
    <td>${client.city}</td>
    <td>R$ ${client.value}</td>
    <td>${client.date}</td>
    <td>
        <button class="edit__client" type="button" data-action="edit-${index}">Editar</button> |
        <button class="delete__client" type="button" data-action="delete-${index}">Excluir</button>
    </td>
 `
    const tableClient = document.querySelector("#clients__table>tbody");
    tableClient.appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll("#clients__table>tbody tr");
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const listClients = readClient();
    clearTable();
    listClients.forEach(createRow);
}

const fillFields = (client) => {
    clientName.value = client.name
    clientCpf.value = client.cpf
    clientTel.value = client.telephone
    clientEmail.value = client.email
    clientCity.value = client.city
    clientValue.value = client.value
    clientDate.value = client.date
    clientName.dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    openModal()
}

const editDelete = (e) => {
    if (e.target.type == "button") {
        const [action, index] = e.target.dataset.action.split("-")

        if (action == "edit") {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir os dados de ${client.name}?`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }

    }
}

updateTable();

// Eventos

newClient.addEventListener("click", openModal);

saveBtn.addEventListener("click", saveClient);

closeBtn.addEventListener("click", closeModal);

tableBtn.addEventListener("click", editDelete);