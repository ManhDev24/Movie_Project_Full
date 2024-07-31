import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Controller, set, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { userAPI } from '../../../apis/user.api';
import { UserLoginRequest } from '../../../interface/user.interface';
import { setLocalStorage } from '../../../utils';
import { CurrentUser } from '../../../interface/user.interface';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/user_slices';

interface FormValues {
  username:string,
  password:string
}

const Login = () => {
  const {handleSubmit,control,formState:{errors}}  = useForm<FormValues>(
    {
      defaultValues:{
        username:"",
        password:"",
      }
    }
  );

  const dispatch = useDispatch();
  const {mutate:handleLogin, isPending} = useMutation({
    mutationFn:(payload:UserLoginRequest) => userAPI.login(payload),
    onSuccess:(currentUser)=>{
        setLocalStorage<CurrentUser>('User',currentUser);
        dispatch(setUser(currentUser));
    },
    onError:(error:any)=>{

    }
  });
  const onSubmit = (values:FormValues)=>{
    const payload = {
      taiKhoan: values.username,
      matKhau: values.password
    }
    handleLogin(payload);
  }
  return (
    <div className="w-[400px] ">
      <div className="my-4 text-center">
        <Typography className="font-bold text-3xl">Đăng nhập</Typography>
        <Typography className="mt-2">Hi, Chào mừng bạn quay lại 👋</Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Tài khoản</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                // field : {name : "username" , onChange: ()=> , onBlur : ()=> {},...}
                return (
                  <Input
                    {...field}
                    type="text"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập tài khoản..."
                    status={errors.username ? 'error' : ''}
                  />
                );
              }}
            />
            {errors?.username && (
              <>
                <p className="text-xs text-red-600">{(errors.username as any).types.required}</p>
                <p className="text-xs text-red-600">{(errors.username as any).types.min}</p>
              </>
            )}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="password"
                    size="large"
                    className="mt-1"
                    placeholder="Vui lòng nhập mật khẩu..."
                    status={errors.password ? 'error' : ''}
                  />
                );
              }}
            />
            {errors?.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
          </Col>

          <Col span={24}>
            <Button type="primary" htmlType="submit" size="large" block>
              Đăng nhập
            </Button>
          </Col>
        </Row>
      </Form>

      <Typography className="mt-8 text-center">
        Chưa có tài khoản? <span className="text-blue-700 font-medium cursor-pointer">Tạo tài khoản</span>
      </Typography>
    </div>
  )
}

export default Login
