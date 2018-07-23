<template>
	<div class="hello">
		<h1>Welcome to blog page</h1>
		<div class="blog" v-for="blog,index in blogs" @key="index">
			<h2>{{blog.title}}</h2>
			<p>{{blog.body}}</p>
			<button class="delete" v-if="$can('delete',blog)" @click="destroy(blog)">Delete</button>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				blogs: []
			}
		},
		mounted(){
			this.$http.get('http://localhost:3000/blog')
			.then(response => {
				this.blogs = response.data.blogs
			})
			.catch(function (error) {
				console.error(error.response);
			});
		},
		methods : {
			destroy(blog){
				this.$http.defaults.headers.common['x-access-token'] = localStorage.jwt
				this.$http.delete(`http://localhost:3000/blog/${blog.id}`)
				.then(response => {
					console.log(response)
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
.blog {
	width: 60%;
	border: 1px #eee solid;
	padding: 20px;
	padding-top: 0px;
	display: table;
	margin: 0 auto;
	margin-bottom: 20px;
	text-align: left;
}
.blog h2 {
	text-decoration: underline;
}
.delete {
	border-radius: 2px;
	background: #aaa;
	height: 24px;
	min-width: 50px;
	padding: 4px 7px;
	color: #ffffff;
	font-size: 14px;
	font-weight: 900;
	border: none;
	cursor: pointer;
	transition: 0.2s all;
}
.delete:hover {
	background: #ff0000;
	transition: 0.2s all;
}
</style>