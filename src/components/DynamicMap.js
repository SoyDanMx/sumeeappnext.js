"use client";

import dynamic from 'next/dynamic';
import { memo } from 'react';

const MapComponent = dynamic(
  () => import('./MapComponent'),
  { ssr: false }
);

function DynamicMap({ onOptionSelect }) {
  return <MapComponent onOptionSelect={onOptionSelect} />;
}

export default memo(DynamicMap);