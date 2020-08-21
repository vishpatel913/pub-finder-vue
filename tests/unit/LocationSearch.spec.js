import { mount } from '@vue/test-utils';
import LocationSearch from '@/components/LocationSearch.vue';

describe('LocationSearch.vue Test', () => {
  let mockOnSubmit;

  beforeEach(() => {
    mockOnSubmit = jest.fn();
  });

  it('calls the submit function with the correct param when input has value', async () => {
    const wrapper = mount(LocationSearch, {
      propsData: {
        onSubmit: mockOnSubmit,
      },
    });

    await wrapper.find('input').setValue('test input');
    await wrapper.find('button').trigger('click');

    expect(mockOnSubmit).toHaveBeenCalledWith('test input');
  });

  it('renders placeholder when no input is submitted', async () => {
    const wrapper = mount(LocationSearch, {
      propsData: {
        onSubmit: mockOnSubmit,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(wrapper.find('input').attributes().placeholder).toMatch('Please enter search term');
  });
});
