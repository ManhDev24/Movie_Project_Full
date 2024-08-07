import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { Input } from 'antd'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormValues {
  taiKhoan: string
  matKhau: string
  email: string
  soDT: string
  maNhom: string
  maLoaiNguoiDung: string
  hoTen: string
}

const schema = yup
  .object({
    taiKhoan: yup.string().trim().required('Vui lòng nhập thông tin'),
    email: yup
      .string()
      .trim()
      .required('Vui lòng nhập Email')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không hợp lệ'),
    soDT: yup.string().trim().required('Vui lòng nhập Số điện thoại'),
    hoTen: yup.string().trim().required('Vui lòng nhập Họ và tên'),
  })
  .required()

interface ProfileSettingProps {
  DataOfUser?: FormValues
  handleEditUser: (data: FormValues) => void
}

const ProfileSetting: FC<ProfileSettingProps> = ({ DataOfUser, handleEditUser }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      taiKhoan: DataOfUser?.taiKhoan || '',
      email: DataOfUser?.email || '',
      soDT: DataOfUser?.soDT || '',
      hoTen: DataOfUser?.hoTen || '',
    },
    resolver: yupResolver(schema as any),
    mode: 'onBlur',
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Map 'soDT' to 'soDt' for the backend
    const updateData = {
      ...data,
      soDt: data.soDT, // Map 'soDT' to 'soDt'
      matKhau: DataOfUser?.matKhau || '',
      maLoaiNguoiDung: DataOfUser?.maLoaiNguoiDung || '',
      maNhom: DataOfUser?.maNhom || '',
    }

    handleEditUser(updateData)
  }

  return (
    <div>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
            <Link to={PATH.PROFILE} className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full">
              Edit Profile
            </Link>
            <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
              History Purchase
            </a>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <div className="grid max-w-2xl mx-auto mt-8">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="items-center mt-4 sm:mt-14 text-[#202142]">
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black">
                          Email
                        </label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => <Input {...field} status={errors.email ? 'error' : ''} size="large" className="mt-1" placeholder="Email" />}
                        />
                        {errors?.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                      </div>
                      <div className="w-full">
                        <label htmlFor="taiKhoan" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black">
                          Tài khoản
                        </label>
                        <Controller
                          name="taiKhoan"
                          control={control}
                          render={({ field }) => <Input {...field} status={errors.taiKhoan ? 'error' : ''} size="large" className="mt-1" placeholder="Tài Khoản" />}
                        />
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="hoTen" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black">
                        Họ và tên
                      </label>
                      <Controller
                        name="hoTen"
                        control={control}
                        render={({ field }) => <Input {...field} status={errors.hoTen ? 'error' : ''} size="large" className="mt-1" placeholder="Họ và tên" />}
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="soDT" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black">
                        Số điện thoại
                      </label>
                      <Controller
                        name="soDT"
                        control={control}
                        render={({ field }) => <Input {...field} status={errors.soDT ? 'error' : ''} size="large" className="mt-1" placeholder="Số điện thoại" />}
                      />
                      {errors?.soDT && <p className="text-xs text-red-600">{errors.soDT.message}</p>}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileSetting
