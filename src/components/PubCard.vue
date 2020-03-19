<template>
  <div class="card-container">
    <h3>
      {{ details.name }} <strong>({{ walkingDistance }}min walk)</strong>
    </h3>
    <div class="content">
      <p>{{ details.address }}</p>
      <p>
        Closes: {{ openToday.closes.time }} <strong>({{ closesIn }})</strong>
      </p>
    </div>
    <div class="footer">
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
      <div class="links">
        <a-button-group>
          <a-button @click="share">
            Send
          </a-button>
          <a-button @click="openDirections">
            Go
          </a-button>
        </a-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

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
    directionsLink() {
      const current = `${this.coords.lat},${this.coords.lng}`;
      const dest = `${this.details.coords.lat},${this.details.coords.lng}`;
      return `https://www.google.com/maps/dir/${current}/${dest}/data=!4m2!4m1!3e2`;
    },
  },
  methods: {
    openDirections() {
      window.open(this.directionsLink, '_blank');
    },
    share() {
      const text = "I'm going here...";
      if ('share' in navigator) {
        navigator.share({
          title: this.details.name,
          text,
          url: this.directionsLink,
        });
      } else {
        window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${text} - `,
        )}${this.directionsLink}`;
      }
    },
  },
};
</script>

<style scoped lang="less">
.card-container {
  padding: 0.5rem 0;
  width: 100%;
}
.content {
  p {
    marin-bottom: 0.5rem;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  .price {
    color: @text-color-secondary;
    font-size: 16px;
    font-weight: 400;
  }
  .stars {
    color: @theme-gold;
    font-size: 16px;
  }
}
</style>
