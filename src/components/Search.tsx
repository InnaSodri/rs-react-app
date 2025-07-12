import React, { Component } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface Props {
  onSearch: (term: string) => void;
  initialValue?: string;
}

interface State {
  searchTerm: string;
}

export class Search extends Component<Props, State> {
  private STORAGE_KEY = 'movies-search-term';

  constructor(props: Props) {
    super(props);

    // Load saved term from localStorage or use initialValue prop or empty string
    const savedTerm = localStorage.getItem(this.STORAGE_KEY) || '';
    this.state = {
      searchTerm: props.initialValue || savedTerm,
    };

    // Bind handlers
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // Perform search if there is a saved or initial term
    if (this.state.searchTerm) {
      this.props.onSearch(this.state.searchTerm);
    }
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSearch() {
    const term = this.state.searchTerm.trim();
    localStorage.setItem(this.STORAGE_KEY, term);
    this.props.onSearch(term);
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  render() {
    return (
      <div className="flex w-full max-w-3xl mx-auto mt-8 shadow-lg rounded-md overflow-hidden">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search movies..."
          className="flex-grow border-none px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={this.handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-lg font-semibold transition"
          aria-label="Search movies"
        >
          <SearchIcon className="w-5 h-5 inline-block mr-2" />
          Search
        </button>
      </div>
    );
  }
}
