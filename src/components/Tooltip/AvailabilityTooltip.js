import styled from "@emotion/styled";

const StyledToolTipTitle = styled.h3({
    fontSize: '12.5px',
    margin: 0,
  })

export default function AvailabilityTooltip({ attendeeIds, allAttendees, someMessage, noneMessage }) {
    return (
        <div>
          <StyledToolTipTitle>
            {attendeeIds && attendeeIds.length > 0 ? someMessage : noneMessage}
          </StyledToolTipTitle>
          {attendeeIds?.map((userId) => 
            <div key={userId} style={{marginBottom: '2px', marginTop: '2px'}}>
              {allAttendees[userId]?.user_name || 'Unknown User'}
            </div>
          )}
        </div>
      );
}