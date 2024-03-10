type SelectFilterCondition =  {
  label: string;
  name: string;
  value: string[] | string;
  type: 'select';
  multiple: boolean;
  disabled: boolean;
  options: {
    text: string;
    value: string;
    checked: boolean;
    disabled: boolean;
  }[]
}
type InputFilterCondition =  {
  label: string;
  name: string;
  value: string,
  type: 'input';
  disabled: boolean;
}
type DateFilterCondition =  {
  label: string;
  name: string;
  value: [string, string],
  type: 'date';
  disabled: boolean;
  start: {
    text: string;
    value: string;
  };
  end: {
    text: string;
    value: string;
  };
}

type FilterConditionItem = InputFilterCondition | DateFilterCondition | SelectFilterCondition;

const filterConditionList: FilterConditionItem[] = [
  {
    label: '', // 筛选项的 value
    name: 'status', // 筛选项的 key
    type: 'select', // 选择类型
    multiple: true, // 多选
    value: ['0', '1'], // 已选值
    disabled: false,
    options: [     // 可选项列表
      {
        text: '开始',  // 可选项文本
        value: '0', // 可选项值
        checked: true, // 是否选中
        disabled: false
      },
      {
        text: '进行中',  // 可选项文本
        value: '1', // 可选项值
        checked: true, // 是否选中
        disabled: false
      },
      {
        text: '结束',  // 可选项文本
        value: '2', // 可选项值
        checked: true, // 是否选中
        disabled: false
      }
    ]
  },
  {
    label: '优先级', // 筛选项的 value
    name: 'priority', // 筛选项的 key
    type: 'select', // 选择
    multiple: true, // 多选
    value: [], // 筛选项已选值
    disabled: false,
    options: [     // 可选项列表
      {
        text: '低',  // 可选项文本
        value: '0', // 可选项值
        checked: true, // 是否选中
        disabled: false
      },
      {
        text: '中',  // 可选项文本
        value: '1', // 可选项值
        checked: true, // 是否选中
        disabled: false
      },
      {
        text: '高',  // 可选项文本
        value: '2', // 可选项值
        checked: true, // 是否选中
        disabled: false
      }
    ]
  }, 
  {
    label: '申请日期', // 筛选项的 value
    name: 'applicationDate', // 筛选项的 key
    type: 'date',
    value: ['', ''],
    disabled: false,
    start: {
      text: '开始日期',
      value: '',
    },
    end: {
      text: '结束日期',
      value: '',
    },
  },
  {
    label: '单选', // 筛选项的 value
    name: 'yesOrNo', // 筛选项的 key
    type: 'select', // 单选
    multiple: false,
    value: '0', // 筛选项已选值
    disabled: false,
    options: [     // 可选项列表
      {
        text: '否',  // 可选项文本
        value: '0', // 可选项值
        checked: true, // 是否选中
        disabled: false
      },
      {
        text: '是',  // 可选项文本
        value: '1', // 可选项值
        checked: false, // 是否选中
        disabled: false
      },
    ]
  }, 
  {
    label: '项目名称', // 筛选项的 value
    name: 'projectName', // 筛选项的 key
    type: 'input', // 匹配类型：模糊匹配
    disabled: false,
    value: ''
  },
  {
    label: '项目编号', // 筛选项的 value
    name: 'projectNo', // 筛选项的 key
    type: 'input', // 匹配类型：模糊匹配
    disabled: false,
    value: '',
  },
]