import PropTypes from 'prop-types';

export default class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="album-item">
                <img src={this.props.src} alt="" ref={(img) => { this.img = img; }} />
            </div>
        );
    }
}

Photo.defaultProps = {
    src: '',
};

Photo.propTypes = {
    src: PropTypes.string,
};

Photo.displayName = 'Photo';
