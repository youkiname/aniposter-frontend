<template>
	<div class="col-sm-12 col-lg-4 d-flex flex-column">
		<img 
		class="img-fluid rounded shadow"
		:src="'https://aniposter.net/static/images/' + fileNames[0]" 
		alt="post image">

		<div v-if="expandAlbum">
			<img
			v-for="n in fileNames.length-1"
			:key="n"
			class="img-fluid rounded shadow m-2" style="height: 400px;"
			:src="'https://aniposter.net/static/images/' + fileNames[n]" 
			alt="post image">
		</div>
		<button v-if="fileNames.length > 1" class="btn" 
		@click="showAllImages">{{ buttonText }}</button>
	</div>
</template>

<script>
export default {
props: {
	fileNames: {
		type: Array,
		required: true
	},
	postType: {
		type: String,
		required: true
	}
},
data() {
		return {
			expandAlbum: false,
			buttonText: 'Показать все',
		};
},
methods: {
	showAllImages() {
		this.expandAlbum = !this.expandAlbum;
		if (this.expandAlbum) {
			this.buttonText = 'Свернуть';
		} else {
			this.buttonText = 'Показать все';
		}
	}
}
}
</script>

<style>

</style>
