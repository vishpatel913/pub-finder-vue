<template>
  <div class="card-container">
    <div @click="handleModal">
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
          Closes: {{ openHours.closes.time }} <strong>({{ closesIn }})</strong>
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
    <a-modal
      v-model="imageModal"
      class="modal"
      centered
      destroy-on-close
      :footer="null"
      :body-style="{ padding: '1rem' }"
      :closable="false"
    >
      <pub-image-gallery
        :preview="image"
      />
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import PubImageGallery from './PubImageGallery.vue';
// import CompassDirection from './CompassDirection.vue';

export default {
  name: 'PubCard',
  components: {
    PubImageGallery,
    // CompassDirection,
  },
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
  data: () => ({
    imageModal: false,
  }),
  computed: {
    ...mapState({ currentCoords: 'coords' }),
    walkingDistance() {
      const { distance } = this.directions;
      return Math.round(distance / 1.34 / 60);
    },
    image() {
      const { url, attribution } = this.photos[0];
      return {
        url,
        attribution,
      };
    },
    openHours() {
      return this.openTimes && {
        opens: {
          day: moment(this.openTimes.open.day, 'e').format('ddd'),
          time: moment(this.openTimes.open.time, 'HHmm').format('h:mma'),
        },
        closes: {
          day: moment(this.openTimes.close.day, 'e').format('ddd'),
          time: moment(this.openTimes.close.time, 'HHmm').format('h:mma'),
        },
      };
    },
    closesIn() {
      const { closes } = this.openHours;
      const closeMoment = moment(`${closes.time}`, 'h:mma');
      if (closeMoment.format('a') === 'am' && moment().format('a') !== 'am') closeMoment.add(1, 'd');
      return closeMoment.fromNow();
    },
    pubLink() {
      const dest = `${this.coords.lat},${this.coords.lng}`;
      return `https://www.google.com/maps/place/${dest}`;
    },
    directionsLink() {
      const current = `${this.currentCoords.lat},${this.currentCoords.lng}`;
      const dest = `${this.coords.lat},${this.coords.lng}`;
      return `https://www.google.com/maps/dir/${current}/${dest}/data=!4m2!4m1!3e2`;
    },
  },
  methods: {
    openDirections() {
      window.open(this.directionsLink, '_blank');
    },
    handleModal() {
      this.imageModal = !this.imageModal;
    },
    share() {
      const text = "I'm going here...";
      if ('share' in navigator) {
        navigator.share({
          title: this.name,
          text,
          url: this.pubLink,
        });
      } else {
        window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${text} - `,
        )}${this.pubLink}`;
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
