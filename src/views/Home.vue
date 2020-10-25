<template>
  <div class="home">
    <router-link :to="{name: 'board'}">
      <button>Nouvelle partie</button>
    </router-link>
    <router-link :to="{name: 'settings'}">
      <button>Settings</button>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
