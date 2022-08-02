import { Text, Grid, Button, Image, Group, Anchor } from '@mantine/core';
import { useModals } from '@mantine/modals';
import moment from 'moment';

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

const useProductColumns = () => {
  const modals = useModals();
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '活动名称',
      sortable: false,
      render: (_, record) => {
        return (
          <Text size="sm" color="#1c7ed6">
            {record?.name}
          </Text>
        );
      },
    },
    {
      key: 'url',
      dataIndex: 'name',
      title: '活动地址',
      sortable: false,
      render: (_, record) => {
        return (
          <Text size="sm" color="#1c7ed6">
            {`http://43.142.90.201:8080?id=${record._id}`}
          </Text>
        );
      },
    },
    {
      key: 'startTime',
      dataIndex: 'startTime',
      title: '开始时间',
      sortable: true,
      render: (_, record) => {
        return record.startTime;
      },
    },
    {
      key: 'endTime',
      dataIndex: 'startTime',
      title: '结束时间',
      sortable: true,
      render: (_, record) => {
        return record.endTime;
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
      key: 'income',
      dataIndex: 'income',
      title: '累计收益',
      sortable: true,
    },
    {
      key: 'accessCount',
      dataIndex: 'accessCount',
      title: '访问次数',
      sortable: true,
    },
    {
      key: 'triggerCount',
      dataIndex: 'triggerCount',
      title: '抽奖次数',
      sortable: true,
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: '创建时间',
      sortable: false,
      defaultWidth: 160,
      userSelect: true,
      render: (_, record) => {
        return (
          <Text size="sm">{moment(record?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        );
      },
    },
  ];
  return columns;
};

export { statusHandler, useProductColumns };
