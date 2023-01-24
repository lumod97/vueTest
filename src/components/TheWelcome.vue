<template>
  <b-card>
    <b-tabs content-class="mt-3" fill v-model="tabIndex">
      <b-tab active>
        <template #title>
          <b-nav-item :to="{name:'test_component'}" role="presentation" >Todos los Clientes</b-nav-item>
        </template>
      </b-tab>
      <b-tab>
        <template #title>
          <b-nav-item :to="{name:'test_component'}" role="presentation" >Clientes con pagos</b-nav-item>
        </template>
      </b-tab>
      <b-tab>
        <template #title>
          <b-nav-item :to="{name:'test_component'}" role="presentation" >Clientes sin pagos</b-nav-item>
        </template>
      </b-tab>
      <router-view></router-view>
    </b-tabs>
    </b-card>
</template>
<script>
export default {

  data() {
    return {
      tabIndex: 1
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>