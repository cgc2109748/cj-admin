import { Text, Grid, Button, Image, Group, ActionIcon } from '@mantine/core';
import { useModals } from '@mantine/modals';
import moment from 'moment';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AddForm from './AddForm';
import { createAward } from '../../features/award/awardSlice';
import { showNotification } from '@mantine/notifications';
// const statusHandler = (status) => {
//   switch (status) {
//     case '0':
//       return (
//         <Text color="red" size="sm">
//           禁用
//         </Text>
//       );
//     case '1':
//       return (
//         <Text color="green" size="sm">
//           启用
//         </Text>
//       );
//
//     default:
//   }
// };

const useProductColumns = (props) => {
  const modals = useModals();
  console.log('-> props', props);

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '奖品名称',
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
      key: 'amount',
      dataIndex: 'amount',
      title: '奖品库存',
      sortable: true,
      userSelect: true,
    },
    // {
    //   key: 'status',
    //   dataIndex: 'status',
    //   title: '状态',
    //   sortable: false,
    //   defaultWidth: 80,
    //   render: (_, record) => {
    //     return statusHandler(record?.status);
    //   },
    // },
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
    {
      key: '_id',
      dataIndex: '_id',
      title: '操作',
      sortable: false,
      render: (_, record) => {
        return (
          <Group>
            <ActionIcon
              color="blue"
              onClick={() => {
                modals.openModal({
                  id: 'edit-modal',
                  title: '编辑奖项',
                  children: <AddForm action={props.edit} data={record} />,
                });
              }}>
              <FiEdit />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                modals.openConfirmModal({
                  id: 'delete-modal',
                  title: '删除奖项',
                  children: <Text>确定删除该奖项吗？</Text>,
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

export { useProductColumns };
