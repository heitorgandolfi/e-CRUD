const newClient = document.querySelector(".new__client");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector(".cancel");



const tempClients = {
    name: "Heitor",
    CPF: "46729111879",
    telephone: "16991290513",
    email: "heitor@gmail.com",
    city: "Ribeirão Preto",
    value: 450,
    date: "15/12/12"
}

const createClient = (client) => {
    const listClients = JSON.parse(localStorage.getItem("client"));
    listClients.push(client);
    localStorage.setItem("client", JSON.stringify(listClients));
}

// Eventos

newClient.addEventListener("click", () => {
    modal.style.display = "block"
})

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none"
})