import React, {
  PropTypes,
} from 'react';
require('./Input.style.scss');

const Input = (props) => {
  const {
    name,
    id,
    className,
    required,
    placeholder,
    label,
    meta,
    input
  } = props;

  return (
    <div className="input-wrapper">
      <input
        readOnly={meta.submitting}
        { ...input }
        className="input"
        placeholder={placeholder}
      />
      { meta.submitFailed && !!meta.error && <span className="err-msg">{meta.error}</span> }
    </div>
  );
};

export default Input;
