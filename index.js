var app = new Vue({
    el: '#app',
    created(){
        this.GetCatagories();
        this.getValues();
    },
    data: {
      message: 'Hello Vue!',
      categories:[],
      category:{},
      username:'',
      password:'',
      values:[]
    },
    methods:{
        GetCatagories: function () {
            axios.get('https://localhost:44385/api/category')
            .then(response=>{
                if(response.data.isSuccess==true)
                {
                     this.categories=response.data.entities;
                }
               
            })
            .catch(err=>{
                console.log(err.status.text);
            })
        },
        GetCategoryById: function (category) {
            axios.get('https://localhost:44385/api/category/'+category.id)
            .then(response=>{
                if(response.data.isSuccess==true)
                {
                     this.category=response.data.entity;
                }
            })
            .catch(err=>{
                console.log(err.status.text);
            })
        },
        login:function (username,password) {
            var dat={
                'username':username,
                'password':password
            }
            var headers={
                withCrediantials:true,
                headers:{'Content-Type':'application/json'}
            }

             return axios.post('https://localhost:44380/api/aut/login',dat,headers)
             .then(response=>{
                if(response.data.token)
                {
                    localStorage.setItem('user',JSON.stringify(response));
                }
                return response;
            })
            .catch(err=>{
               return err;
            })
        },
        loginonsubmit:function () {
            this.login(this.username,this.password)
            .then(response=>
                {
                    if(response.status==200)
                        {
                            alert("Giriş başarılı");
                        }
                        else{
                            alert("Giriş başarısız");
                        }
                })
        },
        autHeader:function () {
            let user=JSON.parse(localStorage.getItem('user'));
            if(user && user.data.token)
            {
                return{
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':'Bearer '+user.data.token   
                    }
                }
            }
            else    
            {
                return{
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':''   
                    }
                }
            }
        },
        getValues:function () {
             axios.get('https://localhost:44380/api/admin',this.autHeader())
            .then(response=>{
               this.values=response.data
           })
           .catch(err=>{
              return console.log(err.status.text);
           })
        }
    }
  })
  