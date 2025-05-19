'use client'
import { createContext } from 'react'
import type { PaginationModel } from '.';

export const PaginationContext = createContext<PaginationModel>({} as PaginationModel);