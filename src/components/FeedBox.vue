<script setup lang="ts">
interface Props {
  title: string;
  pubDate: string;
  src: string;
}
interface Emits {
  (event: "openLink"): void;
}
defineProps<Props>();
const emit = defineEmits<Emits>();
const onClickFeed = (): void => {
  emit("openLink");
};
</script>

<template>
  <section @click="onClickFeed">
    <div class="wrapper">
      <p>{{ title }}</p>
      <p>({{ pubDate }})</p>
    </div>
    <img :src="src" alt="" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  border: green 0.1rem solid;
  padding: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
section:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}
img {
  width: 100px;
}
</style>
