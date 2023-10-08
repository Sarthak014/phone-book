import SearchIcon from '@mui/icons-material/Search';
import Search from '../components/Search';
import SearchIconWrapper from "../components/SearchIconWrapper";
import StyledInputBase from "../components/StyledInputBase";
import { useEffect, useMemo } from 'react';
import debounce from "lodash/debounce";
import { useDispatch } from 'react-redux';
import { setSearchText, updateFilteredContact } from '../store/contactSlicer';

function SearchBar() {
  const dispatch = useDispatch();

  const filterContact = (e) => {
    const searchText = e.target.value;

    dispatch(setSearchText({searchText: searchText}));
    dispatch(updateFilteredContact());
  };

  const handleContactSearch = useMemo(() => {
    return debounce(filterContact, 300, {
      'leading':false,
      'trailing': true
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => handleContactSearch.cancel();
  });

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleContactSearch}
      />
    </Search>
  );
}

export default SearchBar;
