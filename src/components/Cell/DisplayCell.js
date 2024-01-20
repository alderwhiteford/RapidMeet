import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

export default function DisplayCell({ epochTime, isHour, availability, users, isOptimal }) {
  let opacity = availability ? (availability.length / Object.keys(users).length) : 0
  opacity = isOptimal ? 1 : opacity
  
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
        backgroundColor: !isOptimal ? '#00A63C' : '#FAC746',
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
