<script>
  import { useRoute } from 'vue-router';
  import NavbarAuxiliar from './components/layout/NavbarAuxiliar.vue';
  import Navbar from './components/layout/Navbar.vue';
  
  export default{
    name: 'App',
    components: {
      Navbar,
      NavbarAuxiliar
    },
    setup(){
      const route = useRoute()
      return { route }
    }
  }
</script>
<template>
  <div>
    <Navbar v-if="route.meta.layout !== 'auth'"/>
    <NavbarAuxiliar v-if="route.meta.layout !== 'auth'"/>
    <router-view/>
  </div>
</template>
