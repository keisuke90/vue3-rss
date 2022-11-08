<script setup lang="ts">
import { computed } from "vue";
import { useFeedStore } from "@/stores/feed";
import FeedBox from "@/components/FeedBox.vue";

interface Props {
  slug: string;
}
const props = defineProps<Props>();

const feedStore = useFeedStore();
feedStore.recieveFeedList(props.slug);
const isLoadding = computed((): boolean => {
  return feedStore.isLoading;
});
const openLink = (link: string): void => {
  window.open(link, "_blank");
};
</script>

<template>
  <div class="wrapper">
    <p v-if="isLoadding">データ取得中...</p>
    <p v-else>
      <FeedBox
        v-for="feed in feedStore.feeds"
        :key="feed.title"
        :title="feed.title"
        :pub-date="feed.updated"
        :src="feed.thumbnail.url"
        @openLink="openLink(feed.link.href)"
      ></FeedBox>
    </p>
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 20px;
}
</style>
