import { useDispatch } from 'react-redux';
import { useState, createContext, useMemo, useEffect } from 'react';
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
import _ from 'lodash';
import moment from 'moment';
import FileUpload from '../../components/FileUpload';
import { useModals } from '@mantine/modals';
import { DateRangePicker } from '@mantine/dates';
import axios from 'axios';
import { getAwards } from '../../features/award/awardSlice';

export const FileUploadContext = createContext({});

const lotteryLevel = ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖'];

export const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modals = useModals();
  const { groups, action, data } = props;
  const [file, setFile] = useState(null);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      form.setValues(data);
      console.log('-> data', data);
    }
  }, [data]);

  const form = useForm({
    initialValues: {
      name: '',
      startTime: '',
      endTime: '',
      activityTime: '',
      num: 3,
      img: '',
      status: '1',
      lottery1: '',
      probabilityType1: '1',
      probabilityRate1: '',
      lottery2: '',
      probabilityType2: '1',
      probabilityRate2: '',
      lottery13: '',
      probabilityType3: '1',
      probabilityRate3: '',
      numberOfProbability: '',
      promotionType: '1',
      deductionAmount: '',
      discount: '',
      remark: '',
      lotteryData: [],
      _deleted: false,
    },
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    if (loading) return;
    setLoading(true);
    const res = await dispatch(getAwards());
    if (res) {
      setLoading(false);
      const result = _.map(res.payload, (item) => {
        return {
          value: item._id,
          label: item.name,
        };
      });
      setAwards(result);
    }
  };

  const upload = (values) => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post('/api/upload', formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          action({ ...values, ...{ img: res.data.url } });
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

  const lotteryArr = useMemo(() => {
    console.log('form.values: ', form.values);
    if (
      typeof form.values?.num === 'number' &&
      form.values?.num > 0 &&
      form.values?.num < 4
    ) {
      return new Array(form.values?.num).fill('');
    }
  }, [form.values, form.values?.num]);

  return (
    <FileUploadContext.Provider value={value}>
      <form
        onSubmit={form.onSubmit((values) => {
          if (!_.isEmpty(file)) {
            upload(values);
          } else {
            action(values);
          }
        })}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="奖项名称"
              placeholder="奖项名称"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateRangePicker
              label="活动时间"
              inputFormat="YYYY-MM-DD"
              minDate={new Date()}
              {...form.getInputProps('activityTime')}
            />
          </Grid.Col>
          {/*<Grid.Col span={6}>*/}
          {/*  <Select*/}
          {/*    label="奖项类型"*/}
          {/*    placeholder="请选择"*/}
          {/*    data={[*/}
          {/*      { value: '0', label: '优惠券' },*/}
          {/*      { value: '1', label: '奖品' },*/}
          {/*    ]}*/}
          {/*    {...form.getInputProps('type')}*/}
          {/*  />*/}
          {/*</Grid.Col>*/}
          <Grid.Col span={6}>
            <NumberInput
              defaultValue={3}
              label="奖项数量"
              placeholder="奖项数量，最大数量为3"
              min={1}
              max={3}
              {...form.getInputProps('num')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            {!_.isEmpty(lotteryArr) &&
              lotteryArr.map((item, index) => {
                return (
                  <Grid
                    mb={16}
                    sx={{
                      border: '2px dotted #e3e3e3',
                      margin: '0px',
                      borderRadius: '5px',
                    }}>
                    <Grid.Col span={6}>
                      <Select
                        label={`${lotteryLevel[index]}奖品`}
                        placeholder="请选择"
                        // data={[
                        //   { value: '0', label: '优惠券' },
                        //   { value: '1', label: '奖品' },
                        // ]}
                        data={awards}
                        {...form.getInputProps(`lottery${index + 1}`)}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text mb={4}>概率方式</Text>
                      <RadioGroup
                        size="sm"
                        {...form.getInputProps(`probabilityType${index + 1}`)}>
                        <Radio value="1" label="固定概率" />
                        <Radio value="2" label="次数概率" />
                      </RadioGroup>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <NumberInput
                        label="中奖概率"
                        placeholder="0.00"
                        min={0}
                        max={1}
                        precision={4}
                        hideControls
                        {...form.getInputProps(`probabilityRate${index + 1}`)}
                      />
                    </Grid.Col>
                    {form.values.probabilityType === '2' && (
                      <Grid.Col span={6}>
                        <NumberInput
                          label="中奖概率生效次数"
                          placeholder="100"
                          min={0}
                          hideControls
                          {...form.getInputProps(`numberOfProbability${index + 1}`)}
                        />
                      </Grid.Col>
                    )}
                  </Grid>
                );
              })}
          </Grid.Col>

          {/*<Grid.Col span={6}>*/}
          {/*  <Text mb={4} size="sm" weight="bold">*/}
          {/*    奖项图片*/}
          {/*  </Text>*/}
          {/*  <FileUpload />*/}
          {/*</Grid.Col>*/}
          {/*<Grid.Col span={6}>*/}
          {/*  <Text mb={4}>概率方式</Text>*/}
          {/*  <RadioGroup size="sm" {...form.getInputProps('probabilityType')}>*/}
          {/*    <Radio value="1" label="固定概率" />*/}
          {/*    <Radio value="2" label="次数概率" />*/}
          {/*  </RadioGroup>*/}
          {/*</Grid.Col>*/}
          {/*<Grid.Col span={6}>*/}
          {/*  <NumberInput*/}
          {/*    label="中奖概率"*/}
          {/*    placeholder="0.00"*/}
          {/*    min={0}*/}
          {/*    max={1}*/}
          {/*    precision={4}*/}
          {/*    hideControls*/}
          {/*    {...form.getInputProps('probabilityRate')}*/}
          {/*  />*/}
          {/*</Grid.Col>*/}
          {/*{form.values.probabilityType === '2' && (*/}
          {/*  <Grid.Col span={6}>*/}
          {/*    <NumberInput*/}
          {/*      label="中奖概率生效次数"*/}
          {/*      placeholder="100"*/}
          {/*      min={0}*/}
          {/*      hideControls*/}
          {/*      {...form.getInputProps('numberOfProbability')}*/}
          {/*    />*/}
          {/*  </Grid.Col>*/}
          {/*)}*/}
          {/*<Grid.Col span={6}>*/}
          {/*  <Text mb={4} size="sm" weight="bold">*/}
          {/*    优惠方式*/}
          {/*  </Text>*/}
          {/*  <RadioGroup size="sm" {...form.getInputProps('promotionType')}>*/}
          {/*    <Radio value="1" label="固定扣减金额" />*/}
          {/*    <Radio value="2" label="固定折扣" />*/}
          {/*  </RadioGroup>*/}
          {/*</Grid.Col>*/}
          {/*{form.values.promotionType === '1' ? (*/}
          {/*  <Grid.Col span={6}>*/}
          {/*    <NumberInput*/}
          {/*      label="扣减金额"*/}
          {/*      placeholder="0.00"*/}
          {/*      min={0}*/}
          {/*      precision={2}*/}
          {/*      hideControls*/}
          {/*      {...form.getInputProps('deductionAmount')}*/}
          {/*    />*/}
          {/*  </Grid.Col>*/}
          {/*) : (*/}
          {/*  <Grid.Col span={6}>*/}
          {/*    <NumberInput*/}
          {/*      label="固定折扣"*/}
          {/*      placeholder="0.00"*/}
          {/*      min={0}*/}
          {/*      max={1}*/}
          {/*      precision={2}*/}
          {/*      hideControls*/}
          {/*      {...form.getInputProps('discount')}*/}
          {/*    />*/}
          {/*  </Grid.Col>*/}
          {/*)}*/}
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
