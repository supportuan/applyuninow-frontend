import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '../assets/leads/SearchIcon.svg';
import { TextField, Tooltip } from '@mui/material';



export const InputAdornments = ({ handleChange, value, name, label, width , onEnter}) => {

  const handleKeyPress = (e) => {
    if (e.target.value.length === 0 && e.code === 'Space') {
      e.preventDefault()
      return;
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      onEnter && onEnter(e)
    }
  }
  
  return (
    <div className={width}>
      <TextField
        variant="outlined"
        sx={{
          '& .MuiInputBase-input': {
            color: 'white',
            zIndex: 2,
            fontSize: '12px'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#404050',
            borderRadius: '8px',
          },
          backgroundColor: 'transparent',
          textarea: { color: '#FFFFFF' },
          label: {
            color: '#6A6A78',
            fontSize: '12px',
            fontFamily: 'audiowide',
          },
          '& .MuiFormLabel-root.Mui-hovered': {
            color: '#FFCD2C',
          },
          '& .MuiFormLabel-root.Mui-focused': {
            color: '#6A6A78',
            paddingLeft: '4px',
            paddingRight: '4px',
            backgroundColor: '#151929',
            zIndex: 3,
          },
          '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
              borderColor: '#FFFFFF',
            },
          },
          '& .MuiOutlinedInput-root': {
            '& > fieldset': {
              borderColor: '#404050',
            },
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': {
              border: '1px solid transparent',
              background: `linear-gradient(to right, #151929, #151929), linear-gradient(to right, #07a1c0, #99d592)`,
              backgroundClip: 'padding-box, border-box',
              backgroundOrigin: 'padding-box, border-box',
              zIndex: 1,
            },
          },
        }}
        style={{
          fontSize: '12px'
        }}
        fullWidth
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="search">
                <img src={SearchIcon} alt="" className='cursor-pointer' />
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )

}