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

// Design tokens for consistency
const tokens = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
`;

const Label = styled.label`
  font-size: ${tokens.fontSize.sm};
  font-weight: 500;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  display: block;
  width: 100%;
  padding: ${tokens.spacing.md};
  font-size: ${tokens.fontSize.base};
  line-height: 1.5;
  color: #1e293b;
  background-color: white;
  background-clip: padding-box;
  border: 2px solid ${props => (props.hasError ? '#ef4444' : '#e2e8f0')};
  border-radius: ${tokens.borderRadius.md};
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  min-height: 2.5rem;

  &:focus-visible {
    color: #1e293b;
    background-color: white;
    border-color: ${props => (props.hasError ? '#ef4444' : '#3b82f6')};
    outline: none;
    box-shadow: 0 0 0 3px
      ${props =>
        props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }

  &:hover:not(:disabled) {
    border-color: ${props => (props.hasError ? '#f87171' : '#cbd5e1')};
  }

  &:disabled {
    background-color: #f8fafc;
    border-color: #e2e8f0;
    color: #64748b;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: #9ca3af;
    opacity: 1;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: ${tokens.fontSize.sm};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.xs};

  &::before {
    content: '⚠';
    font-size: ${tokens.fontSize.xs};
  }
`;

const RequiredIndicator = styled.span`
  color: #ef4444;
  margin-left: ${tokens.spacing.xs};
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
          {required && <RequiredIndicator>*</RequiredIndicator>}
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
