import React from 'react';

const ListItem = ({ item, onDelete, onEdit, onDone }) =>
  item.map(activity => {
    return (
      <tr className={activity.done? "bg-success" :"bg-white"}>
        <td>{activity.activity}</td>
        <td>{activity.time}</td>
        <td>{activity.place}</td>
        <td>{activity.done ? 'Concluído' : 'Pendente'}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={() => onDone(activity.id)}>
            Marcar como concluído
          </button>
          <button className="btn btn-info mr-1" onClick={() => onEdit(activity.id)}>
            Editar
          </button>
          <button className="btn btn-danger mr-1" onClick={() => onDelete(activity.id)}>
            Deletar
          </button>
        </td>
      </tr>
    );
  });

export default ListItem;
