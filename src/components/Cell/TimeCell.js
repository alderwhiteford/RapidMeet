import styled from "@emotion/styled";

export default function TimeCell({ time, lastCell }) {
  const StyledCell = styled('div')({
    border: 0,
    width: '65px',
    minHeight: '26px',
    position: 'sticky',
    left: '0px',
    fontFamily: 'sans-serif',

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
    top: ${lastCell ? '' : '-30%'};
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