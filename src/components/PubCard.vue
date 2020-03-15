<template>
  <div class="card-container">
    <a
      :href="routeLink"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h3>
        {{ details.name }} <strong>({{ walkingDistance }}min walk)</strong>
      </h3>
      <p>{{ details.address }}</p>
      <p>Closes: {{ openingHours.closes }}</p>
    </a>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'PubCard',
  props: {
    details: {
      type: Object,
      default: null,
    },
  },
  data: () => ({}),
  computed: {
    ...mapState(['coords']),
    openingHours() {
      const data = this.details.openingHours.find((item) => {
        const now = moment();
        const { open, close } = item;
        return (
          moment(`${open.day} ${open.time}`, 'e HHmm').isBefore(now)
          && moment(`${close.day} ${close.time}`, 'e HHmm').isAfter(now)
        );
      });

      return {
        opens: moment(data.open.time, 'HHmm').format('h:mm a'),
        closes: moment(data.close.time, 'HHmm').format('h:mm a'),
      };
    },
    walkingDistance() {
      return Math.round((this.details.distance / 3.1) * 60);
    },
    routeLink() {
      const current = `${this.coords.lat},${this.coords.lng}`;
      const dest = `${this.details.coords.lat},${this.details.coords.lng}`;
      return `https://www.google.com/maps/dir/${current}/${dest}/data=!4m2!4m1!3e2`;
    },
  },
};
</script>

<style scoped lang="less">
.card-container {
  padding: 0.5rem 0;
  width: 100%;
}
</style>
