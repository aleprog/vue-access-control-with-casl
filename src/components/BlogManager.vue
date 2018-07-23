<template>
	<div class="hello">
		<h1>Create New Blog</h1>
		<form @submit="create" v-if="$can('create','blog')">
			<input class="form-input" type="text" placeholder="Blog Title..." v-model="blog_title">
			<br/>
			<textarea class="form-input" v-model="blog_body" placeholder="Type content here"></textarea>
			<br/>
			<button>Create</button>
			<br/>
		</form>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				blog_title: null,
				blog_body: null
			}
		},
		methods : {
			create(e){
				e.preventDefault()
				let user = JSON.parse(localStorage.getItem('user'))
				this.$http.defaults.headers.common['x-access-token'] = localStorage.jwt
				this.$http.post('http://localhost:3000/blog', {
					blog_title: this.blog_title,
					blog_body: this.blog_body,
					created_by : user.id
				})
				.then(response => {
					alert(response.data.message)
					this.blog_title = null
					this.blog_body 	= null
				})
				.catch(function (error) {
					console.error(error.response);
				});
			}
		}
	}
</script>

<style scoped>
h1, h2 {
	font-weight: normal;
}
button {
	border-radius: 2px;
	font-size: 14px;
	padding: 5px 20px;
	border: none;
	background: #43bbe6;
	color : #ffffff;
	font-weight: 600;
	cursor: pointer;
	transition: 0.2s all;
}
button:hover {
	background: #239be6;
	transition: 0.2s all;
}
.form-input {
	min-width: 50%;
	border: 1px #eee solid;
	padding: 10px 10px;
	margin-bottom: 10px;
}
textarea {
	resize: none;
	height: 6em;
}
</style>