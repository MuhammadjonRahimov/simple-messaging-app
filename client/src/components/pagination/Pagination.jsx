import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';

function Pagination({ pagination, url, courseId }) {
	const [params] = useSearchParams();
	let page = pagination?.page || params.get('page') || 1;
	const paginationItems = Array.from({ length: pagination?.totalPages });
	return (
		<div className={styles.pagination}>
			{paginationItems.map((_, i) => {
				return (
					<Link
						key={i + 1}
						to={
							// `/${url}?courseId=${courseId}&&page=${i + 1}`
							courseId ? `?courseId=${courseId}&&page=${i + 1}` :
								`/${url}?page=${i + 1}`
						}
						className={+page === i + 1 ? styles.active : ''}
					>
						{i + 1}
					</Link>
				)
			})}
		</div>
	)
}
export default Pagination;