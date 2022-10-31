import React from 'react';

// eslint-disable-next-line max-len
type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
/**
 * 封装支持合成输入的文本 input
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [composing, setComposing] = React.useState(false);
  return (
    <input
      ref={ref}
      onChange={(e) => {
        if (!composing) {
          // eslint-disable-next-line react/prop-types
          props.onChange?.(e);
        }
      }}
      onCompositionStart={() => {
        setComposing(true);
      }}
      onCompositionEnd={(e) => {
        if (composing) {
          setComposing(false);
          const inputEvent = new Event('input', { bubbles: true, cancelable: false });
          e.target.dispatchEvent(inputEvent);
        }
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

export default Input;
