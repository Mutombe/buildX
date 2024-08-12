import { useState } from 'react';
import UnitForm from './unitForm';
import { Button } from 'react-bootstrap';

const UnitUpload = ({ onUnitsChange }) => {
  const [units, setUnits] = useState([]);

  const handleUnitChange = (unitData) => {
    setUnits([...units, unitData]);
  };

  const handleSubmitUnits = () => {
    onUnitsChange(units);
  };

  return (
    <div>
      <UnitForm onUnitChange={handleUnitChange} />
      <div>
        {units.map((unit, index) => (
          <div key={index}>
            <h5>Unit {index + 1}</h5>
            <p>Name: {unit.name}</p>
            {/* Display more unit details as needed */}
          </div>
        ))}
      </div>
      <Button onClick={handleSubmitUnits}>Submit Units</Button>
    </div>
  );
};

export default UnitUpload;

