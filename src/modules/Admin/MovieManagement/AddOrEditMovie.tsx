import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Typography,
  Upload,
} from "antd";
import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ClockCircleFilled,
  LoadingOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SyncOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export interface FormValues {
  tenPhim: string;
  trailer: string;
  moTa: string;
  trangThai: boolean;
  hot: boolean;
  danhGia: string;
  ngayKhoiChieu: string;
  hinhAnh: any;
}


interface AddOrEditMovieModalProps{
    isOpen:boolean;
    onCloseModal:()=>void;
    isPending:boolean;
    onSubmit:(formValues:FormValues)=>void;
    dataEdit?:any
}


const AddOrEditMovie:FC<AddOrEditMovieModalProps> = ({isOpen,onCloseModal,isPending,onSubmit,dataEdit}) => {
  const { handleSubmit, control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      trangThai: false,
      hot: false,
      danhGia: "",
      ngayKhoiChieu: "",
      hinhAnh: undefined,
    },
  });
  useEffect(() => {
    if (dataEdit) {
      setValue('tenPhim', dataEdit.tenPhim);
      setValue('trailer', dataEdit.tenPhim);
      setValue('moTa', dataEdit.moTa);
      setValue('trangThai', dataEdit.dangChieu);
      setValue('hot', dataEdit.hot);
      setValue('danhGia', dataEdit.danhGia.toString());
    //   setValue("ngayKhoiChieu", dayjs(new Date(dataEdit.ngayKhoiChieu)));
    }
  }, [dataEdit]);
  const watchhinhAnh = watch("hinhAnh");
//   const onSubmit = (values: FormValues) => {
//     console.log(values);
//   };
  return (
    <Modal
      open={isOpen}
      title={
        <Typography className="text-2xl font-medium">{dataEdit?"Edit Movie":"Add Movie"}</Typography>
      }
      centered
      onCancel={onCloseModal}
      footer={false}
      width={750}
    >
      <Form className="m-w-[450px] my-4" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 24]}>
          <Col span={24}>
            <label className="text-sm pt-2">
              <span className="text-red-600">*</span>Movie name
            </label>
            <Controller
              name="tenPhim"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  className="mt-1"
                  placeholder="movie name"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm pt-2">
              <span className="text-red-600">*</span>Trailer
            </label>
            <Controller
              name="trailer"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  className="mt-1"
                  placeholder="Trailer"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm pt-2">
              <span className="text-red-600">*</span> Description
            </label>
            <Controller
              name="moTa"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={4}
                  size="large"
                  className="mt-1"
                  placeholder="Description"
                />
              )}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm pt-2">
              <span className="text-red-600">*</span> Status
            </label>
            <br />
            <Controller
              name="trangThai"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field} className="mt-1" defaultValue={false}>
                  <Radio value={true}>Showing</Radio>
                  <Radio value={false}>Coming Soon</Radio>
                </Radio.Group>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="hot"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} {...field}>
                  Film Hot
                </Checkbox>
              )}
            />
          </Col>
          <Col span={12}>
            <label className="text-red-600">
              <span className="text-red-600">Rate</span>
            </label>
            <Controller
              name="danhGia"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder="Rate"
                  type="number"
                  className="mt-1"
                  max={10}
                />
              )}
            />
          </Col>
          <Col span={12}>
            <label className="text-red-600">
              <span className="text-red-600">Release Date</span>
            </label>
            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  className="mt-1 w-full"
                  placeholder="DD/MM/YYYY"
                  format={"DD/MM/YYYY"}
                ></DatePicker>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="hinhAnh"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Upload
                  {...field}
                  name="avatar"
                  fileList={[]}
                  listType="picture-card"
                  showUploadList={false}
                  className="avatar-uploader relative w-fit"
                  multiple={false}
                  beforeUpload={() => false}
                  onChange={(infor) => {
                    onChange(infor.file);
                  }}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    {watchhinhAnh ? (
                      <div>
                        <img
                          className="w-[60px] h-[80px] object-cover"
                          src={URL.createObjectURL(new Blob([watchhinhAnh]))}
                          alt=""
                        />
                        <div
                          className="absolute top-1 right-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setValue("hinhAnh", undefined);
                          }}
                        >
                          <DeleteOutlined></DeleteOutlined>
                        </div>
                      </div>
                    ) : (
                      <>
                        <PlusOutlined></PlusOutlined>
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </>
                    )}
                  </button>
                </Upload>
              )}
            />
          </Col>
          <Col span={24} className="flex justify-end">
            <Button size="large" type="default" className="mt-3">
              Cancel
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              htmlType="submit"
              size="large"
              type="primary"
              className="mx-3 mt-3"
            >
              Add Movie
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditMovie;
