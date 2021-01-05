<template>
	<div class="article-wrap">
		<h2>Админочка</h2>
		<form v-on:submit.prevent="submitHandler">
			<input type="text" v-model="username" placeholder="username" 
			@input="changeHandler">
			<button v-if="userExist" class="btn btn-outline-secondary btn-sm" type='submit'
			@click="goToUser">Найти</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import {currentUser} from '@/user.js'

export default {
name: 'AdminPage',
data: () => ({
	username: "",
	userExist: false
}),
computed: {
},
beforeCreate() {
	// TODO currentUser may be null.
	if (!currentUser.is_admin) {
		window.location.replace("https://aniposter.net/not-found/");
	}
},
methods: {
	changeHandler: function() {
		this.userExist = false
		if (!this.username) {
			return
		} else if (this.username[0] == '@') {
			this.username = this.username.slice(1)
		}
		axios.get(this.$API_URL + "doBotKnowsUser/?username="+this.username)
		.then(response => {
			this.userExist = response.data;
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
	goToUser() {
		this.$router.push({name: 'UserControlPanel', params: {user_id: this.username}})
	},
	submitHandler() {
		if (this.username && this.userExist) {
			this.goToUser()
		}
	}
},
components: {
}
}
</script>

<style>

</style>
