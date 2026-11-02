/**
 * Vintra - Formulário de acesso
 * Sem endpoint: valida e mostra a mensagem de sucesso (modo demonstração,
 * igual ao original). Com endpoint: envia os campos em JSON via fetch,
 * com o token CSRF do Liferay.
 */
(function () {
	var form = fragmentElement.querySelector('.vt-auth__form');

	if (!form || form.getAttribute('data-layout-mode') === 'edit') {
		return;
	}

	var success = fragmentElement.querySelector('.vt-auth__success');
	var error = form.querySelector('.vt-form-error');
	var submit = form.querySelector('.vt-auth__submit');
	var endpoint = form.getAttribute('data-endpoint');

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
				form.hidden = true;
				success.hidden = false;
			})
			.catch(function () {
				error.hidden = false;
			})
			.finally(function () {
				submit.disabled = false;
			});
	});
})();
