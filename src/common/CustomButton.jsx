import Button from '@mui/material/Button';
import React from 'react';

const styles1 = {
  padding: '8px 18px',
  border: 'none',
  color: '#000',
  fontWeight: '700',
  background: 'linear-gradient(99.06deg, #07A1C0 5.35%, #99D592 123.96%), #07A1C0',
};

const disabledStyles = {
  '&:disabled': {
    padding: '8px 18px',
    fontWeight: '700',
    border: '1px solid #6A6A78',
    color: '#6A6A78',
    backgroundColor: '#2F3344',
  },
};

const CustomButton = ({
  disabled,
  children,
  onClick,
  variant = 'outlined',
  width,
  size,
  icon,
  borderRadius,
  type = 'button',
  bgcolor,
}) => {

  const styles = {
    border: '1px solid transparent',
    background: `linear-gradient(to right, ${bgcolor}, ${bgcolor}), linear-gradient(to right, #07a1c0, #99d592)`,
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    padding: '8px 18px',
    '&:hover': {
      border: '1px solid transparent',
      background: `linear-gradient(to right, ${bgcolor}, ${bgcolor}), linear-gradient(to right, #07a1c0, #99d592)`,
      backgroundClip: 'padding-box, border-box',
      backgroundOrigin: 'padding-box, border-box',
    },
  };

  return(
  <div className={width}>
    <Button
      style={{ borderRadius, textTransform: 'none' }}
      fullWidth
      size={size}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      startIcon={icon}
      className="font-audiowide"
      type={type}
      sx={
        variant === 'outlined' && !disabled
          ? styles
          : variant === 'contained' && !disabled
            ? styles1
            : disabled && variant === 'contained'
              ? {
                '&:disabled': {
                  padding: '8px 16px',
                  fontWeight: '700',
                  border: 'none',
                  color: '#6A6A78 !important',
                  backgroundColor: '#2F3344',
                },
              }
              : disabled
                ? disabledStyles
                : ''
      }
    >
      <p className="w-full font-audiowide text-sm">{children}</p>
    </Button>
  </div>
)};
CustomButton.defaultProps = {
  disabled: false,
  children: null,
  variant: '',
  width: '',
  size: '',
  icon: '',
  borderRadius: '',
  onClick: function test() { },
};
export default CustomButton;
