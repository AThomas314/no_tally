<template>
<div>
    Welcome Home
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
                console.log('great Succes')
                console.log(res.status);
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