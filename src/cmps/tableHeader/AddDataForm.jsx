import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Modal from '../util/Modal'

const AddDataForm = ({ isOpen, onRequestClose, onAddData, columns }) => {
	const [newData, setNewData] = useState({})
	const [error, setError] = useState('')

	useEffect(() => {
		const initialData = {}
		columns.forEach((column) => {
			if (column.type === 'boolean') {
				initialData[column.id] = false
			} else if (column.type === 'number') {
				initialData[column.id] = 0
			} else if (column.type === 'string') {
				initialData[column.id] = ''
			} else {
				initialData[column.id] = null
				setError('Error: Unknown column type')
			}
		})
		setNewData(initialData)
	}, [columns])

	const handleChange = (event, column, type) => {
		const value = type === 'boolean' ? event.target.checked : event.target.value
		setNewData({ ...newData, [column.id]: value })
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		onAddData(newData)
		onRequestClose()
	}
	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose}>
			{error && <p>{error}</p>}
			<div className="add-data-form">
				<h2 id="form-title">Add Data</h2>
				<form onSubmit={handleSubmit} aria-labelledby="form-title">
					<div className="columns">
						{columns.map((column) => (
							<label key={column.id}>
								{column.title}:
								{column.type === 'boolean' ? (
									<label className="checkbox-container">
										<input
											className="hidden-checkbox"
											type="checkbox"
											checked={newData[column.id] || false}
											onChange={(e) => handleChange(e, column, column.type)}
										/>
										<span className="custom-checkbox" />
									</label>
								) : (
									<input
										type={column.type === 'number' ? 'number' : 'text'}
										value={newData[column.id] || ''}
										onChange={(e) => handleChange(e, column, column.type)}
										required
									/>
								)}
							</label>
						))}
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</Modal>
	)
}

AddDataForm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func.isRequired,
	onAddData: PropTypes.func.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	).isRequired,
}

export default AddDataForm
