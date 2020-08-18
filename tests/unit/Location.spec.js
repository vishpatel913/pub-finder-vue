import { shallowMount } from '@vue/test-utils';
import Location from '@/components/Location.vue';

describe('Location.vue Test', () => {
  it('renders correct location text from component props', () => {
    const wrapper = shallowMount(Location, {
      propsData: {
        title: 'Battersea',
        city: 'London',
      },
    });

    expect(wrapper.find('.heading').text()).toMatch('Battersea');
    expect(wrapper.find('.sub-heading').text()).toMatch('London');
  });

  it('renders correct loading state when no props', () => {
    const wrapper = shallowMount(Location);

    expect(wrapper.find('.heading').text()).toMatch('Loading');
    expect(wrapper.findAll('.sub-heading').length).toEqual(0);
  });
});
