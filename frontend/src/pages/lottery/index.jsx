import { useDispatch } from 'react-redux';
import {
  getLotterys,
  createLottery,
  updateLottery,
} from '../../features/lottery/lotterySlice';
import { createProductLogs } from '../../features/productLogs/productLogsSlice';
import { getProductGroups } from '../../features/productGroup/productGroupSlice';
import { useForm } from '@mantine/form';
import { Card, TextInput, Select, Button, Group, createStyles } from '@mantine/core';
import { useMemo, useEffect } from 'react';
import { useModals } from '@mantine/modals';
import moment from 'moment';
import { useState, useRef } from 'react';
import { showNotification } from '@mantine/notifications';
import _ from 'lodash';
import AddForm from './AddForm';
import { useProductColumns } from './columns';
import { Table } from 'antd';

const useStyles = createStyles((theme) => ({
  tableWrapper: {
    padding: '16px',
  },
}));

const statusList = [
  { value: '0', label: '优惠券' },
  { value: '1', label: '奖品' },
];

const statusHandler = (status) => {
  switch (status) {
    case '0':
      return '领取';
    case '1':
      return '借取';

    default:
      return '';
  }
};

const Lottery = () => {
  const { classes } = useStyles();
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: '',
      code: '',
      type: '',
      status: '',
      total: '',
      used: '',
      left: '',
      unit: '',
      price: '',
      totalPrice: '',
      createDate: '',
      updatedDate: '',
      manager: '',
      qrCode: '',
    },
  });
  const [filterValue, setFilterValue] = useState({
    name: '',
    code: '',
    type: '',
    status: '',
  });
  const [dataJson, setDataJson] = useState([]);
  const [groups, setGroups] = useState([]);

  const filteredData = useMemo(() => {
    const { name, code, type, status } = filterValue;
    console.log('filterValue:', filterValue);
    return _.chain(dataJson)
      .unionBy('_id')
      .filter((item) => {
        return !item._deleted;
      })
      .filter((item) => {
        return _.isEmpty(name) || item.name.indexOf(name) >= 0;
      })
      .filter((item) => {
        return _.isEmpty(code) || item.code.indexOf(code) >= 0;
      })
      .filter((item) => {
        return _.isEmpty(type) || item.type.indexOf(type) >= 0;
      })
      .filter((item) => {
        return _.isEmpty(status) || item.status.indexOf(status) >= 0;
      })
      .value();
    // return dataJson;
  }, [dataJson, filterValue]);

  const tableHeight = useMemo(() => {
    return `${window.innerHeight - 58 - 48 - 220}px`;
  }, [window.innerHeight]);

  const deleteProduct = async (_id) => {
    const res = await dispatch(updateLottery({ _id, _deleted: true }));
    if (!res.error) {
      // console.log('res:', res);
      showNotification({
        title: '操作成功：',
        message: `删除${res}`,
        color: 'green',
      });
      fetchData();
    }
  };

  const columns = useProductColumns(deleteProduct);

  const modals = useModals();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    const res = await dispatch(getLotterys());
    if (res) {
      setLoading(false);
      setDataJson(res.payload);
    }
  };

  const newData = async (data) => {
    if (loading) return;
    setLoading(true);
    data['createDate'] = moment().format('YYYY-MM-DD HH:mm:ss');
    data['updatedDate'] = moment().format('YYYY-MM-DD HH:mm:ss');
    const res = await dispatch(createLottery(data));
    if (!res.error && !res.payload.stack) {
      setLoading(false);
      modals.closeModal('add-modal');
      fetchData();
      showNotification({
        title: '新增奖项成功：',
        message: `${data.name}已新增`,
        color: 'green',
      });
    } else {
      setLoading(false);
      modals.closeModal('add-modal');
      fetchData();
      showNotification({
        title: '新增奖项失败：',
        message: res.payload.stack,
        color: 'red',
      });
    }
  };

  return (
    <div className={classes.tableWrapper}>
      <Card shadow="sm" p="lg">
        <Group>
          <form>
            <Group mb={16}>
              <TextInput
                label="活动名称"
                placeholder="资产名称"
                {...form.getInputProps('name')}
                style={{ width: '250px' }}
              />
              <Select
                label="奖项类型"
                placeholder="请选择"
                data={statusList}
                {...form.getInputProps('status')}
                style={{ width: '250px' }}
              />
            </Group>
          </form>
        </Group>
        <Group position="right">
          <Button
            size="xs"
            loading={loading}
            onClick={() => {
              const temp = _.pick(form.values, ['name', 'code', 'type', 'status']);
              temp.type = !_.isEmpty(form.values.type)
                ? _.filter(groups, (item) => item.value === temp.type)[0].label
                : '';
              setFilterValue(temp);
            }}>
            查询
          </Button>
          <Button
            size="xs"
            loading={loading}
            onClick={() => {
              form.setValues({
                name: '',
                code: '',
                type: '',
                status: '',
              });
              setFilterValue({
                name: '',
                code: '',
                type: '',
                status: '',
              });
            }}>
            重置
          </Button>
          <Button
            size="xs"
            onClick={() => {
              modals.openModal({
                id: 'add-modal',
                title: '新增奖项',
                children: (
                  <AddForm
                    newData={newData}
                    groups={groups.map((item) => {
                      return { label: item.label, value: `${item.value}${item.code}` };
                    })}
                  />
                ),
              });
            }}
            loading={loading}>
            新增
          </Button>
        </Group>
      </Card>
      <Card shadow="sm" mt={12} p={0}>
        {/*<ReactDataGrid*/}
        {/*  onReady={(ref) => (gridRef.current = ref.current)}*/}
        {/*  loading={loading}*/}
        {/*  scrollProps={{*/}
        {/*    autoHide: false,*/}
        {/*  }}*/}
        {/*  dataSource={filteredData}*/}
        {/*  columns={columns}*/}
        {/*  defaultSortInfo={undefined}*/}
        {/*  showColumnMenuTool={false}*/}
        {/*  defaultFilterValue={undefined}*/}
        {/*  enableColumnFilterContextMenu={false}*/}
        {/*  pagination={true}*/}
        {/*  pageSizes={[10, 50, 100, 500, 1000]}*/}
        {/*  style={{*/}
        {/*    height: tableHeight,*/}
        {/*  }}*/}
        {/*/>*/}
        <Table columns={columns} dataSource={dataJson} />
      </Card>
    </div>
  );
};

export default Lottery;
