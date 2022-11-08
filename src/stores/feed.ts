import { defineStore } from "pinia";

export interface Channel {
  name: string;
  q: string;
}

interface Feed {
  id: string;
  title: string;
  summary: string;
  link: { href: string; rel: string };
  updated: string;
  thumbnail: { url: string };
}

interface State {
  channelList: Map<string, Channel>;
  selectedChannel: Channel;
  isLoading: boolean;
  feeds: Feed[];
}

export const useFeedStore = defineStore({
  id: "feed",
  state: (): State => {
    return {
      channelList: new Map<string, Channel>(),
      selectedChannel: {
        name: "",
        q: "",
      },
      isLoading: true,
      feeds: [],
    };
  },
  actions: {
    prepareChannelList() {
      this.channelList.set("ALL", {
        name: "全ての記事",
        q: "https://techfeed.io/feeds/categories/all",
      });
      this.channelList.set("Vue.js", {
        name: "Vue.js",
        q: "https://techfeed.io/feeds/channels/Vue.js",
      });
    },
    async recieveFeedList(slug: string) {
      this.isLoading = true;
      this.selectedChannel = this.channelList.get(slug) as Channel;
      const toJsonUrl = "https://api.factmaven.com/xml-to-json/?xml=";
      const fullUrl = `${toJsonUrl}${this.selectedChannel.q}`;
      const response = await fetch(fullUrl);
      const feedListJson = await response.json();
      const feedArray = feedListJson.feed.entry;
      this.feeds = feedArray;
      this.isLoading = false;
    },
  },
});
