import styled from "@emotion/styled"
import { TableCell } from "@mui/material"

export default function HeaderCell({ day, date, lastCol }) {
  const StyledDiv = styled.div({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    color: 'white',
  })

  const HeaderDay = styled.h1({
    margin: 0,
    fontSize: '20px',
    marginBottom: '5px'
  })

  const HeaderDate = styled.h2({
    margin: 0,
    fontSize: '15px',
    fontWeight: 400,
  })
  
  return (
    <TableCell sx={!lastCol ? { borderRight: 1, borderColor: 'white', backgroundColor: '#04a43c' } : { backgroundColor: '#04a43c' }}>
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