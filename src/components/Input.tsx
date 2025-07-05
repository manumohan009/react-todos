import React from 'react';
import styled from 'styled-components';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-color);
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--dark-color);
  background-color: white;
  background-clip: padding-box;
  border: 1px solid
    ${props => (props.hasError ? 'var(--danger-color)' : '#ced4da')};
  border-radius: 0.375rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  font-family: inherit;

  &:focus-visible {
    color: var(--dark-color);
    background-color: white;
    border-color: ${props =>
      props.hasError ? 'var(--danger-color)' : 'var(--primary-color)'};
    outline: 2px solid ${props =>
      props.hasError ? 'var(--danger-color)' : 'var(--primary-color)'};
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #6c757d;
    opacity: 1;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  error,
  required = false,
  disabled = false,
  className,
}) => {
  return (
    <InputContainer className={className}>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: 'var(--danger-color)' }}> *</span>}
        </Label>
      )}
      <StyledInput
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        hasError={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};
