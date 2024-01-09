import styled from "@emotion/styled";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const OptimizerContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '40px',
})

const StyledHeader = styled(Typography)({
    fontSize: '25px',
    color: '#505050',
})

const StyledSubHeader = styled(Typography)({
    fontSize: '17.5px',
    color: '#505050',
    fontWeight: 300,
    marginTop: '5px',
})

export default function OptimizerForm() {
    const { users, dates } = useSelector((state) => state.schedule)

    /**
     * TO BE DELETED IN THE FUTURE - TEMP DATE:
     */
    const names = [
        "Alder Whiteford",
        "Ethan Johnson",
        "Adam Smith",
        "John Hancock",
    ]

    const [requiredAttendees, setRequiredAttendees] = useState([]);
    const [meetingCount, setMeetingCount] = useState(1);
    const [meetingGap, setMeetingGap] = useState();
		const [optimizer, setOptimizer] = useState(false);

		const handleStateChange = (event, setter) => {
			const { target : { value } } = event
			setter(value);
		}

		// Compute the list of total possible meetings: 
		const meetingCountOptions = () => {
			const meetingCountOptions = []
			for (let i = 1 ; i <= dates.length ; i++) {
				meetingCountOptions.push(i);
			}

			return meetingCountOptions;
		}

		// Compute the list of valid gap lengths for meetings:
		const meetingGapOptions = () => {
			const meetingGapOptions = []
			if (meetingCount > 1) {
				const gapDays = dates.length - meetingCount
				const maxGap = Math.floor(gapDays / (meetingCount - 1))
				
				for (let i = 1 ; i <= maxGap ; i++) {
					meetingGapOptions.push(i);
				}
				return meetingGapOptions
			}
			return meetingGapOptions
		}


    return (
        <OptimizerContainer>
					<StyledHeader>
							Schedule Helper
					</StyledHeader>
					<StyledSubHeader>
							Let us help you find your optimal meeting time
					</StyledSubHeader>
					<FormControl sx={{ marginTop: '25px'}}>
						<InputLabel>Required Attendees</InputLabel>
						<Select
							multiple
							value={requiredAttendees}
							onChange={(event) => handleStateChange(event, setRequiredAttendees)}
							input={<OutlinedInput label="Required Attendee" />}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map((value) => (
											<Chip key={value} label={value} />
									))}
								</Box>
							)}
						>
							{names.map((name) => (
								<MenuItem
									key={name}
									value={name}
								>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl sx={{ marginTop: '25px'}}>
						<InputLabel>Number of Meetings</InputLabel>
						<Select
							value={meetingCount}
							onChange={(event) => handleStateChange(event, setMeetingCount)}
							input={<OutlinedInput label="Number of Meetings" />}
						>
						{meetingCountOptions().map((name) => (
								<MenuItem
									key={name}
									value={name}
								>
									{name}
								</MenuItem>
						))}
						</Select>
					</FormControl>
					<FormControl sx={{ marginTop: '25px'}}>
						<InputLabel>Days Between Meetings</InputLabel>
						<Select
							value={meetingGap}
							onChange={(event) => handleStateChange(event, setMeetingGap)}
							input={<OutlinedInput label="Days Between Meetings" />}
							disabled={meetingGapOptions().length === 0}
						>
						{meetingGapOptions().map((name) => (
								<MenuItem
									key={name}
									value={name}
								>
									{name}
								</MenuItem>
						))}
						</Select>
					</FormControl>
        </OptimizerContainer>
    );
}