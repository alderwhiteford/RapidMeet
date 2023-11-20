import styled from "@emotion/styled";
import { TableCell } from "@mui/material";
import { useState } from "react";

export default function SelectCell({ epochTime, isMouseDown, isHour }) {
  const [selected, setSelected] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);

  const handleMouseEnter = () => {
    if (!mouseEntered && isMouseDown) {
      setSelected(!selected);
      setMouseEntered(true)
    }
  }

  const handleMouseLeave = () => {
    setMouseEntered(false)
  }

  const StyledDiv = styled.div({
    display: 'flex',
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    height: '25px',
  })
  
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
    >
      <StyledDiv>
      </StyledDiv>
    </TableCell>
  )
}
