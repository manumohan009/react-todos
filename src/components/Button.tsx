import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const StyledButton = styled.button<Omit<ButtonProps, 'children'>>`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: ${props => {
    switch (props.size) {
      case 'sm':
        return '0.375rem 0.75rem';
      case 'lg':
        return '0.75rem 1.5rem';
      default:
        return '0.5rem 1rem';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'sm':
        return '0.875rem';
      case 'lg':
        return '1.25rem';
      default:
        return '1rem';
    }
  }};
  line-height: 1.5;
  border-radius: 0.375rem;
  transition: all 0.15s ease-in-out;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.65 : 1)};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          color: white;
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          &:hover:not(:disabled) {
            background-color: #0056b3;
            border-color: #0056b3;
          }
        `;
      case 'secondary':
        return `
          color: white;
          background-color: var(--secondary-color);
          border-color: var(--secondary-color);
          &:hover:not(:disabled) {
            background-color: #545b62;
            border-color: #545b62;
          }
        `;
      case 'success':
        return `
          color: white;
          background-color: var(--success-color);
          border-color: var(--success-color);
          &:hover:not(:disabled) {
            background-color: #1e7e34;
            border-color: #1e7e34;
          }
        `;
      case 'danger':
        return `
          color: white;
          background-color: var(--danger-color);
          border-color: var(--danger-color);
          &:hover:not(:disabled) {
            background-color: #c82333;
            border-color: #c82333;
          }
        `;
      case 'warning':
        return `
          color: #212529;
          background-color: var(--warning-color);
          border-color: var(--warning-color);
          &:hover:not(:disabled) {
            background-color: #e0a800;
            border-color: #d39e00;
          }
        `;
      case 'info':
        return `
          color: white;
          background-color: var(--info-color);
          border-color: var(--info-color);
          &:hover:not(:disabled) {
            background-color: #138496;
            border-color: #117a8b;
          }
        `;
      default:
        return `
          color: #212529;
          background-color: white;
          border-color: #6c757d;
          &:hover:not(:disabled) {
            background-color: #e9ecef;
            border-color: #6c757d;
          }
        `;
    }
  }}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </StyledButton>
  );
};
