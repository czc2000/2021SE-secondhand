<template>
  <div>
    <p>
      个人空间
    </p>
  </div>
</template>

<script>
export default {
  name: "userInformation",
  data:function () {
    return{
      userdata:{}
    }
  },
  created:function (){
    var url='http://123.56.42.47:10492/WhoAmI'
    this.axios.get(url,{
      headers:{
        'Authorization':this.$store.state.Authorization
      }
    }).then(response=>{
      console.log(response)
    })
  }
}
</script>

<style scoped>

</style>