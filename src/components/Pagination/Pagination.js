import PropTypes from 'prop-types';
import './Pagination.less';
import i18n from './locale';
import Pager from './Pager';

function noop() {}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: Math.floor(props.pageSize),
            _current: Math.floor(props.current),
            current: Math.floor(props.current),
        };
        [
            // 'render',
            '_handleChange',
            // '_handleKeyUp',
            // '_handleKeyDown',
            // '_changePageSize',
            '_isValid',
            '_prev',
            '_next',
            '_hasPrev',
            '_hasNext',
            '_jumpPrev',
            '_jumpNext',
        ].forEach((method) => {
            this[method] = this[method].bind(this);
            return null;
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {
            this.setState({
                current: nextProps.current,
                _current: nextProps.current,
            });
        }
    
        if (nextProps.pageSize !== this.props.pageSize) {
            this.setState({
                pageSize: nextProps.pageSize,
            });
        }
    }
    // 
    _calcPage(p) {
        let pageSize = p;
        if (typeof pageSize === 'undefined') {
            pageSize = this.state.pageSize;
        }
        const total = Math.floor(this.props.total);
        if ([0, undefined, null].indexOf(total) !== -1) { // 有这些
            return Infinity; // 正无穷大的数值
        }
        return Math.floor((total - 1) / pageSize) + 1;
    }

    _hasPrev() {
        return this.state.current > 1;
    }
    _hasNext() {
        return this.state.current < this._calcPage();
    }
    _prev() {
        if (this._hasPrev()) {
            this._handleChange(this.state.current - 1);
        }
    }
    _next() {
        if (this._hasNext()) {
            this._handleChange(this.state.current + 1);
        }
    }
    _isValid(page) {
        return typeof page === 'number' && page >= 1 && page !== this.state.current;
    }
    _handleChange(p) {
        let page = p;
        const me = this;
        if (this._isValid(page)) {
            if (page > this._calcPage()) {
                page = this._calcPage();
            }
            this.setState({
                current: page,
                _current: page,
            }, () => {
                me.props.onChange(page);
            });
    
            return page;
        }
        return this.state.current;
    }

    _jumpPrev() {
        this._handleChange(Math.max(1, this.state.current - 5));
    }

    _jumpNext() {
        this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
    }

    renderTotal() {
        const { locale, total } = this.props;
        if (this.props.showTotal) {
            return <li className={`${this.props.prefixCls}-total`}>{i18n[locale].total(Math.floor(total))}</li>;
        }
        return null;
    }
    
    render() {
        const props = this.props;
        const prefixCls = props.prefixCls;
        const allPages = this._calcPage();
        const pagerList = [];
        let jumpPrev = null;
        let jumpNext = null;
        let firstPager = null;
        let lastPager = null;
        // total 0 或空，总数未知
        if ([0, undefined, null].indexOf(Math.floor(props.total)) !== -1) {
            return (
                <ul className={`${prefixCls} ${props.className}`}>
                    <li title="Previous Page" onClick={this._prev} className={`${this._hasPrev() ? '' : `${prefixCls}-disabled `}${prefixCls}-prev`}>
                        <a className="kuma-icon kuma-icon-chevron-left" />
                    </li>
                    <div title={`Page ${this.state.current}`} className={`${prefixCls}-unknown-total`}>
                        <span className={`${prefixCls}-current`}>{i18n[props.locale].pageNo(this.state._current)}</span>
                    </div>
                    <li title="Next Page" onClick={this._next} className={`${this._hasNext() ? '' : `${prefixCls}-disabled `}${prefixCls}-next`}>
                        <a className="kuma-icon kuma-icon-chevron-right" />
                    </li>
                </ul>
            );
        }
        if (props.simple) {
            return (
                <ul className={`${prefixCls} ${prefixCls}-simple ${props.className}`}>
                    <li title="Previous Page" onClick={this._prev} className={`${this._hasPrev() ? '' : `${prefixCls}-disabled `}${prefixCls}-prev`}>
                        <a className="kuma-icon kuma-icon-chevron-left" />
                    </li>
                    <div title={`Page ${this.state.current} of ${allPages}`} className={`${prefixCls}-simple-pager`}>
                        <span className={`${prefixCls}-current`}>{this.state._current}</span>
                        <span className={`${prefixCls}-slash`}>/</span>
                        {allPages}
                    </div>
                    <li title="Next Page" onClick={this._next} className={`${this._hasNext() ? '' : `${prefixCls}-disabled `}${prefixCls}-next`}>
                        <a className="kuma-icon kuma-icon-chevron-right" />
                    </li>
                </ul>
            );
        }
        if (allPages <= 9) {
            for (let i = 1; i <= allPages; i++) {
                const active = this.state.current === i;
                pagerList.push(<Pager
                    rootPrefixCls={prefixCls}
                    onClick={this._handleChange.bind(this, i)}
                    key={i}
                    page={i}
                    active={active}
                />);
            }
        } else {
            jumpPrev = (
                <li title="Previous 5 Page" key="prev" onClick={this._jumpPrev} className={`${prefixCls}-jump-prev`}>
                    <a />
                </li>
            );
            jumpNext = (
                <li title="Next 5 Page" key="next" onClick={this._jumpNext} className={`${prefixCls}-jump-next`}>
                    <a />
                </li>
            );
            lastPager = (
                <Pager
                    last
                    rootPrefixCls={prefixCls}
                    onClick={this._handleChange.bind(this, allPages)}
                    key={allPages}
                    page={allPages}
                    active={false}
                />
            );
            firstPager = (
                <Pager
                    rootPrefixCls={prefixCls}
                    onClick={this._handleChange.bind(this, 1)}
                    key={1}
                    page={1}
                    active={false}
                />
            );
            const current = this.state.current;
            let left = Math.max(1, current - 2); // 第四页 2 // 保证扔从第一页开始
            let right = Math.min(current + 2, allPages); // 6 // 保证结束扔是最后一页
      
            if (current - 1 <= 2) {
                right = 1 + 4;
            }
      
            if (allPages - current <= 2) {
                left = allPages - 4;
            }
            for (let i = left; i <= right; i++) {
                const active = current === i;
                pagerList.push(<Pager
                    rootPrefixCls={prefixCls}
                    onClick={this._handleChange.bind(this, i)}
                    key={i}
                    page={i}
                    active={active}
                />);
            }
            // 到第5页，开头添加... 
            if (current >= 5) {
                pagerList.unshift(jumpPrev); // 开头添加元素
            }
            // 倒数第4页，结尾添加...
            if (allPages - current >= 4) {
                pagerList.push(jumpNext);
            }
        
            if (left !== 1) {
                pagerList.unshift(firstPager);
            }
            if (right !== allPages) {
                pagerList.push(lastPager);
            }
        }
        return (
            <ul
                className={`${prefixCls} ${props.className}`}
                unselectable="unselectable"
            >
                {this.renderTotal()}
                <li title="Previous Page" onClick={this._prev} className={`${this._hasPrev() ? '' : `${prefixCls}-disabled `}${prefixCls}-prev`}>
                    <span>上</span>
                </li>
                {pagerList}
                <li title="Next Page" onClick={this._next} className={`${this._hasNext() ? '' : `${prefixCls}-disabled `}${prefixCls}-next`}>
                    <span>下</span>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
    locale: PropTypes.string,
    prefixCls: PropTypes.string,
    showTotal: PropTypes.bool,
    pageSize: PropTypes.number,
    sizeOptions: PropTypes.array,
    onChange: PropTypes.func,
    showSizeChanger: PropTypes.bool,
    onShowSizeChange: PropTypes.func,
    selectComponentClass: PropTypes.func,
    showQuickJumper: PropTypes.bool,
};

Pagination.defaultProps = {
    current: 1,
    total: 0,
    locale: 'zh-cn',
    showTotal: false,
    pageSize: 10,
    sizeOptions: [10, 20, 30, 40],
    onChange: noop,
    className: '',
    selectPrefixCls: 'kuma-select2',
    prefixCls: 'kuma-page',
    // selectComponentClass: Select,
    showQuickJumper: false,
    showSizeChanger: false,
    onShowSizeChange: noop,
};

Pagination.displayName = 'Pagination';

export default Pagination;
