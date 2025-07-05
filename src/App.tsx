import React from 'react';
import styled from 'styled-components';
import { TodoPage } from './pages/TodoPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--light-color);
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <TodoPage />
    </AppContainer>
  );
};

export default App;
