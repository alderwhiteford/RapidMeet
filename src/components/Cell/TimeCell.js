import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

export default function TimeCell({ time, lastCell }) {
  const StyledCell = styled(TableCell)({
    border: 0,
    position: 'sticky',
    left: '0px',
    backgroundColor: 'white',

    '&::before': {
      content: "''",
      position: 'absolute',
      top: -0.5,
      left: '75%',
      width: '25%',
      height: '50%',
      borderTop: time && !lastCell ? '1px solid #C1C1C1' : '',
      boxSizing: 'border-box',
    },

    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: '-49%',
      left: '75%',
      width: '25%',
      height: '50%',
      borderTop: lastCell ? '1px solid #C1C1C1' : '',
      boxSizing: 'border-box',
    },
  });

  const TimeText = styled.p`
    margin: 0;
    position: absolute;
    font-size: 15px;
    top: ${lastCell ? '' : '-14%'};
    bottom: ${lastCell ? '-35%' : ''} ;
    left: 0;
    color: #C1C1C1;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  `
  
  return (
    <StyledCell key={time}>
      {time &&
        <TimeText>
          {time}
        </TimeText>
      }
    </StyledCell>
  );
}