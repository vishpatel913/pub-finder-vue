<template>
  <div class="card-container">
    <div @click="handleClick">
      <div class="header">
        <h3>
          {{ name }} <span class="distance">({{ walkingDistance }}min walk)</span>
        </h3>
        <!-- <compass-direction
          class="compass"
          :bearing="directions.bearing"
        /> -->
      </div>
      <div class="content">
        <p class="address">
          {{ address }}
        </p>
        <p v-if="openHours">
          Closes: {{ openHours.closes.time.toLowerCase() }}
          <strong>({{ closesIn.value }} {{ closesIn.unit }})</strong>
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
    openHours() {
      return this.openTimes && {
        opens: {
          day: DateTime.fromFormat(this.openTimes.open.day.toString(), 'E').toFormat('ccc'),
          time: DateTime.fromFormat(this.openTimes.open.time, 'HHmm').toFormat('h:mma'),
        },
        closes: {
          day: DateTime.fromFormat(this.openTimes.close.day.toString(), 'E').toFormat('ccc'),
          time: DateTime.fromFormat(this.openTimes.close.time, 'HHmm').toFormat('h:mma'),
        },
      };
    },
    closesIn() {
      const { closes } = this.openHours;
      let closeDt = DateTime.fromFormat(closes.time, 'h:mma');
      if (closeDt.toFormat('a') === 'AM' && DateTime.local().toFormat('a') !== 'AM') {
        closeDt = closeDt.plus({ hours: 24 });
      }
      const { hours, minutes } = closeDt.diffNow(['hours', 'minutes']).toObject();
      const closesHours = ({
        value: minutes > 30 ? hours + 1 : hours,
        unit: hours > 1 ? 'hours' : 'hours',
      });
      const closesMinutes = ({
        value: (Math.floor(minutes / 10)) * 10,
        unit: minutes > 1 ? 'minutes' : 'minute',
      });

      return hours > 0 ? closesHours : closesMinutes;
    },
  },
  methods: {
    openDirections() {
      if (this.directions) window.open(this.directions.link, '_blank');
    },
    handleClick() {
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
