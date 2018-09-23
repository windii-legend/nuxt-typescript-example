<template lang="pug">
b-card.mb-2.card(:title="title", :img-src='thumbnail', img-alt='Image', img-top='', tag='article', style='max-width: 20rem;')
  p.card-text {{description}}
  router-link(:to="'books/'+ id") 
    b-button(variant='primary') 詳細を見る
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from "nuxt-property-decorator"


@Component({})
export default class BookListItem extends Vue {
  @Prop() book
  get id() {
    try {
      return this.book.id;
    } catch {}
    return ''
  }
  get title() {
    try {
      return this.book.volumeInfo.title;
    } catch {}
    return ''
  }

  get description() {
    try {
      if(this.book.volumeInfo.description && this.book.volumeInfo.description.length > 30) {
        return this.book.volumeInfo.description.substr(0,30) + '(...続きを読む)';
      }
      return this.book.volumeInfo.description
    } catch {}
    return ''
  }

  get thumbnail(): string | boolean {
    try {
        return this.book.volumeInfo.imageLinks.smallThumbnail;
    } catch {}
    return ''
  }
}
</script>
<style lang="sass">
.card
  min-width: 320px
  font-family: "Segoe UI", Tahoma, Geneva, Verdana,sans-serif
  padding: 1rem
  margin: 0.25rem
  border: 0.25rem solid gainsboro
</style>
