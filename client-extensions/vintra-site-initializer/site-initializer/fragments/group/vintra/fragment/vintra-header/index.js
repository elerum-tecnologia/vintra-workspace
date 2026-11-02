/**
 * Vintra - Cabeçalho
 *  - abre/fecha o menu móvel;
 *  - abre submenus pelo botão de seta (teclado/toque) no desktop;
 *  - aplica "is-scrolled" ao rolar (borda + fundo mais opaco);
 *  - deixa o cabeçalho fixo no topo. O Liferay envolve cada fragmento em
 *    wrappers da mesma altura, o que anula um "position: sticky" direto no
 *    <header>; por isso o sticky é aplicado ao wrapper mais externo que
 *    ainda tem a altura do cabeçalho.
 *
 * `fragmentElement` é fornecido pelo Liferay.
 */
(function () {
	var header = fragmentElement.querySelector('[data-vt-header]');

	if (!header) {
		return;
	}

	var isEditMode = header.getAttribute('data-layout-mode') === 'edit';
	var burger = header.querySelector('.vt-header__burger');

	function setOpen(open) {
		header.classList.toggle('is-open', open);

		if (burger) {
			burger.setAttribute('aria-expanded', String(open));
			burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
		}
	}

	if (burger) {
		burger.addEventListener('click', function () {
			setOpen(!header.classList.contains('is-open'));
		});
	}

	header.querySelectorAll('.vt-nav__toggle').forEach(function (toggle) {
		toggle.addEventListener('click', function () {
			var item = toggle.closest('.vt-nav__item');
			var open = !item.classList.contains('is-open');

			header.querySelectorAll('.vt-nav__item.is-open').forEach(function (other) {
				other.classList.remove('is-open');
				other.querySelector('.vt-nav__toggle').setAttribute('aria-expanded', 'false');
			});

			item.classList.toggle('is-open', open);
			toggle.setAttribute('aria-expanded', String(open));
		});
	});

	document.addEventListener('click', function (event) {
		if (!header.contains(event.target)) {
			header.querySelectorAll('.vt-nav__item.is-open').forEach(function (item) {
				item.classList.remove('is-open');
			});
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			setOpen(false);
		}
	});

	window.matchMedia('(min-width: 1024px)').addEventListener('change', function (event) {
		if (event.matches) {
			setOpen(false);
		}
	});

	function onScroll() {
		header.classList.toggle('is-scrolled', window.scrollY > 8);
	}

	onScroll();
	window.addEventListener('scroll', onScroll, {passive: true});

	if (isEditMode || header.getAttribute('data-sticky') !== 'true') {
		return;
	}

	function findStickyTarget() {
		var node = header;

		while (node.parentElement && node.parentElement !== document.body) {
			var parent = node.parentElement;

			if (parent.offsetHeight > node.offsetHeight + 2) {
				break;
			}

			node = parent;
		}

		return node;
	}

	function controlMenuOffset() {
		var controlMenu = document.querySelector('.control-menu-container');

		if (!controlMenu) {
			return 0;
		}

		var position = window.getComputedStyle(controlMenu).position;

		return position === 'sticky' || position === 'fixed' ? controlMenu.offsetHeight : 0;
	}

	var target = findStickyTarget();

	target.style.position = 'sticky';
	target.style.top = controlMenuOffset() + 'px';
	target.style.zIndex = '50';
})();
