const chineseOneTemplates = require('./data/chinese/one_templates');
const chineseTwoTemplates = require('./data/chinese/two_templates');
const chineseThreeTemplates = require('./data/chinese/three_templates');
const chineseFourTemplates = require('./data/chinese/four_templates');
const chineseFiveTemplates = require('./data/chinese/five_templates');
const chineseSixTemplates = require('./data/chinese/six_templates');
const chineseSevenTemplates = require('./data/chinese/seven_templates');
const chineseEightTemplates = require('./data/chinese/eight_templates');
const chineseNineTemplates = require('./data/chinese/nine_templates');
const chineseTenTemplates = require('./data/chinese/ten_templates');

const Templates = {
  chinese: {
    'one': chineseOneTemplates,
    'two': chineseTwoTemplates,
    'three': chineseThreeTemplates,
    'four': chineseFourTemplates,
    'five': chineseFiveTemplates,
    'six': chineseSixTemplates,
    'seven': chineseSevenTemplates,
    'eight': chineseEightTemplates,
    'nine': chineseNineTemplates,
    'ten': chineseTenTemplates,
  },
  chinese_beautified: {
    'one': '一',
    'two': '二',
    'three': '三',
    'four': '四',
    'five': '五',
    'six': '六',
    'seven':'七',
    'eight':'八',
    'nine': '九',
    'ten':'十',
  }
};

export default Templates;
