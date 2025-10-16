import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import InfoIcon from '@mui/icons-material/Info';
import { Box } from "@mui/material";
import { TeacherContext } from '../utils/TeacherContext';
import { useContext } from 'react';
import { redirect } from 'next/navigation';


const ListComponent = (props) => {
    
    const {setTeacher} = useContext(TeacherContext);
    
    const handleClick = (item) => {
        setTeacher({
            id: item.id,
            general: item.general,
            topic: item.topic,
            projectStart: item.projectStart,
            projectEnd: item.projectEnd,
            initial: item.initial,
            goal: item.goal,
            implementation: item.implementation,
            timeManagement: item.timeManagement,
            presentationTools: item.presentationTools,
            attachments: item.Attachments,
            accepted: item.accepted,
            forChecking: item.forChecking,
            ldapUsernameStudent: item.ldapUsernameStudent,
            ldapUsernameTeacher: item.ldapUsernameTeacher,
            teacherComment: item.teacherComment
        });

        redirect(`/viewTeacher?proposalId=${item.id}`);
    }
    
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 480,
                maxHeight: 600, // height approx for 10 list items (adjust as needed)
                overflowY: 'auto',
                margin: '0 auto',
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1
            }}
        >
            <List>
                {props.antrag ? props.antrag.map((value) => (
                    <ListItem
                        key={value.ldapUsernameStudent}
                        disablePadding
                        secondaryAction={
                            <Icon edge="end" aria-label="comments" sx={{ fontSize: 28, p: 1.5 }}>
                                <InfoIcon fontSize="inherit" />
                            </Icon>
                        }
                    >
                        <ListItemButton
                            role={undefined}
                            onClick={() => handleClick(value)}
                            dense={false}
                            sx={{ py: 2, px: 3 }}
                        >
                            <ListItemText
                                id={value.ldapUsernameStudent}
                                primary={`${value.topic} ( ${value.ldapUsernameStudent} )`}
                                primaryTypographyProps={{ fontSize: '1.1rem' }}
                            />
                        </ListItemButton>
                    </ListItem>
                )) : null}
            </List>
        </Box>
    );
}
export default ListComponent;