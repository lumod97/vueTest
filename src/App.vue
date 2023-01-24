<template>

  <div id="app">
    <p>
    <router-link :to="{name: 'home'}">Home</router-link>
    <!-- |
    <router-link :to="{name: 'test_component'}">Test Component</router-link> -->
    |
    <router-link :to="{name: 'the_welcome'}">The Welcome</router-link>
    
    </p>
      <router-view></router-view>
  </div>
</template>