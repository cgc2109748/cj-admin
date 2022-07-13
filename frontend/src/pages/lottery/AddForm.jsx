import { useDispatch } from 'react-redux';
import { useState, createContext, useEffect } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  NumberInput,
  Grid,
  Select,
  Button,
  Group,
  Text,
  RadioGroup,
  Radio,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import _ from 'lodash';
import moment from 'moment';
import FileUpload from '../../components/FileUpload';
import { useModals } from '@mantine/modals';
import axios from 'axios';

export const FileUploadContext = createContext({});

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modals = useModals();
  const { groups, newData } = props;
  const [file, setFile] = useState(null);
  const form = useForm({
    initialValues: {
      name: '',
      type: '',
      num: '',
      img: '',
      status: '1',
      probabilityType: '1',
      probabilityRate: '',
      numberOfProbability: '',
      promotionType: '1',
      deductionAmount: '',
      discount: '',
      remark: '',
      _deleted: false,
    },
  });

  const upload = (values) => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    console.log('file: ', file);
    axios
      .post('/api/upload', formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          newData({ ...values, ...{ img: res.data.url } });
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const value = {
    file,
    setFile,
  };

  return (
    <FileUploadContext.Provider value={value}>
      <form
        onSubmit={form.onSubmit((values) => {
          if (!_.isEmpty(file)) {
            upload(values);
          } else {
            newData(values);
          }
        })}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="奖项名称"
              placeholder="奖项名称"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="奖项类型"
              placeholder="请选择"
              data={[
                { value: '0', label: '优惠券' },
                { value: '1', label: '奖品' },
              ]}
              {...form.getInputProps('type')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <NumberInput
              label="奖项数量"
              placeholder="奖项数量"
              min={0}
              hideControls
              {...form.getInputProps('num')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Text mb={4}>奖项图片</Text>
            <FileUpload />
          </Grid.Col>
          <Grid.Col span={12}>
            <Text mb={4}>概率方式</Text>
            <RadioGroup size="sm" {...form.getInputProps('probabilityType')}>
              <Radio value="1" label="固定概率" />
              <Radio value="2" label="次数概率" />
            </RadioGroup>
          </Grid.Col>
          <Grid.Col span={12}>
            <NumberInput
              label="中奖概率"
              placeholder="0.00"
              min={0}
              max={1}
              precision={4}
              hideControls
              {...form.getInputProps('probabilityRate')}
            />
          </Grid.Col>
          {form.values.probabilityType === '2' && (
            <Grid.Col span={12}>
              <NumberInput
                label="中奖概率生效次数"
                placeholder="100"
                min={0}
                hideControls
                {...form.getInputProps('numberOfProbability')}
              />
            </Grid.Col>
          )}
          <Grid.Col span={12}>
            <Text mb={4}>优惠方式</Text>
            <RadioGroup size="sm" {...form.getInputProps('promotionType')}>
              <Radio value="1" label="固定扣减金额" />
              <Radio value="2" label="固定折扣" />
            </RadioGroup>
          </Grid.Col>
          {form.values.promotionType === '1' ? (
            <Grid.Col span={12}>
              <NumberInput
                label="扣减金额"
                placeholder="0.00"
                min={0}
                precision={2}
                hideControls
                {...form.getInputProps('deductionAmount')}
              />
            </Grid.Col>
          ) : (
            <Grid.Col span={12}>
              <NumberInput
                label="固定折扣"
                placeholder="0.00"
                min={0}
                max={1}
                precision={2}
                hideControls
                {...form.getInputProps('discount')}
              />
            </Grid.Col>
          )}
        </Grid>
        <Group mt={8} position="right">
          <Button size="xs" variant="outline" onClick={() => modals.closeAll()}>
            取消
          </Button>
          <Button type="submit" size="xs">
            确定
          </Button>
        </Group>
      </form>
    </FileUploadContext.Provider>
  );
};

export default AddForm;
