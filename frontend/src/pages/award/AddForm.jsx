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
import _ from 'lodash';
import moment from 'moment';
import FileUpload from '../../components/FileUpload2';
import { useModals } from '@mantine/modals';
import { DateRangePicker } from '@mantine/dates';
import axios from 'axios';
export const FileUploadContext = createContext({});

const AddForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modals = useModals();
  const { groups, action, data } = props;
  const [file, setFile] = useState(null);
  const form = useForm({
    initialValues: {
      name: '',
      img: '',
      amount: '',
      _deleted: false,
    },
  });

  useEffect(() => {
    if (!_.isEmpty(data)) {
      form.setValues(data);
    }
  }, [data]);

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
          <Grid.Col span={12}>
            <TextInput
              label="奖品名称"
              placeholder="奖项名称"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <NumberInput
              label="库存"
              placeholder="库存"
              min={0}
              hideControls
              {...form.getInputProps('amount')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Text mb={4} size="sm" weight="bold">
              奖项图片
            </Text>
            <FileUpload imgUrl={data?.img} />
          </Grid.Col>
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
