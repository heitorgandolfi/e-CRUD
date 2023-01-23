const newClient = document.querySelector(".new__client");
const modal = document.querySelector(".modal");

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

const tempClients = {
    name: "Juve",
    CPF: "46729111879",
    telephone: "16991290513",
    email: "heitor@gmail.com",
    city: "Ribeirão Preto",
    value: 450,
    date: "15/12/12"
}

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
    modal.style.display = "none"
}

clearFields = () => {
    fields.forEach((field) => field.value = "")
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            name: clientName.value,
            CPF: clientCpf.value,
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

// Eventos

newClient.addEventListener("click", () => {
    modal.style.display = "block"
});

saveBtn.addEventListener("click", saveClient)

closeBtn.addEventListener("click", closeModal);