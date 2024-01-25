import styled from "@emotion/styled";
import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";

const StyledDiv = styled.div({
  display: 'flex',
  position: 'relative',
  alignContent: 'center',
  justifyContent: 'center',
  height: '17.5px',

  '@media (max-width: 768px)': {
    minHeight: '18px',
  },
});

export default function SelectCell({ epochTime, isMouseDown, isHour, setTime, selectedState, setDeletedTime }) {
  const [selected, setSelected] = useState(selectedState);
  const [mouseEntered, setMouseEntered] = useState(false);

  useEffect(() => {
    if (selected) {
      setTime((times) => {
        times.add(epochTime);
        return times;
      })
      setDeletedTime((deletedTimes) => {
        deletedTimes.delete(epochTime);
        return deletedTimes;
      })
    } else {
      setTime((times) => {
        times.delete(epochTime);
        return times;
      })
      setDeletedTime((deletedTimes) => {
        deletedTimes.add(epochTime);
        return deletedTimes
      })
    }
  }, [epochTime, selected, setDeletedTime, setTime])

  const handleMouseEnter = () => {
    if (!mouseEntered && isMouseDown) {
      setSelected(!selected);
      setMouseEntered(true)
    }
  }

  const handleTouchStart = () => {
    if (!mouseEntered) {
      setSelected(!selected);
      setMouseEntered(true)
    }
  }

  const handleMouseLeave = () => {
    setMouseEntered(false)
  }
  
  return (
    <TableCell 
      sx={{ 
        padding: '0',
        backgroundColor: selected ? '#97c9a5' : 'white',
        border: 1,
        borderColor: '#C1C1C1',
        borderTopStyle: selected ? '' : 'dashed',
        borderBottom: isHour ? 1 : 0,
        zIndex: selected ? 1 : 0
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUpCapture={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseLeave}
      onMouseDownCapture={() => setSelected(!selected)}
    >
      <StyledDiv />
    </TableCell>
  )
}
