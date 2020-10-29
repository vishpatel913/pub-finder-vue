<template>
  <div class="card-container">
    <div @click="openMapsPage">
      <div class="header">
        <h3>
          {{ name }}
          <span
            v-if="walkingDistance < 60"
            class="distance"
          >
            ({{ walkingDistance }}min walk)
          </span>
        </h3>
      </div>
      <div class="content">
        <p class="address">
          {{ address }}
        </p>
        <p v-if="closes">
          Closes: {{ closes.time }}
          <strong>({{ closes.duration }})</strong>
        </p>
      </div>
    </div>
    <div class="footer">
      <div class="ratings">
        <a-rate
          class="price"
          :default-value="priceLevel"
          :count="priceLevel"
          character="£"
          disabled
        />
        <a-rate
          class="stars"
          :default-value="rating"
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
import { DateTime } from 'luxon';
import { getDuration, getISOFromTimeString } from '../utils';

export default {
  name: 'PubCard',
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    coords: {
      type: Object,
      required: true,
    },
    rating: {
      type: Number,
      default: null,
    },
    priceLevel: {
      type: Number,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    directions: {
      type: Object,
      default: null,
    },
    photos: {
      type: Array,
      default: null,
    },
    openTimes: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapState({ currentCoords: 'coords' }),
    walkingDistance() {
      return this.directions && Math.round(this.directions.distance / 1.34 / 60);
    },
    closes() {
      if (!this.openTimes) return null;
      const { close: { day, time } } = this.openTimes;
      const duration = getDuration(DateTime.local().toISO(), getISOFromTimeString(time));
      return {
        day: DateTime.fromFormat(day.toString(), 'E').toFormat('ccc'),
        time: DateTime.fromFormat(time, 'HHmm').toFormat('h:mma').toLowerCase(),
        duration: Object.values(duration).join(' '),
      };
    },
  },
  methods: {
    openDirections() {
      if (this.directions) window.open(this.directions.link, '_blank');
    },
    openMapsPage() {
      window.open(this.link, '_blank');
    },
    share() {
      const text = "I'm going here...";
      if ('share' in navigator) {
        navigator.share({
          title: this.name,
          text,
          url: this.link,
        });
      } else {
        window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${text} - `,
        )}${this.link}`;
      }
    },
  },
};
</script>

<style scoped lang="less">
.card-container {
  padding: @padding-sm 0;
  width: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: @padding-sm;
    h3 {
      color: @heading-black-color;
    }
    .distance {
      font-size: @font-size-sm;
      font-weight: 400;
    }
  }
  .content {
    .address {
      font-size: @font-size-sm;
    }
    p {
      margin-bottom: @padding-sm;
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
        margin-bottom: @padding-sm;
      }
      .stars {
        color: @theme-gold;
        font-size: 12px;
      }
    }
  }
}
</style>
