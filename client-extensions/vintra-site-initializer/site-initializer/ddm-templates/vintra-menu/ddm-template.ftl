<#-- Vintra - Menu principal (Widget Display Template para Navigation Menu) -->
<style>
	.vt-nav{position:sticky;top:0;z-index:100;background:#fff;border-bottom:1px solid rgba(15,23,42,.08)}
	.vt-nav__inner{display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:1200px;margin:0 auto;padding:0 24px;min-height:72px}
	.vt-nav__logo{font-weight:800;font-size:1.5rem;letter-spacing:-.02em;text-decoration:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}
	.vt-nav__list,.vt-nav__sub{list-style:none;margin:0;padding:0}
	.vt-nav__list{display:flex;align-items:center;gap:4px}
	.vt-nav__item{position:relative}
	.vt-nav__link{display:block;padding:10px 14px;border-radius:8px;color:#0f172a;font-weight:500;text-decoration:none}
	.vt-nav__link:hover,.vt-nav__item.is-selected>.vt-nav__link{background:rgba(99,102,241,.08);color:#6366f1}
	.vt-nav__sub{position:absolute;top:100%;left:0;min-width:220px;padding:8px;background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,.12);opacity:0;visibility:hidden;transform:translateY(4px);transition:all .15s ease}
	.vt-nav__item:hover>.vt-nav__sub,.vt-nav__item:focus-within>.vt-nav__sub{opacity:1;visibility:visible;transform:none}
	.vt-nav__cta{padding:10px 20px;border-radius:999px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-weight:600;text-decoration:none}
	.vt-nav__toggle{display:none;background:none;border:0;font-size:1.5rem;cursor:pointer}
	@media (max-width:900px){
		.vt-nav__toggle{display:block}
		.vt-nav__panel{display:none;position:absolute;top:100%;left:0;right:0;background:#fff;padding:16px 24px;border-bottom:1px solid rgba(15,23,42,.08)}
		.vt-nav.is-open .vt-nav__panel{display:block}
		.vt-nav__list{flex-direction:column;align-items:stretch}
		.vt-nav__sub{position:static;opacity:1;visibility:visible;transform:none;box-shadow:none;border:0;padding:0 0 0 16px}
	}
</style>

<#if entries?has_content>
	<nav aria-label="Principal" class="vt-nav" id="vtNav">
		<div class="vt-nav__inner">
			<a class="vt-nav__logo" href="${themeDisplay.getPathFriendlyURLPublic()}${themeDisplay.getScopeGroup().getFriendlyURL()}">Vintra</a>

			<button aria-controls="vtNavPanel" aria-expanded="false" aria-label="Abrir menu" class="vt-nav__toggle" onclick="var n=document.getElementById('vtNav');var o=n.classList.toggle('is-open');this.setAttribute('aria-expanded',o);" type="button">&#9776;</button>

			<div class="vt-nav__panel" id="vtNavPanel">
				<ul class="vt-nav__list">
					<#list entries as entry>
						<li class="vt-nav__item <#if entry.isSelected() || entry.isChildSelected()>is-selected</#if>">
							<a class="vt-nav__link" href="${entry.getURL()}" ${entry.getTarget()}>${entry.getName()}</a>

							<#if entry.hasBrowsableChildren()>
								<ul class="vt-nav__sub">
									<#list entry.getBrowsableChildren() as child>
										<li class="vt-nav__item <#if child.isSelected()>is-selected</#if>">
											<a class="vt-nav__link" href="${child.getURL()}" ${child.getTarget()}>${child.getName()}</a>
										</li>
									</#list>
								</ul>
							</#if>
						</li>
					</#list>
				</ul>
			</div>
		</div>
	</nav>
</#if>
