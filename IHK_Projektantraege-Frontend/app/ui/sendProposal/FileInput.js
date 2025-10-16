import { useContext, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import UploadedFile from "@/app/components/UploadedFile";
import { FileContext } from "@/app/utils/FileContext";
import ContainedButton from "@/app/components/ContainedButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { InputValueContext } from "@/app/utils/InputValueContext";

const FileInput = () => {
    const { files, setFiles } = useContext(FileContext);
    const { inputValue } = useContext(InputValueContext);

    const handleFileChange = async (event) => {
        const newFiles = Array.from(event.target.files);
        const maxTotalSize = 100 * 1024 * 1024; // 100MB in bytes

        const totalCurrentSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
        const totalNewSize = newFiles.reduce((sum, file) => sum + file.size, 0);

        if (totalCurrentSize + totalNewSize > maxTotalSize) {
            alert("Total file size exceeds 100MB. Files not added.");
            return;
        }

        const transformedFiles = await Promise.all(
            newFiles.map(async (file) => ({
                filename: file.name,
                filedata: await toBase64(file),
                filetype: file.type
            }))
        );

        setFiles(prevFiles => [...prevFiles, ...transformedFiles]);
    };

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
    });

    const handleDeleteFile = (fileToDelete) => {
        setFiles(currentFiles => {
            const index = currentFiles.findIndex(item =>
                item.filedata == fileToDelete.filedata
                && item.filename == fileToDelete.filename
                && item.filetype == fileToDelete.filetype);

            if (index === -1) return currentFiles;
            return [
                ...currentFiles.slice(0, index),
                ...currentFiles.slice(index + 1),
            ];
        });
    };

    useEffect(() => {
        if (inputValue.attachments && inputValue.attachments.length > 0) {
            if (files.length === 0) {
                setFiles(inputValue.attachments);
            }
        }
    }, [inputValue.attachments]);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header">
                <Typography component="span">Anlagen</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                borderTop: 'solid lightgrey',
                borderWidth: '1px',
            }}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}>
                    Anlagen auswählen
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                        multiple />
                </Button>

                {files.map((file, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <UploadedFile
                            value={file}
                        />
                        <Button variant="contained"
                            onClick={() => handleDeleteFile(file)}
                            sx={{ width: { xs: '10%', sm: '100px' } }}>
                            {<DeleteIcon />}
                        </Button>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default FileInput;
