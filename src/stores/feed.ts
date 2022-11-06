import { defineStore } from "pinia";

export interface Channel {
  name: string;
  q: string;
}

interface Feed {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
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
      this.channelList.set("all", {
        name: "全ての記事",
        q: "https://techfeed.io/feeds/categories/all",
      });
      this.channelList.set("Cat😺", {
        name: "猫😺",
        q: "https://techfeed.io/feeds/channels/Cat%F0%9F%98%BA",
      });
    },
    async recieveFeedList(slug: string) {
      this.selectedChannel = this.channelList.get(slug) as Channel;
      const toJsonUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
      const fullUrl = `${toJsonUrl}${this.selectedChannel.q}`;
      const response = await fetch(fullUrl);
      const feedListJson = await response.json();
      const feedArray = feedListJson.items;
      this.feeds = feedArray;
      this.isLoading = false;
    },
  },
});
