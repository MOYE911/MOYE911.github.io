<template>
  <div class="search">
    <div class="search-top">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="在这里写下想寻找的"
          @search="
            searchshow = !searchshow;
            getpic(value);
            getread(value);
            getmusic(value);
            getmovie(value);
          "
          @cancel="
            Navfshow();
            $router.go(-1);
          "
        />
      </form>
    </div>
    <div class="search-main" v-if="!searchshow">
      <ul>
        <li
          v-for="search in searchs"
          :key="search.id"
          @click="
            $router.push({
              path: './searchtitle',
              query: { id: search.id, title: search.title },
            })
          "
        >
          {{ search.title }}
        </li>
      </ul>
    </div>
    <SearchCard
      v-if="searchshow"
      :pics="pics"
      :reads="reads"
      :musics="musics"
      :movies="movies"
      :radios="radios"
      :loading="loading"
    />
  </div>
</template>
<script>
import { ref } from "vue";
import { mapMutations } from "vuex";
import SearchCard from "@/components/SearchCard.vue";
export default {
  components: {
    SearchCard,
  },
  data: function () {
    const value = ref("");
    return {
      value,
      searchshow: false,
      loading: false,
      pics: [],
      reads: [],
      musics: [],
      movies: [],
      radios: [],
      searchs: [
        { id: 1, title: "图文" },
        { id: 2, title: "问答" },
        { id: 3, title: "阅读" },
        { id: 5, title: "影视" },
        { id: 7, title: "电台" },
      ],
    };
  },
  methods: {
    ...mapMutations(["Navshow", "Navfshow"]),
    getpic(data) {
      this.loading = true;
      this.axios
        .get(` https://apis.netstart.cn/one/search/hp/${data}/0`)
        .then((res) => {
          this.loading = false;
          this.pics = res.data.data.list;
        });
    },
    getread(data) {
      this.loading = true;
      this.axios
        .get(` https://apis.netstart.cn/one/search/reading/${data}/0`)
        .then((res) => {
          this.loading = false;
          this.reads = res.data.data.list;
        });
    },
    getmusic(data) {
      this.loading = true;
      this.axios
        .get(` https://apis.netstart.cn/one/search/music/${data}/0`)
        .then((res) => {
          this.loading = false;
          this.musics = res.data.data.list;
        });
    },
    getmovie(data) {
      this.loading = true;
      this.axios
        .get(` https://apis.netstart.cn/one/search/movie/${data}/0`)
        .then((res) => {
          this.loading = false;
          this.movies = res.data.data.list;
        });
      this.axios
        .get(` https://apis.netstart.cn/one/search/radio/${data}/0`)
        .then((res) => {
          this.loading = false;
          this.radios = res.data.data.list;
        });
    },
  },
};
</script>
<style lang="less">
.search {
  display: flex;
  flex-direction: column;
  .search-top {
    width: 100%;
    flex: 1;
    padding: 0 5rem;
    display: flex;
    border-bottom: 5rem solid #f8f8f8;
    input {
      width: 90%;
      height: 20rem;
    }
    .search-tu {
      padding: 2rem;
    }
  }
  .search-main {
    ul {
      li {
        margin: 40rem 0;
        padding: 5rem 0;
        color: #818181;
      }
    }
  }
}
.van-search {
  flex: 1;
}
form {
  width: 100%;
}
</style>

