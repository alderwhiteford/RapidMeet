import styled from "@emotion/styled";
import { TableCell } from "@mui/material";
import { useState } from "react";

export default function SelectCell({ epochTime, isMouseDown }) {
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
    alignContent: 'center',
    justifyContent: 'center',
    height: '20px',
  })
  
  return (
    <TableCell 
      sx={{ 
        padding: '5px', 
        backgroundColor: selected ? '#97c9a5' : '#E0E0E0',
        border: 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseLeave}
    >
      <StyledDiv>
      </StyledDiv>
    </TableCell>
  )
}
