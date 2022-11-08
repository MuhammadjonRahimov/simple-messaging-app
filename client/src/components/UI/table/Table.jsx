import styles from './Table.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Table({ cols, data = [] }) {
	const navigate = useNavigate();
	useEffect(() => {
	}, [])


	const bodyContent = data.map((d, i) =>
		<tr key={i}>
			{
				cols.map((col, index) => {
					return <td key={col.header + index}>{d[col.accessor]}</td>
				})
			}
		</tr>
	)
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					{cols.map((col, index) => {
						if (col.header instanceof Function) {
							return <td key={index}>{col.header()}</td>
						} else {
							return <th key={col.header}>{col.header}</th>
						}
					})}
				</tr>
			</thead >
			<tbody>
				{bodyContent}
			</tbody>
		</table >
	)
}
export default Table;