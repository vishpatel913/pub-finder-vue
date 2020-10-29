import { shallowMount } from '@vue/test-utils';
import PubCard from '@/components/PubCard.vue';
import mockQueryResponse from '../mocks/mockNearbyPubsQuery';

describe('PubCard.vue Test', () => {
  let defaultProps;
  beforeEach(() => {
    const [firstPub] = mockQueryResponse.data.pubs;
    defaultProps = { ...firstPub, openTimes: firstPub.openTimes[0] };
  });

  it('renders correct text from component props', () => {
    const wrapper = shallowMount(PubCard, {
      propsData: {
        ...defaultProps,
      },
    });

    expect(wrapper.find('.header').text()).toMatch('The Magic Garden');
    expect(wrapper.find('.address').text()).toMatch('231 Battersea Park Rd, London');
  });

  it('renders correct walking time from distance', () => {
    const wrapper = shallowMount(PubCard, {
      propsData: {
        ...defaultProps,
      },
    });

    expect(wrapper.find('.distance').text()).toMatch('(2min walk)');
  });

  it('renders closing time in the correct format', () => {
    const wrapper = shallowMount(PubCard, {
      propsData: {
        ...defaultProps,
      },
    });

    expect(wrapper.findAll('.content p').at(1).text()).toMatch('Closes: 1:00am');
  });
});
