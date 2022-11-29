<template>
  <div class="find">
    <div class="find-top">
      <ul>
        <li
          v-for="section in sections"
          :key="section.id"
          :title="section.id"
          @click="sectionId = section.id"
          :class="{ active: sectionId == section.id }"
        >
          {{ section.tle }}
        </li>
      </ul>
      <div class="ple">
        <img
          src="../assets/img/search.png"
          alt=""
          @click="
            $router.push({ path: './search' });
            Navshow();
          "
        />
      </div>
    </div>

    <div class="fint-box animate__fadeInRight">
      <FindRead v-show="sectionId == 1" />
      <FindSub v-show="sectionId == 2" />
      <FindProject v-show="sectionId == 3" />
      <FindHot v-show="sectionId == 4" />
      <FindAnswers v-show="sectionId == 5" />
      <FindMovie v-if="sectionId == 6" />
      <FindRudio v-show="sectionId == 7" />
      <FindWriter v-show="sectionId == 9" />
    </div>
  </div>
</template>
<script>
import FindRead from "@/components/FindRead.vue";
import FindSub from "@/components/FindSub.vue";
import FindProject from "@/components/FindProject.vue";
import FindHot from "@/components/FindHot.vue";
import FindAnswers from "@/components/FindAnswers.vue";
import FindMovie from "@/components/FindMovie.vue";
import FindRudio from "@/components/FindRudio.vue";
import FindWriter from "@/components/FindWriter.vue";
import { mapMutations } from "vuex";


export default {
  components: {
    FindRead,
    FindSub,
    FindProject,
    FindHot,
    FindAnswers,
    FindMovie,
    FindRudio,
    FindWriter,
  },
  data: function () {
    return {
      sections: [
        { id: 1, tle: "阅读" },
        { id: 2, tle: "图文" },
        { id: 3, tle: "专题" },
        { id: 4, tle: "热榜" },
        { id: 5, tle: "问答" },
        { id: 6, tle: "影视" },
        { id: 7, tle: "电台" },
        { id: 9, tle: "作者" },
      ],
      sectionId: JSON.parse(window.localStorage.getItem("sectionId") || "3"),
    };
  },
  methods: {
    ...mapMutations(["Navshow"]),
  },
  watch: {
    sectionId() {
      window.localStorage.setItem("sectionId", JSON.stringify(this.sectionId));
    },
  },
};
</script>
<style lang="less">
.find-top {
  width: 100%;
  height: 50rem;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      width: 50rem;
      // padding: 0 10rem;
      background-color: #fff;
      color: black;
      flex-shrink: 0;
      font-weight: 200;
      &:last-child {
        margin-right: 45rem;
      }
      &:first-child {
        margin-left: 85rem;
      }
    }

    .active {
      font-size: 14rem;
      font-weight: 600;
    }
  }
  .ple {
    width: 30rem;
    height: 50rem;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #fff;
    img {
      width: 20rem;
      margin-top: 15rem;
      margin-right: 10rem;
    }
  }
}
.fint-box {
  margin: 50rem 0;
}
</style>  
