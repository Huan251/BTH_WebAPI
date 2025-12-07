import e from 'express';
import { account} from '../model/accout.js';
  export const getAllAccout = (req, res) => {
  res.status(200).json(account);
  }
  // lấy theo tên tài khoản 
  export const getAccoutById = (req, res) => {
  const TenTK = req.params.TenTK;
  const accout = account.find(u => u.TenTK === TenTK); 
  if (accout) {
    res.status(200).json(accout);
  } else {
    res.status(404).json({ message: 'Account not found' });
  }  }
 
  // lấy theo mô tả
  export const getAccoutByName = (req, res) => {
    const MoTa = req.params.MoTa; 
    const accout = account.find(u => u.MoTa === MoTa); 
    if (accout) {
      res.status(200).json(accout);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }  }
     
    // thêm thông tin tài khoản
    export const addAccout = (req, res) => {
      const { TenTK, MatKhau, MoTa } = req.body;
      const newAccout = { TenTK, MatKhau, MoTa };
      account.push(newAccout);
      res.status(201).json(newAccout);
    };

    //  sửa thông tin tài khoản
    export const updateAccout = (req, res) => {
      const TenTK = req.params.TenTK;
      const { MatKhau, MoTa } = req.body;
      const accout = account.find(u => u.TenTK === TenTK);
      if (accout) {
        accout.MatKhau = MatKhau || accout.MatKhau;
        accout.MoTa = MoTa || accout.MoTa;
        res.status(200).json(accout);
      } else {
        res.status(404).json({ message: 'Account not found' });
      }};

    // xóa thông tin tài khoản
    export const deleteAccout = (req, res) => {
      const TenTK = req.params.TenTK;
      const index = account.findIndex(u => u.TenTK === TenTK);
      if (index !== -1) {
        const deletedAccout = account.splice(index, 1);
        res.status(200).json(deletedAccout);
      } else {
        res.status(404).json({ message: 'Account not found' });
      }};