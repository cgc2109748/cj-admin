import { Text, Grid, Button, Image, Group, Anchor } from '@mantine/core';
import moment from 'moment';
import _ from 'lodash';

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

const useLotteryColumns = () => {
  const columns = [
    {
      key: 'orderId',
      dataIndex: 'orderId',
      title: '订单ID',
      sortable: false,
    },
    {
      key: 'activityId',
      dataIndex: 'activityId',
      title: '活动ID',
      sortable: false,
    },
    {
      key: 'purchases',
      dataIndex: 'purchases',
      title: '购买次数',
      sortable: true,
    },
    {
      key: 'result',
      dataIndex: 'result',
      title: '中奖结果',
      sortable: true,
      render: (val, record) => {
        try {
          let result = '未中奖';
          let color = 'blue';
          const arr = JSON.parse(record.result);
          _.forEach(arr, (item) => {
            if (item === '中奖') {
              color = 'red';
              result = item;
            }
          });
          return (
            <Text size="sm" color={color}>
              {result}
            </Text>
          );
        } catch (e) {
          console.error(e);
        }
      },
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: '抽奖时间',
      sortable: true,
      render: (_, record) => {
        return moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];
  return columns;
};

export { statusHandler, useLotteryColumns };
