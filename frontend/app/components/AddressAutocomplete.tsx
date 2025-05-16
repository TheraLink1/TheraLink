// components/AddressAutocomplete.tsx
'use client';

import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ value, onChange }) => {
  const {
    ready,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      componentRestrictions: { country: 'pl' }, // Restrict to Poland
    },
  });

  useEffect(() => {
    setValue(value, false);
  }, [value, setValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();
    onChange(description);
    // Optionally, get latitude and longitude
    // const results = await getGeocode({ address: description });
    // const { lat, lng } = await getLatLng(results[0]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        label="Address"
        value={inputValue}
        onChange={handleInput}
        fullWidth
        placeholder="Start typing to search..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LocationOnIcon color="action" />
            </InputAdornment>
          ),
        }}
        disabled={!ready}
      />
      {status === 'OK' && data.length > 0 && (
        <Paper
          style={{
            position: 'absolute',
            zIndex: 1000,
            left: 0,
            right: 0,
          }}
        >
          <List>
            {data.map(({ place_id, description }) => (
              <ListItem key={place_id} disablePadding>
                <ListItemButton onClick={() => handleSelect(description)}>
                  <ListItemText primary={description} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default AddressAutocomplete;
