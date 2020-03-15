<template>
  <div class="card-container">
    <h3>
      {{ details.name }} <strong>({{ details.distance }} mile)</strong>
    </h3>
    <p>
      {{ details.address }}
    </p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PubCard',
  props: {
    details: Object,
  },
  data: () => ({
    dayId: moment().day(),
  }),
  computed: {
    // closes() {
    //   let time;
    //   const data = this.details.openingHours.find((item) => item);
    // },
  },
};
</script>

<style scoped lang="less">
.card-container {
  margin: 1rem 0;
  text-align: left;
}
</style>
