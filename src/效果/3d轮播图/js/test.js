console.time('a');
// 使用示例（与之前相同）
const data = [
  {
    workingHoursData: [
      {
        accountNo: 'wba60',
        accountName: '魏佳琳',
        actualInvestmentDetail: [
          {
            year: '2025',
            month: '02',
            actualLeaveDays: 0,
            actualLeave: 0,
            actualInvestmentDays: 0,
            actualInvestment: 0,
            workDays: 20
          },
          {
            year: '2025',
            month: '03',
            actualLeaveDays: 0,
            actualLeave: 0,
            actualInvestmentDays: 0,
            actualInvestment: 0,
            workDays: 20
          },
          {
            year: '2025',
            month: '04',
            actualLeaveDays: 0,
            actualLeave: 0,
            actualInvestmentDays: 0,
            actualInvestment: 0,
            workDays: 20
          }
        ]
      },
      {
        accountNo: '06192',
        accountName: '潘冬华',
        actualInvestmentDetail: [
          {
            year: '2025',
            month: '02',
            actualLeaveDays: 0,
            actualLeave: 0,
            actualInvestmentDays: 0,
            actualInvestment: 0,
            workDays: 20
          },
          {
            year: '2025',
            month: '03',
            actualLeaveDays: 0,
            actualLeave: 0,
            actualInvestmentDays: 0,
            actualInvestment: 0,
            workDays: 20
          },
          {
            year: '2025',
            month: '04',
            actualLeaveDays: 0,
            actualLeave: 0,
            actualInvestmentDays: 0,
            actualInvestment: 0,
            workDays: 20
          }
        ]
      }
    ]
  },
  // 第一次变更 - 2025-02月
  {
    workingHoursData: [
      {
        accountNo: 'wba60',
        accountName: '魏佳琳',
        actualInvestmentDetail: [
          {
            year: '2025',
            month: '02',
            actualLeaveDays: 2,
            actualLeave: 2,
            workDays: 20
          }
        ]
      },
      {
        accountNo: '06192',
        accountName: '潘冬华',
        actualInvestmentDetail: [
          {
            year: '2025',
            month: '02',
            actualInvestmentDays: 11,
            actualInvestment: 11,
            workDays: 20
          }
        ]
      }
    ]
  },
  // 第二次变更 - 2025-03月
  {
    workingHoursData: [
      {
        accountNo: 'wba60',
        accountName: '魏佳琳',
        actualInvestmentDetail: [
          {
            year: '2025',
            month: '03',
            actualInvestmentDays: 15,
            actualInvestment: 15,
            workDays: 22
          }
        ]
      },
      {
        accountNo: '06192',
        accountName: '潘冬华',
        actualInvestmentDetail: [
          {
            year: '2025',
            month: '03',
            actualLeaveDays: 1,
            actualLeave: 1,
            workDays: 22
          }
        ]
      }
    ]
  },
  // 第三次变更 - 2025-04月
  {
    workingHoursData: [
      {
        accountNo: 'wba60',
        accountName: '魏佳琳',
        actualInvestmentDetail: [
          {
            year: '2025',
            month: '04',
            actualLeaveDays: 3,
            actualLeave: 3,
            actualInvestmentDays: 3,
            actualInvestment: 3,
            workDays: 21
          }
        ]
      }
    ]
  }
];

// 原始记录
this.workingHoursMap = {};
// 变更历史
this.historyWorkHoursChangeMap = {};
this.workDaysMap = {};

const keys = ['actualInvestmentDays', 'actualInvestment', 'actualLeaveDays', 'actualLeave'];

// 收集实际变更过的年月、成员和字段
data.forEach((record, index) => {
  const map = index === 0 ? this.workingHoursMap : this.historyWorkHoursChangeMap;
  record.workingHoursData.forEach((account) => {
    const { accountNo, accountName } = account;
    account.actualInvestmentDetail.forEach((detail) => {
      const yearMonthStr = `${detail.year}-${detail.month}`;
      if (!map[yearMonthStr]) {
        map[yearMonthStr] = {};
      }
      this.workDaysMap[yearMonthStr] = detail.workDays;
      keys.forEach((field) => {
        if (detail[field] || detail[field] === 0) {
          const member = `${accountName} ${accountNo}`;
          if (!map[yearMonthStr][member]) {
            map[yearMonthStr][member] = {};
          }
          // 生成唯一标识: 账号-姓名-字段
          map[yearMonthStr][member][field] = detail[field];
        }
      });
    });
  });
});

console.log('this.workingHoursMap', this.workingHoursMap);
console.log('this.historyWorkHoursChangeMap', this.historyWorkHoursChangeMap);
console.log('this.workDaysMap', this.workDaysMap);

// 为每次变更生成表格行
this.tableData = data.map((record, index) => {
  // 创建基础行对象
  const row = {
    number: index + 1,
    numberLabel: index === 0 ? '原始记录' : `第${index}次变更`
  };

  const rowYearMonthInfo = Object.entries(this.historyWorkHoursChangeMap).reduce((accYearMonthInfo, yearMonthEntry) => {
    const [yearMonthKey, yearMonthValue] = yearMonthEntry;
    accYearMonthInfo[yearMonthKey] = {};
    Object.entries(yearMonthValue).forEach((memberEntry) => {
      const [memberKey, memberValue] = memberEntry;
      Object.keys(memberValue).forEach((field) => {
        const memberFieldKey = `${memberKey}_${field}`;
        accYearMonthInfo[yearMonthKey][memberFieldKey] = null;
      });
    });
    return accYearMonthInfo;
  }, {});

  // 如果是初始记录
  if (index === 0) {
    record.workingHoursData.forEach((account) => {
      const { accountNo, accountName, actualInvestmentDetail } = account;
      Object.keys(rowYearMonthInfo).forEach((yearMonthKey) => {
        const valueInfo = actualInvestmentDetail.find((detail) => {
          const detailYearMonth = `${detail.year}-${detail.month}`;
          return detailYearMonth === yearMonthKey;
        });
        if (valueInfo) {
          Object.keys(rowYearMonthInfo[yearMonthKey]).forEach((memberFieldKey) => {
            rowYearMonthInfo[yearMonthKey][memberFieldKey] = valueInfo[memberFieldKey.split('_')[1]];
          });
        }
      });
    });
  }
  Object.assign(row, rowYearMonthInfo);
  return row;
});

this.unitLabel = '(人月)';
this.fieldSuffix = '';

// 生成表格列
this.tableColumnList = Object.entries(this.historyWorkHoursChangeMap).reduce(
  (acc, yearMonthMap) => {
    const [yearMonth, memberMap] = yearMonthMap;
    const [year, month] = yearMonth.split('-');
    acc.push({
      label: `${year}年${month}月工时(工作日天数：${this.workDaysMap[yearMonth] || ''})`,
      field: yearMonth,
      colMinW: 240,
      subColumnList: Object.entries(memberMap).map((memberEntry) => {
        const [member, valueMap] = memberEntry;
        return {
          label: member,
          field: member,
          colMinW: 150,
          subColumnList: Object.keys(valueMap)
            .filter((key) => !key.endsWith('Days'))
            .map((key) => {
              return {
                label: key.startsWith('actualInvestment') ? `实际投入${this.unitLabel}` : `请假、调休${this.unitLabel}`,
                field: `${member}_${key}${this.fieldSuffix}`,
                colMinW: 150
              };
            })
        };
      })
    });
    return acc;
  },
  [
    {
      label: '变更历史',
      field: 'numberLabel',
      colMinW: 150,
      fixed: true
    }
  ]
);
console.log('tableColumnList', this.tableColumnList);

console.log('this.tableData', this.tableData);

console.timeEnd('a');
