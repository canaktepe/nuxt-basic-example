import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      fetchedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.fetchedPosts = posts;
      },
      addPost(state, post) {
        state.fetchedPosts.push(post);
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        return this.$axios
          .$get(
            "https://nuxt-test-352fd-default-rtdb.firebaseio.com/users.json"
          )
          .then(response => {
            let data = response;
            let postArray = [];
            for (let key in data) {
              postArray.push({ id: key, ...data[key] });
            }
            commit("setPosts", postArray);
          });
      },
      setPosts({ commit }, posts) {
        commit("setPosts", posts);
      },
      addPost({ commit }, post) {
        this.$axios
          .$post(
            "https://nuxt-test-352fd-default-rtdb.firebaseio.com/users.json",
            post
          )
          .then(response => {
            commit("addPost", { ...post, id: response.name });
          });
      }
    },
    getters: {
      getPosts(state) {
        return state.fetchedPosts;
      }
    }
  });
};

export default createStore;
