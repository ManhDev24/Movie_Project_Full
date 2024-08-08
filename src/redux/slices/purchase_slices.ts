import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BookingData {
  maLichChieu: string[]
  danhSachVe: Array<{
    maGhe: number
    giaVe: number
  }>[]
  bookingTime: string[]
}

const initialState: BookingData = {
  maLichChieu: [],
  danhSachVe: [],
  bookingTime: [],
}

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    saveBookingData: (
      state,
      action: PayloadAction<{
        maLichChieu: string
        danhSachVe: Array<{
          maGhe: number
          giaVe: number
        }>
        bookingTime: string
      }>
    ) => {
      state.maLichChieu.push(action.payload.maLichChieu)
      state.danhSachVe.push(action.payload.danhSachVe)
      state.bookingTime.push(action.payload.bookingTime)
    },
    clearBookingData: (state) => {
      state.maLichChieu = []
      state.danhSachVe = []
      state.bookingTime = []
    },
  },
})

// Export actions và reducer
export const { saveBookingData, clearBookingData } = purchaseSlice.actions
export default purchaseSlice
