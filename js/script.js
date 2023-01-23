const newClient = document.querySelector(".new__client");
const modal = document.querySelector(".modal");
const tableClient = document.querySelector("#clients__table>tbody");

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

const closeModal = () => {
    clearFields();
    modal.style.display = "none";
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
        createClient(client);
        closeModal();
    }
}

const createRow = (client) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${client.name}</td>
    <td>${client.cpf}</td>
    <td>${client.telephone}</td>
    <td>${client.email}</td>
    <td>${client.city}/td>
    <td>${client.value}</td>
    <td>${client.date}</td>
    <td>
        <button class="edit__client">Editar</button> |
        <button class="delete__client">Excluir</button>
    </td>
 `
    tableClient.appendChild(newRow);
}

const updatTable = () => {
    const listClients = readClient();
    listClients.forEach(createRow);
}

updatTable()

// Eventos

newClient.addEventListener("click", () => {
    modal.style.display = "block"
});

saveBtn.addEventListener("click", saveClient)

closeBtn.addEventListener("click", closeModal);