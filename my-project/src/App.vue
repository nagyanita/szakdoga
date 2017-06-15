<template>
  <div id="app">
   <navbar />
  </div>
</template>

<script>
  import navbar from './components/Navbar';

  export default {
    name: 'app',
    data() {
      return {
        hidden: false,
      };
    },
    components: {
      navbar,
    },
  };

</script>

<style>
 
</style>
