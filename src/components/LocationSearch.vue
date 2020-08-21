<template>
  <a-input-search
    class="search-input"
    size="large"
    :loading="loading"
    :disabled="loading"
    :placeholder="placeholder"
    @search="onSearch"
    @change="onChange"
  >
    <a-button
      slot="enterButton"
      type="primary"
      ghost
    >
      <a-icon type="search" />
    </a-button>
  </a-input-search>
</template>

<script>
export default {
  name: 'LocationSearch',
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      searchQuery: null,
      placeholder: null,
    };
  },
  methods: {
    async onSearch(query) {
      if (query) {
        this.placeholder = null;
        await this.onSubmit(query);
      } else {
        this.placeholder = 'Please enter search term';
      }
    },
    onChange() {
      this.placeholder = null;
    },
  },
};
</script>

<style lang="less"></style>
