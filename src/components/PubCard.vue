<template>
  <div class="card-container">
    <h3>
      {{ details.name }} <strong>({{ walkingDistance }}min walk)</strong>
    </h3>
    <div class="content">
      <p class="address">
        {{ details.address }}
      </p>
      <p>
        Closes: {{ openHours.closes.time }} <strong>({{ closesIn }})</strong>
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
          <a-button
            ghost
            type="primary"
            @click="share"
          >
            <a-icon type="message" />
            Send
          </a-button>
          <a-button
            ghost
            type="primary"
            @click="openDirections"
          >
            <a-icon type="pushpin" />
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
    walkingDistance() {
      return Math.round((this.details.distance / 3.1) * 60);
    },
    openHours() {
      const { open, close } = this.details.openTimesToday;
      return {
        opens: {
          day: moment(open.day, 'e').format('ddd'),
          time: moment(open.time, 'HHmm').format('h:mma'),
        },
        closes: {
          day: moment(close.day, 'e').format('ddd'),
          time: moment(close.time, 'HHmm').format('h:mma'),
        },
      };
    },
    closesIn() {
      const { closes } = this.openHours;
      return moment(`${closes.day} ${closes.time}`, 'ddd h:mma').fromNow();
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
h3 {
  color: fade(@theme-grey, 85%);
}
.content {
  .address {
    font-size: @font-size-sm;
  }
  p {
    marin-bottom: 0.5rem;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .ratings {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    .price {
      color: @text-color-secondary;
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }
    .stars {
      color: @theme-gold;
      font-size: 12px;
    }
  }
}
</style>
