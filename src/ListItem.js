import React from 'react';

const ListItem = ({ item, onDelete, onEdit, onDone }) =>
  item.map(activity => {
    return (
      <tr>
        <td>{activity.activity}</td>
        <td>{activity.time}</td>
        <td>{activity.done ? 'Concluído' : 'Pendente'}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={() => onDone(activity.id)}>
            Marcar como concluído
          </button>
          <button className="btn btn-danger mr-1" onClick={() => onDelete(activity.id)}>
            Deletar
          </button>
          {/* <button className="btn btn-info mr-1" onClick={() => onEdit(activity.id)}>
            Editar
          </button> */}
        </td>
      </tr>
    );
  });

export default ListItem;
