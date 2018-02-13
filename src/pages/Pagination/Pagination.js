import Pagination from 'components/Pagination';


class PaginationDemo extends React.Component {
    render() {
        return (
            <Pagination total={500} current={2} />
        );
    }
}

export default PaginationDemo;
