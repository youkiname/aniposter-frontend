<template>
	<div class="card mx-auto" style="max-width: 30rem;">
		<div class="card-body">
			<div class="d-flex justify-content-between">
				<p class="card-subtitle mb-2 text-muted">{{ postData.type }}</p>
				<p class="card-subtitle mb-2 text-muted">{{ createdDate }}</p>
			</div>
			
			
			<img v-if='postData.file_name' class="card-img-top" :src="'https://aniposter.net/static/images/' + postData.file_name" alt="Post preview image">
			<h6 v-else class="card-subtitle mb-2 text-muted">Нет изображения</h6>
			<p class="card-text" v-html="postData.text"></p>
			<h6 class="card-subtitle mb-2 text-muted">Рейтинг: {{ postData.rating }}</h6>
			<a :href="'https://t.me/c/1267720962/' + postData._id" class="card-link">Telegram</a>
			<router-link :to="{ name: 'Post', params: { post_id: postData._id }}" class="card-link">Комментарии</router-link>

		</div>
	</div>
</template>

<script>
export default {
	name: "PostPreview",
	props: {
		postData: {
			type: Object,
			required: true
		}
	},
	computed: {
		createdDate() {
			let date = new Date();
			date.setTime(this.postData.created_on * 1000);
			return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
		}
	},
}
</script>
