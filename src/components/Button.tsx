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

// Design tokens for consistency
const tokens = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
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

const StyledButton = styled.button<Omit<ButtonProps, 'children'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 2px solid transparent;
  border-radius: ${tokens.borderRadius.md};
  transition: all 0.2s ease-in-out;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  font-family: inherit;
  text-decoration: none;
  white-space: nowrap;
  min-height: 2.5rem;

  // Size variants
  padding: ${props => {
    switch (props.size) {
      case 'sm':
        return `${tokens.spacing.sm} ${tokens.spacing.md}`;
      case 'lg':
        return `${tokens.spacing.md} ${tokens.spacing.xl}`;
      default:
        return `${tokens.spacing.md} ${tokens.spacing.lg}`;
    }
  }};

  font-size: ${props => {
    switch (props.size) {
      case 'sm':
        return tokens.fontSize.sm;
      case 'lg':
        return tokens.fontSize.lg;
      default:
        return tokens.fontSize.base;
    }
  }};

  line-height: 1.5;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${tokens.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${tokens.shadows.sm};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  // Variant styles
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          color: white;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-color: #3b82f6;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            border-color: #2563eb;
          }
        `;
      case 'secondary':
        return `
          color: #64748b;
          background: white;
          border-color: #e2e8f0;
          &:hover:not(:disabled) {
            background: #f8fafc;
            border-color: #cbd5e1;
            color: #475569;
          }
        `;
      case 'success':
        return `
          color: white;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-color: #10b981;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            border-color: #059669;
          }
        `;
      case 'danger':
        return `
          color: white;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border-color: #ef4444;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            border-color: #dc2626;
          }
        `;
      case 'warning':
        return `
          color: #92400e;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          border-color: #f59e0b;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
            border-color: #d97706;
          }
        `;
      case 'info':
        return `
          color: white;
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          border-color: #06b6d4;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
            border-color: #0891b2;
          }
        `;
      default:
        return `
          color: #1e293b;
          background: white;
          border-color: #e2e8f0;
          &:hover:not(:disabled) {
            background: #f8fafc;
            border-color: #cbd5e1;
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
