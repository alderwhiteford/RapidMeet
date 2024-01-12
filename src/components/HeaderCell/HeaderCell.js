import styled from "@emotion/styled"
import { TableCell } from "@mui/material"

export default function HeaderCell({ day, date, firstHeader }) {
  const StyledDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    color: 'white',
  })

  const HeaderDay = styled.h1({
    margin: 0,
    fontSize: '17.5px',
    fontWeight: 400,
  })

  const HeaderDate = styled.h2({
    margin: 0,
    fontSize: '12.5px',
    fontWeight: 300,
  })
  
  return (
    <TableCell 
      sx={{ 
        backgroundColor: '#04a43c',
        minWidth: '75px',
        height: '100%',
        border: 0,
        borderRadius: firstHeader ? '5px 0 0 0' : ''
      }}>
      <StyledDiv>
        <HeaderDay>
          {day}
        </HeaderDay>
        <HeaderDate>
          {date}
        </HeaderDate>
      </StyledDiv>
    </TableCell>
  )
}