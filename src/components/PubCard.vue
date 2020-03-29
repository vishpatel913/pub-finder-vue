<template>
  <div class="card-container">
    <div @click="handleModal">
      <h3>
        {{ details.name }} <span class="distance">({{ walkingDistance }}min walk)</span>
      </h3>
      <div class="content">
        <p class="address">
          {{ details.address }}
        </p>
        <p v-if="details.openTimes[0]">
          Closes: {{ openHours.closes.time }} <strong>({{ closesIn }})</strong>
        </p>
      </div>
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
    <a-modal
      v-model="imageModal"
      class="modal"
      centered
      destroy-on-close
      :footer="null"
      :body-style="{ padding: '1rem' }"
      :closable="false"
    >
      <lazy-image
        :source="image.url"
        :alt="image.alt"
      />
      <span class="image-author"> <a-icon type="camera" /> {{ image.attribution }} </span>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import LazyImage from './LazyImage.vue';

export default {
  name: 'PubCard',
  components: {
    'lazy-image': LazyImage,
  },
  props: {
    details: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    imageModal: false,
  }),
  computed: {
    ...mapState(['coords']),
    walkingDistance() {
      const { distance } = this.details.directions;
      return Math.round(distance / 1.34 / 60);
    },
    image() {
      const { url, attribution } = this.details.photos[0];
      return {
        url,
        attribution,
      };
    },
    openHours() {
      const { open, close } = this.details.openTimes[0];
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
      const closeMoment = moment(`${closes.time}`, 'h:mma');
      if (closeMoment.format('a') === 'am' && moment().format('a') !== 'am') closeMoment.add(1, 'd');
      return closeMoment.fromNow();
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
    handleModal() {
      this.imageModal = !this.imageModal;
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
  padding: @padding-sm 0;
  width: 100%;
  h3 {
    color: @heading-black-color;
    line-height: 1.5;
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
.modal {
  .image-author {
    position: absolute;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    font-weight: lighter;
    font-size: 8px;
    padding: @padding-sm;
    bottom: @padding-md;
    right: @padding-md;
  }
}
</style>
