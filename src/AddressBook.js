class AddressBookContact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    toString() {
        return `${this.firstName} ${this.lastName} | ${this.address}, ${this.city}, ${this.state} - ${this.zip} | Phone: ${this.phone} | Email: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        let isDuplicate = this.contacts.some(c => c.getFullName().toLowerCase() === contact.getFullName().toLowerCase());

        if (isDuplicate) {
            console.log(`Contact '${contact.getFullName()}' already exists!`);
            return;
        }

        this.contacts.push(contact);
        console.log("Contact added successfully!");
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("Address Book is empty!");
            return;
        }
        console.log("\nAddress Book Contacts:");
        this.contacts.forEach(contact => console.log(contact.toString()));
    }

    sortContactsBy(field) {
        if (!["city", "state", "zip"].includes(field)) {
            console.log("Invalid sorting field. Choose 'city', 'state', or 'zip'.");
            return;
        }

        this.contacts.sort((a, b) => a[field].localeCompare(b[field]));
        console.log(`\nContacts Sorted by ${field.charAt(0).toUpperCase() + field.slice(1)}:`);
        this.displayContacts();
    }

    findContactsByCity(city) {
        return this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());
    }

    findContactsByState(state) {
        return this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());
    }

    countContactsByCity() {
        return this.contacts.reduce((acc, contact) => {
            acc[contact.city] = (acc[contact.city] || 0) + 1;
            return acc;
        }, {});
    }

    countContactsByState() {
        return this.contacts.reduce((acc, contact) => {
            acc[contact.state] = (acc[contact.state] || 0) + 1;
            return acc;
        }, {});
    }
}

// Example Usage
let addressBook = new AddressBook();

let contact1 = new AddressBookContact("Samridhi", "Singh", "123 Street", "Orai", "Uttar Pradesh", "250002", "9876543210", "samridhi@example.com");
let contact2 = new AddressBookContact("John", "Doe", "456 Avenue", "Delhi", "Delhi", "110001", "9988776655", "john.doe@example.com");
let contact3 = new AddressBookContact("Jane", "Doe", "789 Road", "Orai", "Uttar Pradesh", "250003", "9123456789", "jane.doe@example.com");
let contact4 = new AddressBookContact("Alice", "Brown", "321 Street", "Mumbai", "Maharashtra", "400001", "9234567890", "alice.brown@example.com");

addressBook.addContact(contact1);
addressBook.addContact(contact2);
addressBook.addContact(contact3);
addressBook.addContact(contact4);

addressBook.displayContacts();

addressBook.sortContactsBy("city");
addressBook.sortContactsBy("state");
addressBook.sortContactsBy("zip");
