<template lang="pug">
  section
    div.cards
      book-detail-item(:book="book") //追加
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import BookDetailItem from "~/components/BookDetailItem.vue"
import { State } from "vuex-class" //　追加

@Component({
  components: {
    BookDetailItem
  }
})
export default class BookDetail extends Vue {
  @State book //追加
  mounted () {
    this.$store.dispatch('fetchBook', this.$route.params.id)
  } // 追加
}
</script>
<style lang="sass">

.cards
  display: flex
  flex-wrap: wrap
  justify-content: flex-between
  
.row
  padding: 8px 0
</style>
