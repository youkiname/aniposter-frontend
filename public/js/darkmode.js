let timerId = setTimeout(function(){
    (function () {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-dark');
            switch1.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            setTheme('theme-light');
            switch1.innerHTML = '<i class="fas fa-moon"></i>';
        }
    })();
}, 10);

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        document.getElementById('switch1').innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        setTheme('theme-dark');
        document.getElementById('switch1').innerHTML = '<i class="fas fa-sun"></i>';
    }
}