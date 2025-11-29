import type { Meta, StoryObj } from '@storybook/react';
import { SampleForm } from '../components/SampleForm';

const meta = {
  title: 'Example/SampleForm',
  component: SampleForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SampleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithDefaultValue: Story = {
  args: {
    // We'll need to modify the component to accept default values
  },
};