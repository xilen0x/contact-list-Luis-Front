import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const { store, actions } = useContext(Context);
	const [contact, setContact] = useState({
		full_name: "",
		email: "",
		agenda_slug: store.agenda,
		address: "",
		phone: ""
	});

	useEffect(() => {}, []);

	const handleChange = e => {
		const { name, value } = e.target;
		setContact({ ...contact, [name]: value });
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new Contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							name="full_name"
							className="form-control"
							placeholder="Full Name"
							value={contact.full_name}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							className="form-control"
							placeholder="Enter email"
							value={contact.email}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Agenda</label>
						<input
							type="text"
							name="agenda_slug"
							className="form-control"
							placeholder="Enter email"
							value={contact.agenda_slug}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							name="phone"
							className="form-control"
							placeholder="Enter phone"
							value={contact.phone}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							name="address"
							className="form-control"
							placeholder="Enter address"
							value={contact.address}
							onChange={handleChange}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							actions.addContact(contact);
						}}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
