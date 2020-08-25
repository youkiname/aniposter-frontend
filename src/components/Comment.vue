
<template>
<div class="card">
	<div class="card-header d-flex">
		<h4>
			<router-link :to="'/u/' + commentData.user.telegram_id" class="navbar-brand">{{ commentData.user.first_name }} {{ commentData.user.last_name }}</router-link>
		</h4>
	</div>

	<div class="card-body">
		<p class="blockquote mb-0 py-1">
			<span v-html="urlifyCommentText"></span>
			<small class="blockquote-footer pt-1">{{ commentData.created_on }}</small>
		</p>

		<comment-editor 
		v-if="editor"
		:comment-id="commentData.id"
		:comment-text="commentData.text"
		@close-editor="showEditor"
		@update-list="$emit('update-list')"
		></comment-editor>

		<div class="d-flex">
			<button class="reply-button"
			v-if='replyData == null'
			@click='reply'
			>Ответить</button>
			<button class="reply-button"
			v-else
			@click='cancelReply'
			>Отмена</button>

			<div class="dropdown">
				<button class="custom-btn ml-2" 
					type="button" 
					id="dropdownMenuButton" 
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false">
					<i class="fas fa-bars"></i>
				</button>
				<div class="dropdown-menu" 
				aria-labelledby="dropdownMenuButton">
					<span class="dropdown-item">Репорт</span>
					<div v-if="user != null && user.is_admin">
						<span class="dropdown-item" 
						@click="showEditor">Edit</span>
						<span class="dropdown-item" 
						@click="remove">Remove</span>
						<span class="dropdown-item" 
						@click="ban">Ban</span>
						<span class="dropdown-item" 
						@click="unban">Unban</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<comment-form
	v-if='replyData != null'
	:reply-data='replyData'
	:post-id='commentData.post_id'
	@close-form='cancelReply'
	@update-list="updateList"
	></comment-form>
	<div class="border-left pl-2"
		v-if="replies != null && replies.length > 0">
		<comment
			v-for="reply in replies"
			:key="reply.id"
			:comment-data="reply"
			@update-list="updateList">
		</comment>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import CommentEditor from '@/components/CommentEditor'
import CommentForm from '@/components/CommentForm'
import {authHeaders, currentUser} from '@/user.js'

export default {
	name: "comment",
	props: ['commentData'],
	data() {
		return {
			editor: false,
			replies: [],
			user: currentUser,
			replyData: null
		}
	},
	computed: {
		urlifyCommentText() {
			return this.urlify(this.commentData.text);
		}
	},
	mounted() {
		this.loadReplies();
	},
	methods: {
		loadReplies() {
			axios.get(this.$API_URL + "getReplies/?comment_id=" + this.commentData.id)
			.then(response => {
				this.replies = response.data;
			})
			.catch(e => {
				if (e.response.data.description) {
					console.log(e + '\n' + e.response.data.description);
				} else {
					console.log(e);
				}
			});
		},
		updateList() {
			this.loadReplies();
		},
		reply() {
			let replyData = {
				replyTo: this.commentData.id, 
				replyToText: this.commentData.text
			};
			this.replyData = replyData;
		},
		cancelReply() {
			this.replyData = null;
		},
		showEditor() {
			this.editor = !this.editor;
		},
		remove() {
			const data = {"comment_id": this.commentData.id};
			
			axios.delete(this.$API_URL + "deleteComment/", {headers: authHeaders, data})
			.then(response => {
				alert("Success delete " + response.data.id);
				this.$emit("update-list");
			})
			.catch(e => {
				if (e.response.data.description) {
					alert(e + '\n' + e.response.data.description);
				} else {
					alert(e);
				}
			});
		},
		ban() {
			axios.put(this.$API_URL + "banUser/", {"comment_id": this.commentData.id}, {headers: authHeaders})
			.then(response => {
				alert("Success ban " + response.data.result.id + ' ' + response.data.result.telegram_id);
			})
			.catch(e => {
				if (e.response.data.description) {
					alert(e + '\n' + e.response.data.description);
				} else {
					alert(e);
				}
			});
		},
		unban() {
			axios.put(this.$API_URL + "unbanUser/", {"comment_id": this.commentData.id}, {headers: authHeaders})
			.then(response => {
				alert("Success unban " + response.data.result);
			})
			.catch(e => {
				if (e.response.data.description) {
					alert(e + '\n' + e.response.data.description);
				} else {
					alert(e);
				}
			});
		},
		urlify(text) {
			let urlRegex = /((https|http)?:\/\/[^\s]+)/g;
			return text.replace(urlRegex, '<a href="$1">$1</a>');
		}
	},
	components: {
		CommentEditor, CommentForm
	}
}
</script>

<style>
	

</style>