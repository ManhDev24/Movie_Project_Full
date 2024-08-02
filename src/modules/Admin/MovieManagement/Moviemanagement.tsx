import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ClockCircleFilled,
  LoadingOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SyncOutlined,
  DeleteOutlined,
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
  Popconfirm,
  Radio,
  Rate,
  Row,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { userAPI } from "../../../apis/user.api";
import { GROUP_CODE, PAGE_SIZE, USER_TYPES_MAPPING } from "../../../constant";
import { UserItem } from "../../../interface/user.interface";
import { useState } from "react";
import { movieApi } from "../../../apis/movie.api";
import { DataListMovie, Movie } from "../../../interface/movie.interface";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { useListMovie } from "../../../hooks/useListMovie";
import { useOpenModal } from "../../../hooks/useOpenModal";
import AddOrEditMovie, { FormValues } from "./AddOrEditMovie";



const Moviemanagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const {isOpen,openModal,closeModal} = useOpenModal();
  const { data, isFetching, error } = useListMovie(currentPage);
  ;
  
  // add
  const { mutate: handleAddMovieApi, isPending } = useMutation({
    mutationFn: movieApi.addMovie,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  // delete
  const { mutate: handleDeleteMovieApi, isPending: isDeleting } = useMutation({
    mutationFn: (idMovie: string) => movieApi.deleteMovie(idMovie),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['list-movies', { currentPage }],
        type: 'active',
      });
    },
    onError: (error) => {
      console.log('error', error);
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
      render: (record: Movie) => {
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

      render: (record: Movie) => {
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

      render: (record: Movie) => {
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
            <Popconfirm  
              title="Delete the movie"
              description="Are you sure to delete this movie?"
              onConfirm={() => handleDeleteMovieApi(record.maPhim.toString())}
              onCancel={()=>{}}
              okText="Yes"
              cancelText="No"
              
            >
              <Button
                type="primary"
                danger
               
                disabled={isDeleting}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const dataSource = data?.items || [];
 
  const onSubmit = (formValues: FormValues) => {
    console.log("formValues", formValues);
    let formData = new FormData();
    formData.append("tenPhim", formValues.tenPhim);
    formData.append("trailer", formValues.trailer);
    formData.append("moTa", formValues.moTa);
    formData.append("danhGia", formValues.danhGia);
    formData.append("hot", formValues.hot.toString());
    formData.append("hinhAnh", formValues.hinhAnh);
    formData.append("maNhom", GROUP_CODE);
    formData.append("sapChieu", formValues.trangThai ? "false" : "true");
    formData.append("dangChieu", formValues.trangThai ? "true" : "false");
    handleAddMovieApi(formData);
  };

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
          onClick={openModal}
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
        loading={isFetching}
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
      <AddOrEditMovie dataEdit={undefined} isOpen={isOpen} isPending={isPending} onCloseModal={closeModal} onSubmit={onSubmit}/>
    </div>
  );
};

export default Moviemanagement;
