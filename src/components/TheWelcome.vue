<template>
  <div>
    <b-tabs content-class="mt-3" fill lazy>
        <template #tabs-end>
          <b-nav-item exact-active-class="active" :to="{ name: 'test-component-general' }">Todos los clientes</b-nav-item>
          <b-nav-item exact-active-class="active"  :to="{ name: 'test-component-sin-datos' }">Clientes sin pagos</b-nav-item>
          <b-nav-item exact-active-class="active"  :to="{ name: 'test-component-con-datos' }">Clientes con pagos</b-nav-item>
        </template>
        <template #default>
          <router-view :key="$route.name"></router-view>
        </template>
    </b-tabs>
  
</div>
</template>
<script>
export default {
  data() {
    return {
    };
  },

  mounted() {},

  methods: {},
};
</script>