const locale = {
    'en-us': {
        items_per_page: '/page',
        jump_to: 'Goto',
        page: '',
        total: total => `${total} entries`,
        item: ' entries',
        pageNo: page => `Page ${page}`,
        ok: 'Ok',
    },
    'zh-cn': {
        items_per_page: '条/页',
        jump_to: '跳至',
        page: '页',
        total: total => `共${total}条`,
        item: '条',
        pageNo: page => `第${page}页`,
        ok: '确定',
    },
};
locale.en = locale['en-us'];
  
export default locale;
