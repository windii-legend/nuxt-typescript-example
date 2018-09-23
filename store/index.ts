import axios from 'axios'

export const state = () => ({
  books: [],//検索された本一覧
  book: {},// 詳細表示される本
  query: '', // 検索ワード
})

// mutaions

export const mutations = {
  setBooks(state, books) {
    state.books = books
  },
  setQuery(state, query) {
    state.query = query
  },
  setBook(state, book) {
    state.book = book
  },
  clearBook(state) {
    state.book = {}
  },

}

// actions

export const actions = {
  async search({ commit , state }) {
    if(!state.query) {
      return;
    }
    const path = `https://www.googleapis.com/books/v1/volumes?q=${state.query}`;
    const response = await axios.get(path);
    if(response.data && response.data.items) {
      const books = response.data.items;
      commit("setBooks", books.slice(0,10))
    }
  },
  async fetchBook({ commit, state }, id) {
    commit("clearBook");

    // stateの中から指定されたidの本を探しあったらそれをstateにセットする
    const book = state.books.find(book => book.id == id)
    if(book != undefined) {
      commit("setBook", book)
      return
    }
    // stateの中から指定されたidの本が見つからなかったらAPIをコールする
    const path = `https://www.googleapis.com/books/v1/volumes/${id}`;
    const response = await axios.get(path);
    if(response && response.data) {
      const data = response.data;
      commit("setBook", data)
    }
  }
}
