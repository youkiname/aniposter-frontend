<template>
	<div id="app">
		<header>
			<nav class="navbar px-5">
				<router-link to="/" class="navbar-brand">
						<img src="/small-logo.png" width="30" height="30" class="d-inline-block align-top" alt="logo" loading="lazy">
						AniPoster
				</router-link>


				<span id="switch1" onclick="toggleTheme()" class="cursor-pointer">
						<i class="fas fa-moon"></i>
				</span>
				</nav>
		</header>
		
		<router-view/>

		<footer class="footer py-3">
				<div class="container-fluid text-center">
					<span class="text-muted">design by <a href="https://t.me/tw33nk/">Tweenk</a>, works by <a href="https://t.me/tolaptik/">Youki</a> with <i class="fa fa-heart pulse text-danger"></i></span>
				</div>
		</footer>

	</div>
</template>

<style>
</style>
