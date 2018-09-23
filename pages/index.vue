<template lang="pug">
  section
    b-container
      b-row.row
        b-col
          b-form(@submit="onSubmit") //①追加
            b-input-group(size="lg")
              b-form-input(
                size="sm",
                class="mr-sm-2",
                type="text",
                placeholder="キーワードを入力してください。",
                @change="handleChange"
                :value="query"
              ) // ②追加
              b-button(size="sm",class="my-2 my-sm-0",type="submit") 検索する
        b-col
      div.cards
        book-list-item(
          v-for='book in books',
          :key='book.id',
          :book='book',
        ) //③修正
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from "nuxt-property-decorator"
import { State } from "vuex-class" // ④追加
import BookListItem from "~/components/BookListItem.vue"

@Component({
  components: {
    BookListItem
  }
})
export default class extends Vue {
  @State books // ⑤追加
  @State query // ⑥追加
  
  // ⑦追加
  handleChange(e): void {
    this.$store.commit('setQuery', e);
  }
  
  // ⑧追加
  onSubmit(e): void {
    e.preventDefault();
    this.$store.dispatch('search');
  }
  
}
</script>
<style lang="sass">
.cards
  display: flex
  flex-wrap: wrap
  
.row
  padding: 8px 0
</style>
