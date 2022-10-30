import React from 'react';

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
        !composing && props.onChange?.(e);
      }}
      onCompositionStart={(e) => {
        setComposing(true);
      }}
      onCompositionEnd={(e) => {
        const target = e.target;
        if (composing) {
          setComposing(false);
          const inputEvent = new Event('input', { bubbles: true, cancelable: false });
          e.target.dispatchEvent(inputEvent);
        }
      }}
      {...props}
    />
  );
});

export default Input;
