import TableList from '../cmps/TableList'
import AddDataForm from '../cmps/AddDataForm'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
const DEMO_DATA = {
	columns: [
		{
			id: 'name',
			ordinalNo: 1,
			title: 'Name',
			type: 'string',
			width: 100,
		},
		{
			id: 'age',
			ordinalNo: 2,
			title: 'Age',
			type: 'number',
			width: 100,
		},
		{
			id: 'email',
			ordinalNo: 3,
			title: 'Email',
			type: 'string',
			width: 200,
		},
	],
	data: [
		{
			id: '101uid',
			name: 'John Doe',
			age: 32,
			email: 'john@example.com',
		},
		{
			id: '102uid',
			name: 'Jane Doe',
			age: 28,
			email: 'jane@example.com',
		},
	],
}
const BoardDetails = () => {
	const [tableData, setTableData] = useState(() => {
		const savedData = localStorage.getItem('tableData')
		return savedData ? JSON.parse(savedData) : DEMO_DATA
	})

	const [isModalOpen, setModalOpen] = useState(false)

	const saveTableData = (newTableData) => {
		localStorage.setItem('tableData', JSON.stringify(newTableData))
	}

	const handleTableDataChange = (newData) => {
		setTableData(newData)
		saveTableData(newData)
	}

	const handleColWidthChange = (columnId, newWidth) => {
		setTableData((prevTableData) => {
			const newTableData = {
				...prevTableData,
				columns: prevTableData.columns.map((col) => {
					if (col.id === columnId) {
						return {
							...col,
							width: newWidth,
						}
					} else {
						return col
					}
				}),
			}
			saveTableData(newTableData)
			return newTableData
		})
	}

	// const ordinalNo = Math.max(...tableData.data.map((d) => +d.ordinalNo), 0) + 1 //TODO add column
	const handleAddData = (newData) => {
		setTableData((prevTableData) => {
			const newTableData = {
				...prevTableData,
				data: [...prevTableData.data, { id: uuidv4(), ...newData }],
			}
			localStorage.setItem('tableData', JSON.stringify(newTableData))
			return newTableData
		})
		setModalOpen(false)
	}

	return (
		<div className="App">
			<button onClick={() => setModalOpen(true)}>Add Data</button>
			<TableList
				tableData={tableData}
				handleTableDataChange={handleTableDataChange}
				handleColWidthChange={handleColWidthChange}
			/>
			<AddDataForm
				isOpen={isModalOpen}
				onRequestClose={() => setModalOpen(false)}
				onAddData={handleAddData}
			/>
		</div>
	)
}

export default BoardDetails