<template>
	<div class="article-wrap" style="text-align: center">
		<h1 class="mb-5">Дневной топ пользователей по рейтингу</h1>
		<div v-if='isLoading' class="text-center">
			<h3>Загрузка...</h3>
			<div class="spinner-border text-success" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<table v-else-if="users.length > 0" class="table">
		<tr><th>#</th><th>Пользователь</th><th>Рейтинг</th></tr>
		<tr v-for="(user, index) in users" :key="index">
			<td>{{ index + 1 }}</td>
			<td><router-link :to="'/u/' + user._id" class="navbar-brand">{{ user.first_name }} {{ user.last_name }}</router-link></td>
			<td>{{ user.rating }}</td>
		</tr>
		</table>
		<h3 v-else>Пока что тут пусто ╮(︶▽︶)╭</h3>
		<hr>
		<p>В таблице отображены 20 пользователей, которые за сегодняшний день заработали больше всего рейтинга. Учитываются лайки и дизлайки, проставленные сегодня, при этом оцениваемый пост мог быть отправлен в любой день.</p>
	</div>
</template>

<script>
import axios from 'axios'
export default {
data: () => ({
	users: [],
	isLoading: true
}),
created() {
	this.loadUsersData();
},

methods: {
	loadUsersData() {
		axios.get(this.$API_URL + "getDailyRatingTop/")
		.then(response => {
			this.users = response.data;
			this.isLoading = false;
		})
		.catch(e => {
			if (e.response.data.description) {
			this.isLoading = false;
				console.log(e + '\n' + e.response.data.description);
			} else {
			this.isLoading = false;
				console.log(e);
			}
		});
	},
}

}
</script>

<style>

</style>

