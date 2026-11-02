/**
 * Vintra - Contato
 * Sem endpoint: valida e mostra a mensagem de sucesso (modo demonstração).
 * Com endpoint: envia os campos em JSON via fetch, com o token CSRF do
 * Liferay (compatível com a API headless de Objetos, ex.: /o/c/contatos).
 */
(function () {
	var form = fragmentElement.querySelector('.vt-contact__form');

	if (!form || form.getAttribute('data-layout-mode') === 'edit') {
		return;
	}

	var success = fragmentElement.querySelector('.vt-contact__success');
	var error = form.querySelector('.vt-form-error');
	var submit = form.querySelector('.vt-contact__submit');
	var again = fragmentElement.querySelector('.vt-contact__again');
	var endpoint = form.getAttribute('data-endpoint');

	function showSuccess(show) {
		form.hidden = show;
		success.hidden = !show;
	}

	function send() {
		if (!endpoint) {
			return Promise.resolve();
		}

		var data = {};

		new FormData(form).forEach(function (value, key) {
			data[key] = value;
		});

		var headers = {'Content-Type': 'application/json'};

		if (window.Liferay && Liferay.authToken) {
			headers['x-csrf-token'] = Liferay.authToken;
		}

		return fetch(endpoint, {
			body: JSON.stringify(data),
			credentials: 'include',
			headers: headers,
			method: 'POST'
		}).then(function (response) {
			if (!response.ok) {
				throw new Error('HTTP ' + response.status);
			}
		});
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		if (!form.reportValidity()) {
			return;
		}

		error.hidden = true;
		submit.disabled = true;

		send()
			.then(function () {
				form.reset();
				showSuccess(true);
			})
			.catch(function () {
				error.hidden = false;
			})
			.finally(function () {
				submit.disabled = false;
			});
	});

	again.addEventListener('click', function () {
		showSuccess(false);
	});
})();
