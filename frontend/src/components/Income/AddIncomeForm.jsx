import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

// Componente para adicionar um novo rendimento/income
const AddIncomeForm = ({ onAddIncome }) => {
    // Estado local para armazenar os dados do rendimento a ser adicionado
    const [income, setIncome] = useState({
        source: "",   // Fonte do rendimento (ex: salário, investimento)
        amount: "",   // Valor do rendimento
        date: "",     // Data do rendimento
        icon: "",     // Ícone selecionado para representar o rendimento
    });

    // Função para atualizar um campo do objeto income no estado
    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div>
            {/* Componente para selecionar um emoji/ícone para o rendimento */}
            <EmojiPickerPopup
                icon={income.icon} // Ícone atual selecionado
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} // Atualiza o ícone no estado
            />

            {/* Input para fonte do rendimento */}
            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Fonte de Rendimento"
                placeholder="Salário, Investimento, etc."
                type="text"
            />

            {/* Input para o montante/valor do rendimento */}
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Montante"
                placeholder=""
                type="number"
            />

            {/* Input para a data do rendimento */}
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Data"
                placeholder=""
                type="date"
            />

            {/* Botão para adicionar o rendimento, chama a função onAddIncome com os dados */}
            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    style={{ backgroundColor: '#28a745', color: 'white' }}
                    onClick={() => onAddIncome(income)}
                >
                    Adicionar Rendimento
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm
