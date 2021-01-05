<template>
	<div class="article-wrap">
		<h2>Админочка</h2>
		<h5>Пользователь:</h5>
		<h3 v-if="userDataLoading">Загрузка...</h3>
		<div v-else-if='userData != null'>
			<h3>{{ userData.first_name }} {{ userData.last_name }}</h3>
			<a v-if="userData.username != null" :href="'https://t.me/' + userData.username">Telegram</a>
			<hr>
			<h4>Количество постов</h4>
			<p>Ani Poster: {{ userData.post_count }}</p>
			<p>Hentai Poster: {{ userData.hpost_count }}</p>
			<h4>Оценки</h4>
			<p>Лайки: {{ userData.like_count }}</p>
			<p>Дизлайки: {{ userData.dislike_count }}</p>
			<h4>Постов дня: {{ userData.best_day_count }}</h4>
			<h4>Рейтинг: {{ userData.rating }}</h4>
			<button class="btn btn-outline-secondary btn-sm" 
			@click="increaseRating100">+100 рейтинг</button>
			<button class="btn btn-outline-secondary btn-sm" 
			@click="decreaseRating100">-100 рейтинг</button>
			<input v-model="ratingOffest" type="number" placeholder="Введи рейтинг">
			<button class="btn btn-outline-secondary btn-sm" 
			@click="changeRating">Изменить рейтинг</button>
			<h4>Бонусы: {{ userData.bonuses }}</h4>
			<button class="btn btn-outline-secondary btn-sm" 
			@click="increaseBonus">+1 бонус</button>
			<button class="btn btn-outline-secondary btn-sm" 
			@click="decreaseBonus">-1 бонус</button>
			<h4>Медали: </h4>
			<p>Получено: {{ userData.medals }}</p>
		</div>
		<p v-else>Не удалось загрузить данные пользователя.</p>
	</div>
</template>

<script>
import axios from 'axios'
import {authHeaders, currentUser} from '@/user.js'

export default {
name: 'UserControlPanel',
data: () => ({
	userData: null,
	userDataLoading: true,
	ratingOffest: 0
}),
computed: {
	profileUserId() {
		let parsed = parseInt(this.$route.params.user_id);
		if (isNaN(parsed)) {
			return this.$route.params.user_id  // maybe its string username
		}
		return parsed
	}
},
beforeCreate() {
	// TODO currentUser may be null.
	if (!currentUser.is_admin) {
		window.location.replace("https://aniposter.net/not-found/");
	}
},
created() {
	this.loadUserData();
},
methods: {
	loadUserData() {
		let apiLink = "";
		if (Number.isInteger(this.profileUserId)) {
			apiLink = this.$API_URL + "getFullUserData/?id="+this.profileUserId;
		} else {
			apiLink = this.$API_URL + "getFullUserData/?username="+this.profileUserId;
		}
		axios.get(apiLink)
		.then(response => {
			this.userData = response.data;
			this.userDataLoading = false;
		})
		.catch(e => {
			this.userDataLoading = false;
			if (e.response.data.description) {
				console.log(e + '\n' + e.response.data.description);
				alert(e.response.data.description)
			} else {
				console.log(e);
			}
		});
	},
	changeUserData(method, requestData) {
		this.userDataLoading = true;

		axios.put(this.$API_URL + method + '/', requestData, {headers: authHeaders})
		.then(response => {
			this.loadUserData();
			this.userDataLoading = false
			console.log(response.data);
		})
		.catch(e => {
			if (e.response.data.description) {
				console.log(e + '\n' + e.response.data.description);
				alert(e.response.data.description)
			} else {
				console.log(e);
			}
		})
	},
	incUserRating(amount) {
		let requestData = {
			user_id: this.userData['_id'],
			amount: amount
		};
		this.changeUserData("incUserRating", requestData)
	},
	incUserBonuses(amount) {
		let requestData = {
			user_id: this.userData['_id'],
			amount: amount
		};
		this.changeUserData("incUserBonuses", requestData)
	},
	decreaseRating100() {
		this.incUserRating(-100)
	},
	increaseRating100() {
		this.incUserRating(100)
	},
	changeRating() {
		this.incUserRating(parseInt(this.ratingOffest))
	},
	decreaseBonus() {
		this.incUserBonuses(-1)
	},
	increaseBonus() {
		this.incUserBonuses(1)
	},
},
components: {
}
}
</script>

<style>

</style>
