document.body.innerHTML = document.body.innerHTML.replace(/import "([^"]+)"/, 'import "<a href="https://$1">$1</a>"')
