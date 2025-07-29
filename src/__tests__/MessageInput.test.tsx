import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageInput from '../components/MessageInput';

describe('MessageInput', () => {
  const baseProps = {
    value: '',
    onChange: jest.fn(),
    html: '',
    onChangeHtml: jest.fn(),
    cssjs: '',
    onChangeCssjs: jest.fn(),
    onFile: jest.fn(),
    onGenerate: jest.fn(),
    loading: false,
  };

  it('disables generate button when no value', () => {
    render(<MessageInput {...baseProps} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onGenerate when button clicked', () => {
    const onGenerate = jest.fn();
    render(<MessageInput {...baseProps} value="test" onGenerate={onGenerate} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onGenerate).toHaveBeenCalled();
  });
});
