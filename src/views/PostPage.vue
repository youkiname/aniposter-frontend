<template>
<div class="post-page">
	<div class="login-data" v-if="user != null">
	<p>Вы вошли как {{ user.first_name }} {{ user.last_name }}</p>
	</div>
	<div class="jumbotron jumbotron-fluid d-flex justify-content-center">

		<div 
		v-if="!isPostDataLoading && postData != null"
		class="container-fluid row px-1 d-flex justify-content-center">

			<post-media-preview
			:file-names="postData.file_name"
			:post-type="postData.type"
			></post-media-preview>

			<div class="col-sm-12 col-lg-8 text-center">
				<div class="container py-5">
					<h1 class="text-wrap" v-html="postData.text"></h1>
					<p v-if="creatorData != null" class="lead">Автор: 
						<a 
						v-if="false"
						:href="'https://t.me/' + creatorData.username">
						{{ creatorData.first_name }} {{ creatorData.last_name }}
						</a>
					</p>
				</div>
			</div>
			<div class="col-sm-10 col-lg-4 m-2" v-if="medalsCount > 0">
				<img
				v-for="n in medalsCount"
				:key="n"
				style="max-width: 40px;"
				src="/fox-medal.png" alt="Medal image">
			</div>
			<button v-if="bonusesCount > 0"
			class="col-sm-2 col-lg-1 m-1 btn btn-outline-secondary btn-sm" @click="giveMedal">Подарить лисичку</button>
		</div>
		<p v-else-if="isPostDataLoading">Загрузка данных поста...</p>
		<p v-else>Произошла ошибка при загрузке данных поста</p>
	</div>
	<div class="container p-1 rounded shadow mb-5">
		<nav class="navbar navbar-light border rounded">
			<span class="navbar-brand mb-0 h1">
				Комментарии
				<router-link to="/comments-rules" class="custom-btn rounded text-uppercase ml-3">Правила</router-link>
			</span>
		</nav>
		<comment-form
		:post-id="postId"
		@update-list="loadComments"
		></comment-form>
			

		<div class="container-fluid py-5 px-3">
			<span v-if="isCommentsLoadingError">Произошла ошибка при загрузке комментариев.</span>
			<span v-else-if="isCommentsLoading">Загрузка комментариев...</span>
			<span v-else-if="!comments.length">Нет ни одного комментария, будь первым!</span>

			<comment
			v-for="item in comments"
			:key="item.id"
			:comment-data="item"
			@update-list="loadComments">
			</comment>

		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import CommentForm from '@/components/CommentForm'
import Comment from '@/components/Comment'
import PostMediaPreview from '@/components/PostMediaPreview'
import {global_login, global_logout, currentUser, authHeaders} from '@/user.js'

export default {
name: 'PostPage',
data: () => ({
	user: currentUser,
	isCommentsLoading: true,
	isCommentsLoadingError: false,
	isPostDataLoading: true,
	comments: [],
	postData: null,
	creatorData: null,
	medalsCount: 0,
	bonusesCount: 0
}),
computed: {
	postId() { return parseInt(this.$route.params.post_id)}
},
created() {
	this.loadPostData();
	if (this.$route.query.id && this.$route.query.first_name) {
		this.tryLoginFromTelegram();
	}
	this.loadComments();
	this.loadMedals();
	this.loadBonusesCount();
},
methods: {
	tryUpdateUserData() {
	},
	tryLoginFromTelegram() {
		let loginData = this.$route.query;
		axios.post(this.$API_URL + "auth/", loginData)
		.then(response => {
			console.log("LOGIN");
			console.log(response.data);
			global_login(response.data);
		})
		.catch(e => {
			if (e.response.data.description) {
			console.log(e + '\n' + e.response.data.description);
			} else {
			console.log(e);
			}
		});
	},
	loadPostData() {
		axios.get(this.$API_URL + "getPost/?post_id="+this.postId)
		.then(response => {
			this.postData = response.data;
			this.isPostDataLoading = false;
			// this.loadCreatorData();
		})
		.catch(e => {
			if (e.response.status == 404) {
			this.$router.push({name: "NotFound"});
			}
			if (e.response.data.description) {
			this.isPostDataLoading = false;
			console.log(e + '\n' + e.response.data.description);
			} else {
			this.isPostDataLoading = false;
			console.log(e);
			}
		});
	},
	loadCreatorData() {
		axios.get(this.$API_URL + "getUser/?id="+this.postData.creator_id)
		.then(response => {
			this.creatorData = response.data;
		})
		.catch(e => {
			if (e.response.data.description) {
			console.log(e + '\n' + e.response.data.description);
			} else {
			console.log(e);
			}
		});
	},
	loadComments() {
		this.isCommentsLoading = true;
		this.comments = [];
		axios.get(this.$API_URL + "getComments/?post_id=" + this.postId)
		.then(response => {
			this.comments = response.data;
			this.isCommentsLoading = false;
		})
		.catch(e => {
			if (e.response.data.description) {
			this.isCommentsLoadingError = true;
			console.log(e + '\n' + e.response.data.description);
			} else {
			this.isCommentsLoadingError = true;
			console.log(e);
			}
		});
	},
	loadBonusesCount() {
		axios.get(this.$API_URL + "getBonusesCount/?user_id="+this.user.id)
		.then(response => {
			this.bonusesCount = response.data;
		})
		.catch(e => {
			if (e.response.data.description) {
				console.log(e + '\n' + e.response.data.description);
			} else {
				console.log(e);
			}
		});
	},
	loadMedals() {
		axios.get(this.$API_URL + "getMedalsCount/?post_id="+this.postId)
		.then(response => {
			this.medalsCount = response.data;
		})
		.catch(e => {
			if (e.response.data.description) {
			console.log(e + '\n' + e.response.data.description);
			} else {
			console.log(e);
			}
		});
	},
	giveMedal() {
		let data = {
			post_id: this.postId
		};
		axios.post(this.$API_URL + "giveMedal/", data, {headers: authHeaders})
		.then(response => {
			response;
			this.bonusesCount -= 1;
			this.loadMedals();
		})
		.catch(e => {
			if (e.response.data.description) {
				console.log(e + '\n' + e.response.data.description);
				alert("Не удалось выдать медаль. Скорее всего, у вас недостаточно бонусов.")
			} else {
				console.log(e);
			}
		});
	},
	logout() {
		global_logout();
	}
},
components: {
	CommentForm, Comment, PostMediaPreview
}
}
</script>

<style>

</style>
