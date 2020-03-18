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
      <p>
        Closes: {{ openToday.closes.time }} <strong>({{ closesIn }})</strong>
      </p>
      <div class="ratings">
        <a-rate
          class="price"
          :default-value="details.priceLevel"
          :count="details.priceLevel"
          character="£"
          disabled
        />
        <a-rate
          class="stars"
          :default-value="details.rating"
          allow-half
          disabled
        />
      </div>
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
    openToday() {
      const data = this.details.openingHours.find((item) => {
        const now = moment();
        const { open, close } = item;

        return (
          moment(`${open.day} ${open.time}`, 'e HHmm').isBefore(now)
          && moment(`${close.day} ${close.time}`, 'e HHmm').isAfter(now)
        );
      });

      return {
        opens: { day: data.open.day, time: moment(data.open.time, 'HHmm').format('h:mm a') },
        closes: { day: data.close.day, time: moment(data.close.time, 'HHmm').format('h:mm a') },
      };
    },
    closesIn() {
      const { closes } = this.openToday;
      return moment(`${closes.day} ${closes.time}`, 'e h:mm a').fromNow();
    },
    walkingDistance() {
      return Math.round((this.details.distance / 3.1) * 60);
    },
    routeLink() {
      const current = `${this.coords.lat},${this.coords.lng}`;
      const dest = `${this.details.coords.lat},${this.details.coords.lng}`;
      return `https://www.google.com/maps/dir/${current}/${dest}/data=!4m2!4m1!3e2`;
    },
    methods: {
      share() {
        const text = "Let's go here...";
        if ('share' in navigator) {
          navigator.share({
            title: this.details.name,
            text,
            url: this.routeLink,
          });
        } else {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${text} - `,
          )}${this.routeLink}`;
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
.card-container {
  padding: 0.5rem 0;
  width: 100%;
}
.ratings {
  display: flex;
  justify-content: space-between;
  .price {
    color: @text-color-secondary;
  }
  .stars {
    color: @theme-gold;
  }
}
</style>
