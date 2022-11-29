<template>
  <div>
    <ul class="list">
      <li
        v-for="(sear, index) in searchs"
        :key="index"
        @click="searchindex = index"
        :class="{ active: searchindex == index }"
      >
        <a>{{ sear.ple }}</a>
      </li>
    </ul>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
    <ul class="pic" v-if="searchindex == 0">
      <SearchItem v-for="maple in pics" :key="maple.id" :maple="maple" />
    </ul>
    <img
      v-if="pics?.length == 0 && searchindex == 0"
      src="../assets/img/no_search_result.png"
      alt=""
    />
    <ul class="read" v-if="searchindex == 1">
      <SearchItem v-for="maple in reads" :key="maple.id" :maple="maple" />
    </ul>
    <img
      v-if="reads?.length == 0 && searchindex == 1"
      src="../assets/img/no_search_result.png"
      alt=""
    />
    <ul class="musics" v-if="searchindex == 2">
      <SearchItem v-for="maple in musics" :key="maple.id" :maple="maple" />
    </ul>
    <img
      v-if="musics?.length == 0 && searchindex == 2"
      src="../assets/img/no_search_result.png"
      alt=""
    />
    <ul class="movies" v-if="searchindex == 3">
      <SearchItem v-for="maple in movies" :key="maple.id" :maple="maple" />
    </ul>
    <img
      v-if="movies?.length == 0 && searchindex == 3"
      src="../assets/img/no_search_result.png"
      alt=""
    />
    <ul class="radios" v-if="searchindex == 4">
      <SearchItem v-for="maple in radios" :key="maple.id" :maple="maple" />
    </ul>
    <img
      v-if="radios?.length == 0 && searchindex == 4"
      src="../assets/img/no_search_result.png"
      alt=""
    />
  </div>
</template>

<script>
import SearchItem from "@/components/SearchItem.vue";
export default {
  props: {
    pics: Array,
    reads: Array,
    musics: Array,
    movies: Array,
    radios: Array,
    loading: Boolean,
  },
  components: {
    SearchItem,
  },
  data: function () {
    return {
      searchindex: 0,
      searchs: [
        { id: 1, ple: "图文" },
        { id: 2, ple: "阅读" },
        { id: 3, ple: "音乐" },
        { id: 4, ple: "影视" },
        { id: 5, ple: "电台" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  li {
    margin: 20rem;
    font-size: 14rem;
    font-weight: 600;
    color: #999;
    a {
      text-decoration: none;
      padding-bottom: 10rem;
    }
  }
  .active {
    color: black;
    font-size: 14rem;
    font-weight: 600;
    a {
      border-bottom: 1rem solid black;
    }
  }
}
</style>