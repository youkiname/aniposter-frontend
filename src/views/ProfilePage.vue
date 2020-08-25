<template>
	<div class="article-wrap">
		<h3 v-if="userDataLoading">Загрузка...</h3>
		<div v-else-if='userData != null'>
			<h1>{{ userData.first_name }} {{ userData.last_name }}</h1>
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
			<h4>Медали: </h4>
			<p>Получено: {{ userData.medals }}</p>
		</div>
		<p v-else>Не удалось загрузить данные пользователя.</p>
		<h3 class="text-center">Недавние посты</h3>
		<div v-if="lastPostsLoading" class="text-center">
			<div class="spinner-border text-success" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		
		<div v-else-if='lastPosts.length > 0'>
			<post-preview
			v-for="post in lastPosts"
			:post-data="post"
			:key="post._id"
			></post-preview>
		</div>
		<p v-else>Тут пока что ничего нет ╮(︶▽︶)╭</p>
	</div>
</template>

<script>
import axios from 'axios'
import PostPreview from '@/components/PostPreview'

export default {
name: 'ProfilePage',
data: () => ({
	userData: null,
	userDataLoading: true,
	lastPosts: [],
	lastPostsLoading: true
}),
computed: {
	profileUserId() { return parseInt(this.$route.params.user_id)}
},
created() {
	this.loadUserData();
	this.loadLastPosts();
},
methods: {
	loadUserData() {
		axios.get(this.$API_URL + "getFullUserData/?id="+this.profileUserId)
		.then(response => {
			this.userData = response.data;
			this.userDataLoading = false;
		})
		.catch(e => {
			this.userDataLoading = false;
			if (e.response.data.description) {
				console.log(e + '\n' + e.response.data.description);
			} else {
				console.log(e);
			}
		});
	},
	loadLastPosts() {
		axios.get(this.$API_URL + "getLastPosts/?user_id="+this.profileUserId)
		.then(response => {
			this.lastPosts = response.data;
			this.lastPostsLoading = false;
		})
		.catch(e => {
			this.lastPostsLoading = false;
			if (e.response.data.description) {
				console.log(e + '\n' + e.response.data.description);
			} else {
				console.log(e);
			}
		});
	},
},
components: {
	PostPreview
}
}
</script>

<style>

</style>
