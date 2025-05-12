import React from 'react'

const WarningModal = ({handleDeleteTask, id}) => {
  return (
    <dialog className="modal" id={`warningModal_`+id}>
        <div className="modal-box">
            <h3 className="text-3xl text-accent"> Are you sure ? </h3>
            <p className="text-accent py-2"> Are you sure you want to delete this task? </p>
            <button className="btn btn-ghost" onClick={() => document.getElementById(`warningModal_`+id).close()}> Close </button>
            <button className="btn btn-accent py-2" onClick={() => handleDeleteTask(id)}> Delete </button>

        </div>
    </dialog>
  )
}

export default WarningModal