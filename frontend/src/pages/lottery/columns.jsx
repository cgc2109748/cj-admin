import { Text, Grid, Button, Image, Group, Tooltip, ActionIcon } from '@mantine/core';
import { useModals } from '@mantine/modals';
import moment from 'moment';
import AddForm from './AddForm';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
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

const useLotteryColumns = (props) => {
  const modals = useModals();
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '活动名称',
      sortable: false,
      render: (_, record) => {
        return (
          <Tooltip label={record?.name} withArrow>
            <Text lineClamp={1} size="sm" color="#1c7ed6" style={{ width: '64px' }}>
              {record?.name}
            </Text>
          </Tooltip>
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
          <Tooltip label={`http://localhost:8080?id=${record._id}`} withArrow>
            <Text size="sm" color="#1c7ed6">
              {`http://localhost:8080?id=${record._id}`}
              {/*{`http://43.142.90.201:8080?id=${record._id}`}*/}
            </Text>
          </Tooltip>
        );
      },
    },
    {
      key: 'startTime',
      dataIndex: 'startTime',
      title: '开始时间',
      width: 120,
      sortable: true,
      render: (_, record) => {
        return record.startTime;
      },
    },
    {
      key: 'endTime',
      dataIndex: 'startTime',
      title: '结束时间',
      width: 120,
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
      width: 80,
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
    // {
    //   key: 'type',
    //   dataIndex: 'type',
    //   title: '奖项类型',
    //   width: 100,
    //   sortable: false,
    //   userSelect: true,
    //   render: (_, record) => {
    //     let result = '';
    //     switch (record.type) {
    //       case '0':
    //         result = '优惠券';
    //         break;
    //       case '1':
    //         result = '奖品';
    //         break;
    //     }
    //     return result;
    //   },
    // },
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
      render: (_, record) => {
        return <Text style={{ width: '30px' }}>{statusHandler(record?.status)}</Text>;
      },
    },
    // {
    //   key: 'probabilityType',
    //   dataIndex: 'probabilityType',
    //   title: '概率方式',
    //   width: 80,
    //   sortable: false,
    //   render: (_, record) => {
    //     return (
    //       <Text size="sm" style={{ width: '64px' }}>
    //         {record?.probabilityType === '1' ? '固定概率' : '次数概率'}
    //       </Text>
    //     );
    //   },
    // },
    // {
    //   key: 'probabilityRate',
    //   dataIndex: 'probabilityRate',
    //   title: '概率',
    //   width: 140,
    //   sortable: false,
    //   render: (_, record) => {
    //     if (record?.probabilityType === '1') {
    //       return record?.probabilityRate;
    //     } else {
    //       return `每${record?.numberOfProbability}次，中奖概率${
    //         record?.probabilityRate * 100
    //       }%`;
    //     }
    //   },
    // },
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
      width: 120,
      userSelect: true,
      render: (_, record) => {
        return (
          <Text size="sm">{moment(record?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        );
      },
    },
    {
      key: '_id',
      dataIndex: '_id',
      title: '操作',
      sortable: false,
      render: (value, record) => {
        let newRecord = _.cloneDeep(record);
        let newActivityTime = [];
        if (!_.isEmpty(record['activityTime'])) {
          _.forEach(record['activityTime'], (val, key) => {
            newActivityTime.push(new Date(val));
          });
        }
        newRecord['activityTime'] = newActivityTime;
        return (
          <Group style={{ width: '72px' }}>
            <ActionIcon
              color="blue"
              onClick={() => {
                modals.openModal({
                  id: 'edit-modal',
                  title: '编辑活动',
                  size: 1000,
                  children: <AddForm action={props.edit} data={newRecord} />,
                });
              }}>
              <FiEdit />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                modals.openConfirmModal({
                  id: 'delete-modal',
                  title: '删除活动',
                  children: <Text>确定删除该活动吗？</Text>,
                  labels: {
                    confirm: '确认删除',
                    cancel: '取消',
                  },
                  onConfirm: () => {
                    modals.closeModal('delete-modal');
                    props.doDelete(record._id);
                  },
                  onCancel: () => {
                    modals.closeModal('delete-modal');
                  },
                });
              }}>
              <FiTrash2 />
            </ActionIcon>
          </Group>
        );
      },
    },
  ];
  return columns;
};

export { statusHandler, useLotteryColumns };
