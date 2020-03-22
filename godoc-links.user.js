// ==UserScript==
// @name GoDoc Links
// @description Add GoDoc documentation links to relevant pages
// @namespace com.teddywing
// @version 0.0.1
// @match https://godoc.org/*
// @match https://pkg.go.dev/*
// @match https://github.com/*
// ==/UserScript==

// Copyright (c) 2020  Teddy Wing
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.


function init () {
	switch (window.location.hostname) {
	case 'godoc.org':
		godoc();
	case 'pkg.go.dev':
		pkg_go_dev();
	case 'github.com':
		github();
	}
}

// Make the 'import "..."' package name a link to the package source.
function godoc () {
	document.body.innerHTML = document.body.innerHTML
		.replace(/import "([^"]+)"/, 'import "<a href="https://$1">$1</a>"');
}


function pkg_go_dev () {
	var import_path_el = document.querySelector('.DetailsHeader-breadcrumbCurrent');
	var parent_el = import_path_el.parentNode;

	pkg_go_dev_add_repo_link(parent_el, import_path_el);
	pkg_go_dev_add_godoc_link(parent_el, import_path_el.textContent);
}


// Link the package name in the header to the source repo.
function pkg_go_dev_add_repo_link (container_el, import_path_el) {
	var link_el = document.createElement('a');
	link_el.href = 'https://' + import_path_el.textContent;
	link_el.textContent = import_path_el.textContent;

	container_el.removeChild(import_path_el);
	container_el.prepend(link_el);
}


// Add a link in the header to the GoDoc version of the docs.
function pkg_go_dev_add_godoc_link (container_el, import_path) {
	var link_el = document.createElement('a');
	link_el.href = 'https://godoc.org/' + import_path;
	link_el.textContent = '(GoDoc)';

	container_el.appendChild(link_el);
}


function github () {
	var languages = document.querySelectorAll('.repository-lang-stats-numbers .lang');

	for (var i = 0; i < languages.length; i++) {
		if (languages[i].textContent === 'Go') {
			github_add_godoc_link();

			break;
		}
	}
}


// Add a GoDoc link to the repo name header.
function github_add_godoc_link () {
	var github_repo_header_el = document.querySelector('.pagehead.repohead .flex-wrap')

	var container_el = document.createElement('span');
	container_el.className = 'text-small';
	var link_el = document.createElement('a');
	link_el.href = 'https://godoc.org/' + github_package_name();
	link_el.textContent = '(GoDoc)';

	container_el.appendChild(link_el);
	github_repo_header_el.appendChild(container_el);
}


// Turns:
//
//     https://github.com/google/uuid/blob/master/go.mod
//
// into:
//
//     github.com/google/uuid
function github_package_name () {
	return window.location.href.split('/').slice(2, 5).join('/');
}


init();
