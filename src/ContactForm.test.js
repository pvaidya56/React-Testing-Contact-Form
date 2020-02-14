import React from "react";
import ContactForm from "./components/ContactForm";
import { render, fireEvent, waitForElement } from "@testing-library/react";
// test("firstName, lastName, email, message inputs are rendered", () => {
//     const { getByLabelText } = render(<ContactForm />);
// 	getByLabelText(/first name/i);
// 	getByLabelText(/last name/i);
// 	getByLabelText(/email/i);
// 	getByLabelText(/message/i);
// });
test("all input fields are rendered and functional", async () => {
	const { getByLabelText, getByTestId, getByText, queryByTestId } = render(
		<ContactForm />
	);
	const firstNameInput = getByLabelText(/first name/i);
	const lastNameInput = getByLabelText(/last name/i);
	const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
    
	fireEvent.change(firstNameInput, { target: { value: "Test First Name" } });
	fireEvent.change(lastNameInput, { target: { value: "Test Last Name" } });
	fireEvent.change(emailInput, { target: { value: "TestEmail@email.com" } });
    fireEvent.change(messageInput, { target: { value: "Test Message" } });
    
	expect(firstNameInput.value).toBe("Test First Name");
	expect(lastNameInput.value).toBe("Test Last Name");
	expect(emailInput.value).toBe("TestEmail@email.com");
	expect(messageInput.value).toBe("Test Message");
    expect(emailInput).toHaveAttribute("placeholder");
    
	// expect(firstNameInput).not.toHaveAttribute("maxLength");
    
    fireEvent.click(getByTestId("submit-button"));
    // getByText("Looks like there was an error: maxLength");
    
	await waitForElement(() =>
		getByText("Looks like there was an error: maxLength")
	);
	expect(queryByTestId("submit-data")).toBeFalsy();
});
// name max length