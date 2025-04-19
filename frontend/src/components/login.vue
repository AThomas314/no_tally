<template>
    <div>
    <div v-if="showLoginForm">
        <form class="login-form" @submit.prevent="login">
            <div>
                <label for="username"> Username</label>
                <input id ="username" placeholder="Username" v-model="username">
            </div>
            <div>
                <label for="password"> Password</label>
                <input type="password" placeholder="Password" v-model="password">
            </div>
            <div>
                <button type="submit" @click="login">Login</button>
                <button type="button" @click="newUserForm">New User</button>
            </div>
        <a href="reset_password">Forgot Password?</a>
        </form>
    </div>
    <div v-else>
        <form class="login-form" @submit.prevent="login">
            <div>
                <label for="name">Name</label>
                <input id ="name" placeholder="Name" v-model="name">
            </div>
            <div>   
                <label for="e-mail"> E-mail</label>
                <input id ="e-mail" placeholder="E-mail" v-model="email">
            </div>
            <div>
                <label for="username"> Username</label>
                <input id ="username" placeholder="Username" v-model="username">
            </div>
            <div>
                <label for="password"> Password</label>
                <input type="password" placeholder="Password" v-model="password">
            </div>
            <div>
                <button type="submit" @click="newUser">Create User</button>
                <button type="button" @click="LogInForm">Login</button>
            </div>
        <a>Forgot Password?</a>
        </form>        
    </div>
    <p v-if="nullName">Name is required</p>
    <p v-if="nullEmail">Email is required</p>
    <p v-if="nullUserName">Username is required</p>
    <p v-if="nullPassword">Password is required</p>
    </div>
</template>


<script>
const axios = require('axios')
export default {
    name: 'login-page',
    data() {
        return {
            email:'',
            name:'',
            username: '',
            password: '',
            nullEmail:false,
            nullName:false,
            nullUserName:false,
            nullPassword:false,
            showLoginForm: true
        };
    },
    methods: {
        login() {
            if (this.username && this.password){
            const url =process.env.VUE_APP_BACKEND_URL+'/login'
            const body = {
                username:this.username,
                password:this.password
            }
            console.log('clicked login', body);
            axios.post(url,body)
            .then(res=> {
                if(res.status===200){
                    this.$router.push('home')
                }
            })
            .catch(e=>{
                console.log('error');
                console.log(e)
                console.log(url)
            })}else{
                this.nullPassword = !this.password
                this.nullUserName = !this.username
            }
        },
        newUser(){
            const mailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
            if (this.email.match(mailPattern) && this.name && this.username && this.password){
                const body = {
                    email: this.email,
                    name: this.name,
                    username:this.username,
                    password:this.password
                                };
                const url = process.env.VUE_APP_BACKEND_URL+'/createuser';
                axios.post(url,body).then(res=>{console.log(res)})}
            else {
                this.nullPassword = !this.password
                this.nullUserName = !this.username
                this.nullEmail = !this.password
                this.nullName = !this.username
            }
        },
        newUserForm(){
            this.nullEmail=false;
            this.nullName=false;
            this.nullUserName=false;
            this.nullPassword=false;
            this.showLoginForm=false;
        },
        LogInForm(){
            this.newUserForm();
            this.showLoginForm=true
        },
    }
};
</script>

<style>
.login-form{
    background-color: aquamarine;
    margin-left: auto; 
    width: 40%;
    margin-right: auto;

}
div{
    padding: .75%;
}
button{
    margin-left: .1%;
    margin-right: .1%;
    width: 20%;
}
a{
    font-size: smaller;
}
</style>