<template>
	<div class="input-group mb-1 mt-3 px-3">
        <textarea type="text" rows="1" class="form-control py-1 rounded border shadow" 
        autofocus 
        style="min-height: 50px"
        :placeholder="placeholder"
		v-model.trim="commentText"
        ></textarea>
        <button class="ml-3 px-3 btn btn-send shadow border"
		@click="sendComment"
        ><i class="fas fa-paper-plane"></i></button>
    </div>
</template>

<script>
import axios from 'axios'
import {authHeaders, currentUser} from '@/user.js'

export default {
	name: 'CommentForm',
	props: {
		replyData: Object,
		postId: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			commentText: "",
			user: currentUser,
			placeholder: "Написать комментарий..."
		};
	},
	created() {
		if (this.replyData != null) {
			this.placeholder = 'Ваш ответ...';
		}
	},
	methods: {
		sendComment() {
			if (!this.commentText) {
				return;
			}
			if (this.user == null) {
				alert("You must be logged in!");
				return;
			}

			let newComment = {
				post_id: this.postId,
				text: this.commentText
			};

			if (this.replyData != null) {
				newComment.reply_to = this.replyData.replyTo;
			}
			axios.post(this.$API_URL + 'addComment/', newComment, {headers: authHeaders})
			.then(response => {
				let comment = response.data;
				console.log(comment);
				this.commentText = "";
				this.$emit("close-form");
				this.$emit("update-list");
			})
			.catch(e => {
				if (e.response.status == 403) {
					alert(e.response.data.description);
				}
				if (e.response.data.description) {
					console.log(e + '\n' + e.response.data.description);
				} else {
					console.log(e);
				}
			})
		}
	}
}
</script>

<style>
	

</style>