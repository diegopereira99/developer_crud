import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import styles from './styles.module.scss';
import DeveloperFormModal from '../DeveloperFormModal';
import { useState, useEffect } from "react";
import AddIcon from '@material-ui/icons/Add';
import * as developerService from "../../services/developer_service";
import { Developer } from "../../interfaces/Developer";
import { useAppUtilsContext } from "../../contexts/appUtilsContext/Context";
import { parseISO } from "date-fns";
import { useError } from "../../hooks/useError";
import { useConfirmationDialog } from "../../hooks/useConfirmationDialog";


export interface DeveloperTableProps {
    developers: Developer[],
    onEditClick: (developer: Developer) => void,
    onDelete: (developer: Developer) => Promise<void>,
    onAddDeveloperClick: () => void
}


export default function DeveloperTable({ developers, onEditClick, onDelete, onAddDeveloperClick }: DeveloperTableProps) {

    return (
        <TableContainer component={Paper}>
            <div className={styles.addButton}>
                <Button data-testid="add-developer-button" color="primary" size="small" variant="text" startIcon={<AddIcon />} onClick={onAddDeveloperClick}>
                    Desenvolvedor
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.thStyle}>ID</TableCell>
                        <TableCell className={styles.thStyle} align="center">Nome</TableCell>
                        <TableCell className={styles.thStyle} align="center">Idade</TableCell>
                        <TableCell className={styles.thStyle} align="center">Sexo</TableCell>
                        <TableCell className={styles.thStyle} align="center">Hobby</TableCell>
                        <TableCell className={styles.thStyle} align="center">Data de Nascimento</TableCell>
                        <TableCell className={styles.thStyle} align="center">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        developers?.length > 0 ?
                            developers?.map((developer) => (
                                <TableRow key={developer.id}>
                                    <TableCell>{developer.id}</TableCell>
                                    <TableCell align="center">{developer.name}</TableCell>
                                    <TableCell align="center">{developer.age}</TableCell>
                                    <TableCell align="center">{developer.sex}</TableCell>
                                    <TableCell align="center">{developer.hobby}</TableCell>
                                    <TableCell align="center">{parseISO(developer.birthDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">
                                        <IconButton data-testid="delete-button" className={styles.deleteButton} onClick={() => onDelete(developer)} color="primary" size="small">
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                        <IconButton data-testid="edit-button" color="primary" size="small" onClick={() => onEditClick(developer)}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell align="center" colSpan={7}>Nenhum desenvolvedor cadastrado</TableCell>
                            </TableRow>

                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
}