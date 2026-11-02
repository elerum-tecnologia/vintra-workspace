/**
 * Vintra - Perguntas frequentes
 * Acordeão: abre uma pergunta por vez (igual ao original).
 * No editor do Liferay o acordeão fica desligado (tudo aberto).
 */
(function () {
	var root = fragmentElement.querySelector('[data-vt-faq]');

	if (!root || root.getAttribute('data-layout-mode') === 'edit') {
		return;
	}

	var items = Array.prototype.slice.call(fragmentElement.querySelectorAll('.vt-faq__item'));

	function setOpen(item, open) {
		item.classList.toggle('is-open', open);
		item.querySelector('.vt-faq__button').setAttribute('aria-expanded', String(open));
		item.querySelector('.vt-faq__panel').hidden = !open;
	}

	items.forEach(function (item) {
		item.querySelector('.vt-faq__button').addEventListener('click', function () {
			var open = !item.classList.contains('is-open');

			items.forEach(function (other) {
				setOpen(other, false);
			});

			setOpen(item, open);
		});
	});
})();
