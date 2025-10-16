import ContainedButton from "./ContainedButton";
import { Box } from "@mui/material";
import Link from 'next/link';


const MenuComponentButton = (props) => {
    return (
        <Box
            mt={2}
            display="flex"
            justifyContent="center"
            sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%'
            }}>
            {props.onClick ? (
                <ContainedButton text={props.text} handleClick={props.onClick} />
            ) : (
                <Link href={props.url}>
                    <ContainedButton text={props.text} />
                </Link>
            )}
        </Box>
    );


}

export default MenuComponentButton;