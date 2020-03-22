document.body.innerHTML = document.body.innerHTML.replace(/import "([^"]+)"/, 'import "<a href="https://$1">$1</a>"')


function pkg_go_dev () {
	var import_path_el = document.querySelector('.DetailsHeader-breadcrumbCurrent');

	var link_el = document.createElement('a');
	link_el.textContent = import_path_el.textContent;
	link_el.href = 'https://' + import_path_el.textContent;

	var parent_el = import_path_el.parentNode;
	parent_el.removeChild(import_path_el);
	parent_el.prepend(link_el);
}


function github () {
	var languages = document.querySelectorAll('.repository-lang-stats-numbers .lang');

	for (var i = 0; i < languages.length; i++) {
		if (languages[i].textContent === 'Go') {
			console.log('found');
			break;
		}
	}
}
