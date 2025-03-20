class AddressBookContact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        // Validation before assignment
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateAddress(address, "Address");
        this.city = this.validateAddress(city, "City");
        this.state = this.validateAddress(state, "State");
        this.zip = this.validateZip(zip);
        this.phone = this.validatePhone(phone);
        this.email = this.validateEmail(email);
    }

    // Validate Name (First and Last)
    validateName(name, fieldName) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
        if (!namePattern.test(name)) {
            throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
        }
        return name;
    }

    // Validate Address, City, and State
    validateAddress(value, fieldName) {
        if (value.length < 4) {
            throw new Error(`${fieldName} must have at least 4 characters.`);
        }
        return value;
    }

    // Validate Zip Code (Numeric, 6 digits)
    validateZip(zip) {
        const zipPattern = /^[1-9][0-9]{5}$/;
        if (!zipPattern.test(zip)) {
            throw new Error("Invalid ZIP code. It must be a 6-digit number.");
        }
        return zip;
    }

    // Validate Phone Number (Country Code + 10 digits)
    validatePhone(phone) {
        const phonePattern = /^[6-9][0-9]{9}$/;
        if (!phonePattern.test(phone)) {
            throw new Error("Invalid phone number. It must be 10 digits starting with 6-9.");
        }
        return phone;
    }

    // Validate Email
    validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            throw new Error("Invalid email format.");
        }
        return email;
    }

    // Display Contact Details
    displayContact() {
        return `
        Name: ${this.firstName} ${this.lastName}
        Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}
        Phone: ${this.phone}
        Email: ${this.email}`;
    }
}

// ✅ Example Usage with Valid Data
try {
    const contact1 = new AddressBookContact(
        "Samridhi", "Singh", "123 Street", "Orai", "Uttar Pradesh",
        "250002", "9876543210", "samridhi@example.com"
    );
    console.log(contact1.displayContact());
} catch (error) {
    console.error("❌ Error:", error.message);
}

