import * as React from 'react';

import { useTheme } from '@material-ui/core';

import {
    Box,
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Chip,
    Typography
} from '@material-ui/core'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ROOM_DATABASE = [
    { id: 1, floor: 3, name: '301' },
    { id: 2, floor: 3, name: '302' },
    { id: 3, floor: 3, name: '303' },
    { id: 4, floor: 3, name: '304' },
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function RoomSelector() {
    const theme = useTheme();
    const [selectedRooms, setSelectedRooms] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedRooms(value);
    };

    return (
        <div>
            <FormControl>
                <InputLabel>Rooms</InputLabel>
                <Select
                    multiple
                    value={selectedRooms}
                    onChange={handleChange}
                    input={<OutlinedInput label="Rooms" />}
                    renderValue={rooms => (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {rooms.map(room => (
                                room.name
                                // <Chip key={room} label={room} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {/* {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))} */}

                    {
                        ROOM_DATABASE.map(room =>
                            <MenuItem key={room.id} value={room}>
                                <span>
                                    <Typography>{room.name}</Typography>
									{room.floor && (
										<Typography color="textSecondary">{(room.floor)} Floor</Typography>
									)}
                                </span> 
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}
