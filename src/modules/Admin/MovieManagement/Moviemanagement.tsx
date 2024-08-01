import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ClockCircleFilled,
  LoadingOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Radio,
  Rate,
  Row,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { userAPI } from "../../../apis/user.api";
import { PAGE_SIZE, USER_TYPES_MAPPING } from "../../../constant";
import { UserItem } from "../../../interface/user.interface";
import { useState } from "react";
import { movieAPI } from "../../../apis/movie.api";
import { MovieItem } from "../../../interface/movie.interface";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  tenPhim: string;
  trailer: string;
  moTa: string;
  trangThai: boolean;
  hot: boolean;
  danhGia: string;
  ngayKhoiChieu: string;
  hinhAnh: any;
}

const Moviemanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["list-movie", { currentPage }],
    queryFn: () => movieAPI.getListMovie({ page: currentPage }),
  });
  // console.log(data, isLoading, error);
  const { handleSubmit, control,setValue , watch} = useForm<FormValues>({
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
  const columns = [
    {
      title: "Movie name",
      key: "movie-name",
      dataIndex: "tenPhim",
      width: 200,
    },
    {
      title: "Image",
      key: "image",
      render: (record: MovieItem) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.biDanh}
            className="w-[150px] h-[190px] rounded-sm object-cover"
          />
        );
      },
    },
    {
      title: "Description",
      key: "descriptiton",

      render: (record: MovieItem) => {
        return (
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
            }}
            className="w-[200px]"
          >
            {record.moTa}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Show time",
      key: "show-time",

      render: (record: MovieItem) => {
        return (
          <Typography.Paragraph>
            {format(record.ngayKhoiChieu, "dd/MM/yyyy")}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Rate",
      key: "rate",
      dataIndex: "danhGia",
      render: (rate: number) => {
        return <Rate disabled defaultValue={(rate || 0) / 2} count={5}></Rate>;
      },
    },
    {
      title: "Hot",
      key: "hot",
      dataIndex: "hot",
      render: (isHot: boolean) => {
        return isHot ? (
          <Tag color="red">Hot💥</Tag>
        ) : (
          <Tag color="green">Normal❤</Tag>
        );
      },
    },
    {
      title: "Showing",
      key: "dangChieu",
      dataIndex: "dangChieu",
      render: (isShowing: boolean) => {
        return isShowing ? (
          <Tag color="green" icon={<SyncOutlined spin />}>
            Showing
          </Tag>
        ) : (
          <Tag color="green">N/A</Tag>
        );
      },
    },
    {
      title: "Coming Soon",
      key: "sapChieu",
      dataIndex: "sapChieu",
      render: (isComingSoon: boolean) => {
        return isComingSoon ? (
          <Tag color="green" icon={<ClockCircleFilled />}>
            Coming Soon
          </Tag>
        ) : (
          <Tag color="green">N/A</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => alert(record.maPhim)}
            >
              Edit
            </Button>
            <Button type="primary" danger onClick={() => alert(record.maPhim)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const dataSource = data?.items || [];
  const watchhinhAnh = watch('hinhAnh');
  const onSubmit = (formValues:FormValues) => {
    console.log('formValues',formValues);
    let formData = new FormData();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "Movie Management",
              href: "",
            },
          ]}
        />
        <Button
          size="large"
          type="primary"
          onClick={() => setIsOpenModal(true)}
        >
          Add Movie
        </Button>
      </div>
      <h3 className="font-medium text-3xl mb-3">List Movies</h3>
      <Table
        rowKey={({ maPhim }) => maPhim}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={false}
      />
      <div className="flex justify-end mt-10">
        <Pagination
          showSizeChanger={false}
          defaultCurrent={1}
          total={100}
          onChange={(page: number, pSize: number) => {
            setCurrentPage(page);
          }}
        />
      </div>
      <Modal
        open={isOpenModal}
        title={
          <Typography className="text-2xl font-medium">Add Movie</Typography>
        }
        centered
        onCancel={() => setIsOpenModal(false)}
        footer={false}
        width={750}
      >
        <Form

          className="m-w-[450px] my-4"
          onFinish={handleSubmit(onSubmit)}
        >
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
                render={({ field:{onChange,...field} }) => (
                  <Upload
                    {...field}
                    name="avatar"
                    fileList={[]}
                    listType="picture-card"
                    showUploadList={false}
                    className="avatar-uploader"
                    multiple={false}
                    beforeUpload={()=>false}
                    onChange={(infor)=>{
                        onChange(infor.file);
                    }}
                    
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      {watchhinhAnh ? <img className="w-[100px] h-[120px] object-cover" src={URL.createObjectURL(new Blob([watchhinhAnh]))}/>: (<><PlusOutlined></PlusOutlined> 
                      <div style={{marginTop:8}}>
                          Upload
                      </div>
                      </>)}
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
    </div>
  );
};

export default Moviemanagement;
