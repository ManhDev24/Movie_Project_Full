import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { movieApi } from "../../apis/movie.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Button } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import { Navigate } from "react-router-dom";
interface PhimDetailParams {
  maPhim: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MovieDetail: React.FC = () => {
  const params = useParams();
  const StyledTab = styled(Tab)(({ theme, selected }) => ({
    ...(selected && {
      color: "red",
    }),
  }));
  const [detailId, setDetailId] = useState({});
  const [value, setValue] = React.useState(0);
  const [detailMovieTheater, setMovieTheater] = useState({});
  const navigate = useNavigate()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchMovieDetail = async () => {
    const result = await movieApi.getMovieDetail(params.movieId);

    setDetailId(result);
  };

  const fetchMovieTheater = async () => {
    const resultTheater = await movieApi.getTheaterByMovieShow(params.movieId);
    setMovieTheater(resultTheater);
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [params.movieId]);
  useEffect(() => {
    fetchMovieTheater();
  }, [params.movieId]);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${detailId.hinhAnh})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto", // Đảm bảo phần tử có kích thước để hiển thị hình ảnh nền
    width: "100%", // Đảm bảo phần tử có kích thước rộng đủ
  };
  const numStars = Math.floor(detailId.danhGia / 2);
  const starsElement = document.getElementById("stars");
  let span = "";
  for (var i = 0; i < numStars; i++) {
    span += "<span>★</span>";
  }
  if (starsElement) {
    starsElement.innerHTML = span;
  } else {
    console.error("Phần tử với id 'stars' không tồn tại.");
  }
  const heThongRapChieu = detailMovieTheater.heThongRapChieu || [];
  const [selectedRap, setSelectedRap] = useState(null);
  const handleButtonClick = (maHeThongRap: any) => {
    setSelectedRap(maHeThongRap);
  };
  const selectedRapData = heThongRapChieu.find(
    (rap: any) => rap.maHeThongRap === selectedRap
  );
  
  

  return (
    <div style={{ backgroundColor: "rgb(10, 32, 41)" }}>
      <div className="relative w-[100%] h-[41vw]">
        <div className="movieDetail__detailbackground-setup">
          <div className="jss778 " style={backgroundStyle}></div>
          <div className="top-0 left-0 right-0 bottom-0 ">
            <div className="movieDetail__detail-add">
              <div className="movieDetail__detail-img ">
                <img src={detailId.hinhAnh} alt="" />
              </div>
              <div className="movieDetail__detail-content">
                <p>{dayjs(detailId.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
                <p>
                  <span className="movieDetail__detail-span font-semibold">
                    C18
                  </span>
                  {detailId.tenPhim}
                </p>
                <p className="movieDetail__detail-descript">{detailId.moTa}</p>
                <Button className="movieDetail__detail-btnInfo uppercase font-semibold">
                  Mua vé
                </Button>
              </div>
              <div className="movieDetail__detail-rate">
                <div className="movieDetail__detail-ratetitle">
                  <span>{detailId.danhGia}</span>
                  <div
                    className="MuiCircularProgress-root jss67 MuiCircularProgress-colorSecondary MuiCircularProgress-determinate"
                    role="progressbar"
                    aria-valuenow={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: "rotate(-90deg)",
                    }}
                  >
                    <svg
                      className="MuiCircularProgress-svg"
                      viewBox="22 22 44 44"
                    >
                      <circle
                        className="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate"
                        cx={44}
                        cy={44}
                        r="20.2"
                        fill="none"
                        strokeWidth="3.6"
                        style={{
                          strokeDasharray: "126.92",
                          strokeDashoffset: 0,
                        }}
                      />
                    </svg>
                  </div>
                  <div
                    className="MuiCircularProgress-root jss66 MuiCircularProgress-colorSecondary MuiCircularProgress-determinate"
                    role="progressbar"
                    aria-valuenow={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: "rotate(-90deg)",
                    }}
                  >
                    <svg
                      className="MuiCircularProgress-svg"
                      viewBox="22 22 44 44"
                    >
                      <circle
                        className="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate"
                        cx={44}
                        cy={44}
                        r="20.2"
                        fill="none"
                        strokeWidth="3.6"
                        style={{
                          strokeDasharray: "126.92",
                          strokeDashoffset: 0,
                        }}
                      />
                    </svg>
                  </div>
                </div>
                <span
                  className="MuiRating-root MuiRating-readOnly"
                  role="img"
                  aria-label="5 Stars"
                >
                  <span className="MuiRating-decimal">
                    <span
                      style={{
                        width: "0%",
                        overflow: "hidden",
                        zIndex: 1,
                        position: "absolute",
                      }}
                    >
                      <span className="MuiRating-icon MuiRating-iconFilled">
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </span>
                    </span>
                    <span>
                      <span
                        id="stars"
                        className="MuiRating-icon MuiRating-iconFilled"
                      >
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movieDetail__container-tab my-4">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <StyledTab
                className="jss79 "
                value={0}
                label="LỊCH CHIẾU"
                {...heThongRapChieu.map((rap: any, index: any) => ({
                  ...a11yProps(rap.maHeThongRap),
                }))}
              />
              {/* <StyledTab
                className="jss79 "
                value={1}
                label="ĐÁNH GIÁ"
                {...a11yProps(1)}
              /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="MuiBox-root jss120">
              <div className="jss121">
                <div className="MuiTabs-root jss122 MuiTabs-vertical">
                  <div
                    className="MuiTabs-scrollable"
                    style={{
                      width: 99,
                      height: 99,
                      position: "absolute",
                      top: "-9999px",
                      overflow: "scroll",
                    }}
                  />
                  <div
                    className="MuiTabs-scroller MuiTabs-scrollable"
                    style={{ marginBottom: 0 }}
                  >
                    <div
                      className="MuiTabs-flexContainer MuiTabs-flexContainerVertical"
                      role="tablist"
                    >
                      {heThongRapChieu.map((rap: any) => (
                        <button
                          key={rap.maHeThongRap}
                          className={`MuiButtonBase-root MuiTab-root jss125 MuiTab-textColorInherit ${
                            selectedRap === rap.maHeThongRap
                              ? "Mui-selected"
                              : ""
                          }`}
                          type="button"
                          role="tab"
                          aria-selected={selectedRap === rap.maHeThongRap}
                          onClick={() => handleButtonClick(rap.maHeThongRap)}
                        >
                          <span className="MuiTab-wrapper jss124">
                            <img
                              className="jss126"
                              src={rap.logo}
                              alt="logoTheater"
                            />
                            <span className="span_logo">
                              {rap.tenHeThongRap}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                    <span
                      className=" jss118 MuiTabs-indicator jss123 jss119"
                      style={{ top: 0, height: 90 }}
                    />
                  </div>
                </div>
                <div className="jss127">
                  <div style={{ display: "block" }}>
                    <div>
                      {selectedRapData ? (
                        <div style={{ display: "block" }}>
                          <div className="jss132">
                            <div className="MuiPaper-root MuiAccordion-root jss137 Mui-expanded jss138 MuiPaper-elevation1">
                              <div
                                className="MuiButtonBase-root MuiAccordionSummary-root jss139 Mui-expanded jss141"
                                role="button"
                                aria-disabled="false"
                                aria-expanded="true"
                              >
                                <div className="MuiAccordionSummary-content jss140 Mui-expanded jss141">
                                  <img
                                    className="jss134"
                                    src={selectedRapData.logo} // Sử dụng logo từ đối tượng được chọn
                                    alt="theater"
                                  />
                                  <div className="jss135">
                                    <p className="jss142 jss144">
                                      <span>
                                        {selectedRapData.tenHeThongRap}{" "}
                                      </span>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: 14,
                                        color: "rgb(155, 155, 155)",
                                      }}
                                    >
                                      {/* Thông tin chi tiết khác nếu có */}
                                    </p>
                                  </div>
                                  <div style={{ clear: "both" }} />
                                </div>
                              </div>
                              <div
                                className="MuiCollapse-container MuiCollapse-entered"
                                style={{ minHeight: 180 }}
                              >
                                <div className="MuiCollapse-wrapper">
                                  <div className="MuiCollapse-wrapperInner">
                                    <div role="region">
                                      <div className="MuiAccordionDetails-root jss145">
                                        {selectedRapData.cumRapChieu &&
                                          selectedRapData.cumRapChieu.map(
                                            (schedule, index) => (
                                              <div
                                                className="jss146 jss148 flex flex-wrap"
                                                key={index}
                                              >
                                                <div>
                                                  <img
                                                    style={{ width: "60px" }}
                                                    src={schedule.hinhAnh}
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="jss147">
                                                  <p>{schedule.tenCumRap}</p>
                                                  <p>{schedule.diaChi}</p>
                                                  <p>
                                                    {schedule.lichChieuPhim.map((value, index) => (
                                                      <Button onClick={() => navigate(`/booking/${value.maLichChieu}`)}>
                                                        <p>Ngày giờ khởi chiếu:{dayjs(value.ngayChieuGioChieu).format('MM/DD/YYYY h:mm A')}</p>
                                                        <br />
                                                        <p>Thời lượng: {value.thoiLuong}</p>
                                                        <br />
                                                        <p>Tên Rạp: {value.tenRap}</p>
                                                      </Button>
                                                    ))}
                                                  </p>
                                                </div>
                                              </div>
                                            )
                                          )}
                                       
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          Vui lòng chọn một hệ thống rạp để xem thông tin.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel> */}
        </Box>
      </div>
    </div>
  );
};

export default MovieDetail;
