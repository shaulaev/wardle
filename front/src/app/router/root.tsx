import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { E_Routes } from './routes';
import HomePage from '../../pages/HomePage';

const Root: React.FC = () => {
  return (
    <Routes>
        <Route index path={E_Routes.home} element={<HomePage />} />
    </Routes>
  )
}

export default Root;