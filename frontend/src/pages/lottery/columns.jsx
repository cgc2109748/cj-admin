import { Text, Grid, Button, Image, Group, Anchor } from '@mantine/core';
import { useModals } from '@mantine/modals';

const statusHandler = (status) => {
  switch (status) {
    case '0':
      return (
        <Text color="red" size="sm">
          禁用
        </Text>
      );
    case '1':
      return (
        <Text color="green" size="sm">
          启用
        </Text>
      );

    default:
  }
};

function tranNumber(num, point) {
  // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
  let numStr = num.toString().split('.')[0];
  if (numStr.length < 6) {
    // 判断数字有多长,如果小于6,,表示10万以内的数字,让其直接显示
    return numStr;
  } else if (numStr.length >= 6 && numStr.length <= 8) {
    // 如果数字大于6位,小于8位,让其数字后面加单位万
    let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
    // 由千位,百位组成的一个数字
    return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
  } else if (numStr.length > 8) {
    // 如果数字大于8位,让其数字后面加单位亿
    let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
    return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
  }
}

const useProductColumns = () => {
  const modals = useModals();
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '奖项名称',
      sortable: false,
      defaultWidth: 100,
      defaultFlex: 1,
      userSelect: true,
      render: (_, record) => {
        return (
          <Text size="sm" color="#1c7ed6">
            {record?.name}
          </Text>
        );
      },
    },
    {
      key: 'img',
      dataIndex: 'img',
      title: '图片',
      sortable: false,
      defaultWidth: 60,
      render: (_, record) => {
        return (
          <Group position="center">
            {record?.img && (
              <Image
                height="36px"
                radius="md"
                alt=""
                width="36px"
                src={record?.img}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  modals.openConfirmModal({
                    title: '预览',
                    size: 800,
                    closeOnClickOutside: false,
                    children: (
                      <Group position="center">
                        <Image
                          height="auto"
                          radius="md"
                          alt="preview"
                          width="100%"
                          src={record?.img}
                          style={{ cursor: 'pointer' }}
                        />
                      </Group>
                    ),
                    labels: {
                      confirm: '确认',
                      cancel: '取消',
                    },
                  });
                }}
              />
            )}
          </Group>
        );
      },
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: '奖项类型',
      defaultWidth: 100,
      sortable: false,
      userSelect: true,
      render: (_, record) => {
        let result = '';
        switch (record.type) {
          case '0':
            result = '优惠券';
            break;
          case '1':
            result = '奖品';
            break;
        }
        return result;
      },
    },
    {
      key: 'num',
      dataIndex: 'num',
      title: '奖项数量',
      sortable: true,
      userSelect: true,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      sortable: false,
      defaultWidth: 80,
      render: (_, record) => {
        return statusHandler(record?.status);
      },
    },
    {
      key: 'probabilityType',
      dataIndex: 'probabilityType',
      title: '概率方式',
      defaultWidth: 80,
      sortable: false,
      render: (_, record) => {
        return record?.probabilityType === '1' ? '固定概率' : '次数概率';
      },
    },
    {
      key: 'probabilityRate',
      dataIndex: 'probabilityRate',
      title: '概率',
      defaultWidth: 140,
      sortable: false,
      render: (_, record) => {
        if (record?.probabilityType === '1') {
          return record?.probabilityRate;
        } else {
          return `每${record?.numberOfProbability}次，中奖概率${
            record?.probabilityRate * 100
          }%`;
        }
      },
    },
    {
      key: 'updatedDate',
      dataIndex: 'updatedDate',
      title: '更新日期',
      sortable: false,
      defaultWidth: 160,
      userSelect: true,
      render: (_, record) => {
        return <Text size="sm">{record?.updatedDate}</Text>;
      },
    },
  ];
  return columns;
};

export { statusHandler, useProductColumns };
