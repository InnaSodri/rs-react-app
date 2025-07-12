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

    // Load saved search term or use initialValue
    const savedTerm = localStorage.getItem(this.STORAGE_KEY) || '';
    this.state = {
      searchTerm: props.initialValue || savedTerm,
    };
  }

  componentDidMount() {
    if (this.state.searchTerm) {
      this.props.onSearch(this.state.searchTerm);
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const term = this.state.searchTerm.trim();
    localStorage.setItem(this.STORAGE_KEY, term);
    this.props.onSearch(term);
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8 }}>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Search movies..."
          style={{
            width: '70%',
            padding: '8px',
            borderRadius: 4,
            border: '1px solid #ccc',
            marginRight: 8,
          }}
        />
        <button onClick={this.handleSearch} style={{ padding: '8px 16px' }}>
          <SearchIcon style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
          <span style={{ marginLeft: 6 }}>Search</span>
        </button>
      </div>
    );
  }
}
