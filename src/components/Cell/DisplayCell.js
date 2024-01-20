import styled from "@emotion/styled";
import { TableCell, Tooltip } from "@mui/material";

const StyledDiv = styled.div({
  display: 'flex',
  position: 'relative',
  alignContent: 'center',
  justifyContent: 'center',
  height: '17.5px',
});

export default function DisplayCell({ epochTime, isHour, availability, users }) {
  const opacity = availability ? (availability.length / Object.keys(users).length) : 0;
  
  const generateTooltipTitle = () => {
    if (!availability || availability.length === 0) {
      return 'Nobody available';
    }

    const userNames = availability.map(userId => users[userId]?.user_name || 'Unknown User').join(', ');
    return `People available: ${userNames}`;
  };
  
  return (
    <TableCell 
      id={epochTime}
      key={epochTime}
      sx={{ 
        padding: '0',
        backgroundColor: '#00A63C',
        opacity: opacity,
        border: 1,
        borderColor: '#C1C1C1',
        borderTopStyle: 'dashed',
        borderBottom: isHour ? 1 : 0,
        zIndex: 0
      }}
    >
      <Tooltip title={generateTooltipTitle()} arrow>
        <StyledDiv />
      </Tooltip>
    </TableCell>
  )
}
