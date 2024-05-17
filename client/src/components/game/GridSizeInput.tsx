import React from "react";
import { useGameContext } from "../../context/GameProvider";

export const GridSizeInput: React.FC = () => {
  const { gridSize, setGridSize } = useGameContext();

  /** @todo
   * restricting to max grid size as 5, as layout is breaking - need to fix it
   */
  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(3, Math.min(5, Number(e.target.value)));
    setGridSize(value);
  };

  return (
    <div className="flex flex-col items-center mb-4 ">
      <input
        type="number"
        value={gridSize}
        onChange={handleGridSizeChange}
        className="w-16 text-center p-1 border rounded text-blue-950 "
        min={3}
        max={15}
      />
    </div>
  );
};
