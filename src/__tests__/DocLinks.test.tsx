import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DocLinks from '../components/DocLinks';

describe('DocLinks', () => {
  beforeEach(() => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([{ title: 'Doc', url: 'https://example.com' }]),
    });
    (global.fetch as unknown as jest.Mock) = mockFetch;
    localStorage.clear();
  });

  it('loads and displays documentation links', async () => {
    render(<DocLinks />);
    expect(await screen.findByText('Doc')).toBeInTheDocument();
  });

  it('can add a custom link', async () => {
    render(<DocLinks />);
    await screen.findByText('Doc');
    fireEvent.change(screen.getByPlaceholderText('Titre...'), { target: { value: 'Custom' } });
    fireEvent.change(screen.getByPlaceholderText('URL...'), { target: { value: 'https://custom' } });
    fireEvent.click(screen.getByText('Ajouter'));
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });
});
