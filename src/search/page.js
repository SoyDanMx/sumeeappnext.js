import DynamicMap from '../components/DynamicMap';
import NavigationDialog from '../components/NavigationDialog';
import { memo, useState } from 'react';

function Home() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Bienvenido a Sumiee</h1>
      <NavigationDialog onOptionSelect={handleOptionSelect} />
      <div className="w-full max-w-4xl mt-6 shadow-lg rounded-lg overflow-hidden">
        <DynamicMap onOptionSelect={selectedOption} />
      </div>
    </div>
  );
}

export default memo(Home);