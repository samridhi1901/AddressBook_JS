class AddressBookContact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateAddress(address, "Address");
        this.city = this.validateAddress(city, "City");
        this.state = this.validateAddress(state, "State");
        this.zip = this.validateZip(zip);
        this.phone = this.validatePhone(phone);
        this.email = this.validateEmail(email);
    }

    validateName(name, fieldName) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
        if (!namePattern.test(name)) {
            throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
        }
        return name;
    }

    validateAddress(value, fieldName) {
        if (value.length < 4) {
            throw new Error(`${fieldName} must have at least 4 characters.`);
        }
        return value;
    }

    validateZip(zip) {
        const zipPattern = /^[1-9][0-9]{5}$/;
        if (!zipPattern.test(zip)) {
            throw new Error("Invalid ZIP code. It must be a 6-digit number.");
        }
        return zip;
    }

    validatePhone(phone) {
        const phonePattern = /^[6-9][0-9]{9}$/;
        if (!phonePattern.test(phone)) {
            throw new Error("Invalid phone number. It must be 10 digits starting with 6-9.");
        }
        return phone;
    }

    validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            throw new Error("Invalid email format.");
        }
        return email;
    }

    displayContact() {
        return `${this.firstName} ${this.lastName} | ${this.address}, ${this.city}, ${this.state} - ${this.zip} | 📞 ${this.phone} | ✉️ ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        let isDuplicate = this.contacts
            .filter(c => c.firstName.toLowerCase() === contact.firstName.toLowerCase() &&
                         c.lastName.toLowerCase() === contact.lastName.toLowerCase())
            .length > 0;

        if (isDuplicate) {
            console.log(`❌ Contact '${contact.firstName} ${contact.lastName}' already exists!`);
            return;
        }

        this.contacts.push(contact);
        console.log("✅ Contact added successfully!");
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("📂 Address Book is empty!");
            return;
        }
        console.log(`📜 Address Book Contacts (Total: ${this.contacts.length})`);
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.displayContact()}`);
        });
    }

    viewPersonsByCity() {
        let groupedByCity = this.contacts.reduce((acc, contact) => {
            if (!acc[contact.city]) acc[contact.city] = [];
            acc[contact.city].push(contact.displayContact());
            return acc;
        }, {});

        console.log("\n🏙️ Persons Grouped by City:");
        Object.entries(groupedByCity).forEach(([city, persons]) => {
            console.log(`📌 ${city}:`);
            persons.map(person => console.log(`   - ${person}`));
        });
    }

    viewPersonsByState() {
        let groupedByState = this.contacts.reduce((acc, contact) => {
            if (!acc[contact.state]) acc[contact.state] = [];
            acc[contact.state].push(contact.displayContact());
            return acc;
        }, {});

        console.log("\n🗺️ Persons Grouped by State:");
        Object.entries(groupedByState).forEach(([state, persons]) => {
            console.log(`📌 ${state}:`);
            persons.map(person => console.log(`   - ${person}`));
        });
    }
}

// ✅ Example Usage
try {
    let addressBook = new AddressBook();

    let contact1 = new AddressBookContact(
        "Samridhi", "Singh", "123 Street", "Orai", "Uttar Pradesh",
        "250002", "9876543210", "samridhi@example.com"
    );

    let contact2 = new AddressBookContact(
        "John", "Doe", "456 Avenue", "Delhi", "Delhi",
        "110001", "9988776655", "john.doe@example.com"
    );

    let contact3 = new AddressBookContact(
        "Amit", "Sharma", "789 Lane", "Orai", "Uttar Pradesh",
        "400001", "9123456789", "amit.sharma@example.com"
    );

    let contact4 = new AddressBookContact(
        "Neha", "Verma", "101 Block", "Lucknow", "Uttar Pradesh",
        "226001", "9321456789", "neha.verma@example.com"
    );

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);
    addressBook.addContact(contact4);

    // Display all contacts
    console.log("\n📖 Displaying All Contacts:");
    addressBook.displayContacts();

    // View persons grouped by city
    console.log("\n📊 Viewing Persons Grouped by City:");
    addressBook.viewPersonsByCity();

    // View persons grouped by state
    console.log("\n📊 Viewing Persons Grouped by State:");
    addressBook.viewPersonsByState();

} catch (error) {
    console.error("❌ Error:", error.message);
}
