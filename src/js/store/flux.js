const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			apiURL: "https://assets.breatheco.de/apis/fake/contact",
			agendas: null,
			agenda: null,
			contacts: null,
			contact: null
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			handleChangeAgenda: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value ? value : null
				});
			},
			getAgendas: url => {
				const store = getStore();
				fetch(store.apiURL + url)
					.then(resp => resp.json())
					.then(data => {
						setStore({
							agendas: data
						});
					});
			},
			loadContactByAgenda: () => {
				const store = getStore();
				if (store.agenda !== null) {
					fetch(store.apiURL + "/agenda/" + store.agenda)
						.then(resp => resp.json())
						.then(data => {
							setStore({
								contacts: data
							});
						});
				} else {
					alert("Debe seleccionar una aganda");
				}
			},
			addContact: data => {
				const store = getStore();
				fetch(store.apiURL + "/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadContactByAgenda();
					});
			},
			editContact: (url, data) => {
				const store = getStore();
				fetch(store.apiURL + url, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadContactByAgenda();
					});
			},
			deleteContact: url => {
				const store = getStore();
				fetch(store.apiURL + url, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadContactByAgenda();
					});
			}
		}
	};
};

export default getState;
