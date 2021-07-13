import { useEffect, useState } from 'react';
import DeveloperFormModal from '../components/DeveloperFormModal';
import DeveloperTable from '../components/DeveloperTable';
import { useAppUtilsContext } from '../contexts/appUtilsContext/Context';
import { useConfirmationDialog } from '../hooks/useConfirmationDialog';
import { useError } from '../hooks/useError';
import { Developer } from '../interfaces/Developer';
import * as developerService from "../services/developer_service";

export default function DeveloperPage() {
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer>();
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { setLoading, setAlert } = useAppUtilsContext();
  const { getConfirmation } = useConfirmationDialog();
  const { showError } = useError();

  const onSubmit = async (developer: Developer) => {
    if (!developer.id) {
      createDeveloper(developer);
    } else {
      handleUpdate(developer);
    }
  }

  const createDeveloper = async (developer: Developer) => {
    try {
      setLoading(true);
      const savedDeveloper = await developerService.save(developer);
      setDevelopers([...developers, savedDeveloper]);
      handleCloseModal();
      setLoading(false);
      setAlert({
        message: "Desenvolvedor criado com sucesso",
        open: true,
        type: "success"
      });
    } catch (error) {
      showError(error);
    }
  }

  const handleUpdate = async (developer: Developer) => {
    try {
      setLoading(true);
      const updatedDeveloper = await developerService.update(developer);
      const index = developers.findIndex(d => d.id == developer.id);
      developers[index] = updatedDeveloper;
      setDevelopers([...developers]);
      setLoading(false);
      handleCloseModal();
      setAlert({
        message: "Desenvolvedor alterado com sucesso",
        open: true,
        type: "success"
      });
    } catch (error) {
      showError(error);
    }
  }
  
  const getDevelopers = async () => {
    try {
      setLoading(true);
      const developers = await developerService.findAll();
      setDevelopers(developers);
      setLoading(false);
    } catch (error) {
      showError(error);
    }
  }

  const handleEditClickButton = (developer: Developer) => {
    setSelectedDeveloper(developer);
    handleOpenModal();
  }

  const handleDelete = async (developer: Developer) => {
    try {
      const confirmed = await getConfirmation({
        title: "Exclusão de Desenvolvedor",
        message: "Tem certeza que deseja excluir?"
      });
      if (!confirmed)
        return;

      setLoading(true);
      await developerService.remove(developer);
      const index = developers.findIndex(d => d.id == developer.id);
      developers.splice(index, 1);
      setDevelopers([...developers]);
      setLoading(false);
      handleCloseModal();
      setAlert({
        message: "Desenvolvedor excluído com sucesso",
        open: true,
        type: "success"
      });
    } catch (error) {
      showError(error);
    }

  }

  const handleCloseModal = () => {
    setSelectedDeveloper(undefined);
    setModalOpen(false);
  }
  const handleOpenModal = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    getDevelopers();
  }, []);

  return (
    <>
      {
        modalOpen ?
          <DeveloperFormModal
            visible={modalOpen}
            onClose={handleCloseModal}
            onSubmit={onSubmit}
            developer={selectedDeveloper}
          /> : null
      }
      <DeveloperTable
        developers={developers}
        onDelete={handleDelete}
        onEditClick={handleEditClickButton}
        onAddDeveloperClick={handleOpenModal}
      />
    </>

  )
}
