function saveToLocalStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function getFromLocalStorage() {
  const contactsString = localStorage.getItem("contacts");
  return contactsString ? JSON.parse(contactsString) : [];
}
function renderContacts() {
  const contactTable = document.querySelector("#contactTable");
  console.log(contactTable);
  const body = document.querySelector("body");
  console.log(contactTable);
  contactTable.innerHTML = "";
  const contacts = getFromLocalStorage();
  contacts.forEach((contact) => {
    const row = document.createElement("th");
    console.log(row);
    row.innerHTML += `
                <td>First name: ${contact.firstName} 
                Last name: ${contact.lastName}</td>
                <td> Phone: ${contact.phone}</td>
                <td>Photo: <img src="${contact.photo}" class="contact-icon" alt="Contact Photo"></td>
                <td>
                    <button onclick="editContact(${contact.id})" class="btn-edit">Edit</button>
                    <button onclick="deleteContact(${contact.id})" class="btn-delete">Delete</button>
                </td>
            `;
    contactTable.appendChild(row);
  });
}
function addContact(firstName, lastName, phone, photo) {
  const contacts = getFromLocalStorage();
  const newContact = {
    id: Date.now(),
    firstName,
    lastName,
    phone,
    photo,
  };
  contacts.push(newContact);
  saveToLocalStorage(contacts);
  renderContacts();
}

function editContact(id) {}

function deleteContact(id) {
  const contacts = getFromLocalStorage();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  saveToLocalStorage(updatedContacts);
  renderContacts();
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const photo = document.getElementById("photo").value;
    addContact(firstName, lastName, phone, photo);
    document.getElementById("contactForm").reset();
    renderContacts();
  });
