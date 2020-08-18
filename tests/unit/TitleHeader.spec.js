import { shallowMount } from '@vue/test-utils';
import TitleHeader from '@/components/TitleHeader.vue';

describe('TitleHeader.vue Test', () => {
  it('renders default title when component is created', () => {
    const wrapper = shallowMount(TitleHeader);

    expect(wrapper.text()).toMatch('Pubs Nearby');
  });

  it('renders correct title when component is passed props', () => {
    const wrapper = shallowMount(TitleHeader, {
      propsData: {
        title: 'Test Title',
      },
    });

    expect(wrapper.text()).toMatch('Test Title');
  });
});
