import PropTypes from 'prop-types';
import i18n from './locale';

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current,
        };
    }

    render() {
        const props = this.props;
        const state = this.state;
        const prefixCls = `${props.rootPrefixCls}-options`;
        const sizeOptions = props.sizeOptions;
        const pageSize = props.pageSize;
        const changeSize = props.changeSize;
        const quickGo = props.quickGo;
        const Select = props.selectComponentClass;
        let changeSelect = null;
        let goInput = null;
        if (!(changeSize || quickGo)) {
            return null;
        }
        if (quickGo) {
            
        }
        return (

        )
    }
}

Options.propTypes = {
    changeSize: PropTypes.func,
    quickGo: PropTypes.func,
    selectComponentClass: PropTypes.func,
    current: PropTypes.number,
};

export default Options;
