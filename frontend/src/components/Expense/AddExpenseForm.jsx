import React, { useState } from 'react'
import Input from "../Inputs/Input"
import EmojiPickerPopup from '../EmojiPickerPopup'

// Componente para adicionar uma nova despesa
const AddExpenseForm = ({ onAddExpense }) => {
    // Estado local para armazenar os dados da despesa a ser adicionada
    const [expense, setExpense] = useState({
        category: "",  // Categoria da despesa (ex: Aluguer, Compras)
        amount: "",    // Valor da despesa
        date: "",      // Data da despesa
        icon: "",      // Ícone selecionado para representar a despesa
    });

    // Função para atualizar um campo do objeto expense no estado
    const handleChange = (key, value) => setExpense({...expense, [key]: value });

    return (
      <div>
        {/* Componente para escolher um emoji/ícone para a despesa */}
        <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        {/* Input para a categoria da despesa */}
        <Input
            value={expense.category}
            onChange={({ target }) => handleChange("category", target.value)}
            label="Categoria"
            placeholder="Aluguer, Compras, etc."
            type="text"
        />

        {/* Input para o montante/valor da despesa */}
        <Input
            value={expense.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Montante"
            placeholder=""
            type="number"
        />

        {/* Input para a data da despesa */}
        <Input
            value={expense.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Data"
            placeholder=""
            type="date"
        />

        {/* Botão para adicionar a despesa, chama a função onAddExpense com os dados */}
        <div className='flex justify-end mt-6'>
            <button
                type="button"
                className='add-btn add-btn-fill'
                style={{ backgroundColor: '#28a745', color: 'white' }}
                onClick={() => onAddExpense(expense)}
            >
                Adicionar Despesa
            </button>
        </div>
      </div>
    )
}

export default AddExpenseForm
