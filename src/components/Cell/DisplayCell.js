import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

export default function DisplayCell({ epochTime, isHour, availability, users }) {
  const opacity = availability ? (availability.length / Object.keys(users).length) : 0;
  
  const StyledDiv = styled.div({
    display: 'flex',
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
    height: '17.5px',
  })
  
  return (
    <TableCell 
      id={epochTime}
      key={epochTime}
      sx={{ 
        padding: '0',
        backgroundColor: '#013220',
        opacity: opacity,
        border: 1,
        borderColor: '#C1C1C1',
        borderTopStyle: 'dashed',
        borderBottom: isHour ? 1 : 0,
        zIndex: 0
      }}
    >
      <StyledDiv />
    </TableCell>
  )
}
