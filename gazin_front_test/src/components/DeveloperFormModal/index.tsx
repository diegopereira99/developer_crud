import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem } from '@material-ui/core';
import styles from './styles.module.scss';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { Developer } from '../../interfaces/Developer';
import { useForm, Controller } from "react-hook-form";
import ControlledInput from '../ControlledInput';

export interface DeveloperFormModalProps {
  developer?: Developer,
  onSubmit: (developer: Developer) => void,
  onClose: () => void,
  visible: boolean,
};

interface DeveloperFormInputs {
  name: string,
  age: number,
  sex: string,
  hobby: string,
  birthDate: string | null
}
const requiredRule = {
  required: "Campo obrigatório"
}

export default function DeveloperFormModal({ visible, onSubmit, developer, onClose }: DeveloperFormModalProps) {
  const { handleSubmit, control, formState: { errors, isValid } } = useForm<DeveloperFormInputs>({
    mode: 'onChange', defaultValues: {
      ...developer,
      sex: developer?.sex ?? '',
      birthDate: developer?.birthDate ?? null
    }
  })

  const handleSave = (data: Developer) => {
    if (isValid) {
      onSubmit(data);
    }
  }

  return (
    <div>
      <Dialog data-testid="developer-form-modal" open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{developer?.id ? "Editar desenvolvedor" : "Novo desenvolvedor"} </DialogTitle>
        <form onSubmit={(handleSubmit(handleSave))}>
          <DialogContent className={styles.developerForm}>
            <ControlledInput
              control={control}
              errors={errors}
              label="Nome"
              name="name"
              rules={requiredRule}
              type="text"
              autoFocus
              required
            />
            <ControlledInput
              control={control}
              errors={errors}
              label="Idade"
              name="age"
              rules={requiredRule}
              type="number"
              required
            />
            <ControlledInput
              control={control}
              errors={errors}
              label="Sexo"
              name="sex"
              rules={requiredRule}
              select
              required
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </ControlledInput>
            <ControlledInput
              control={control}
              errors={errors}
              label="Hobby"
              name="hobby"
              rules={requiredRule}
              type="text"
              required
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
              <Controller
                control={control}
                name="birthDate"
                rules={{
                  required: "Campo obrigatório"
                }}
                render={({ field }) => (
                  <DatePicker
                    className={styles.inputDatePicker}
                    fullWidth
                    format="dd/MM/yyyy"
                    label="Data de Nascimento"
                    data-testid="date-picker"
                    name="birthDate"
                    inputProps={{'aria-label': 'birthDate'}}
                    required
                    value={field.value ? parseISO(field.value) : null}
                    onChange={(e) => {
                      field.onChange(format(e as Date, "yyyy-MM-dd"));
                    }}
                    error={!!errors.birthDate}
                    helperText={errors.birthDate && errors.birthDate.message}
                  />
                )}
              />
            </MuiPickersUtilsProvider>
            <DialogActions className={styles.formActions}>
              <Button color="primary" onClick={onClose}>
                Cancelar
            </Button>
              <Button data-testid="submit-button" disabled={!isValid} type="submit" color="primary">
                Salvar
          </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}