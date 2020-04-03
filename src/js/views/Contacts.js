import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false,
		contactId: null
	});

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<select
						name="agenda"
						className="form-control mt-5"
						onChange={actions.handleChangeAgenda}
						value={store.agenda}>
						<option value={null}>SELECCIONE</option>
						{!!store.agendas &&
							store.agendas.map((agenda, i) => {
								return (
									<option value={agenda} key={i}>
										{agenda}
									</option>
								);
							})}
					</select>
					<br />
					<button className="btn btn-primary btn-block" onClick={actions.loadContactByAgenda}>
						Load Contacts
					</button>
				</div>
			</div>
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{!!store.contacts &&
							store.contacts.map((contact, i) => {
								return (
									<ContactCard
										key={i}
										onDelete={() => setState({ showModal: true, contactId: contact.id })}
										contact={contact}
									/>
								);
							})}
					</ul>
				</div>
			</div>
			<Modal
				contactId={state.contactId}
				show={state.showModal}
				onClose={() => setState({ showModal: false, contactId: null })}
			/>
		</div>
	);
};
