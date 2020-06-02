export class CustomsDeclaration {
    constructor(
        public _id?: string,
        public masoTK?: string,
        public tkSo?: string,
        public tkSoAfter?: string,
        public tkSoAfter1?: string,
        public ngayGui?: string,
        public transactionID?: string,
        public transactionIDKey?: string,
        public shipmentID?: string,
        public ngayDangKy?: string,
        public soluongTK?: string,
        public cucHQ?: string,
        public chicucHQ?: string,
        public canboDangKy?: string,
        public nguoiGui?: string,
        public nguoiNhan?: string,
        public nguoiUyQuyen?: string,
        public soCMTNguoiGui?: string,
        public soCMTNguoiNhan?: string,
        public soCMTNguoiUyQuyen?: string,
        public coquanCapNguoiGui?: string,
        public coquanCapNguoiNhan?: string,
        public coquanCapNguoiUyQuyen?: string,
        public ngayCapNguoiGui?: string,
        public ngayCapNguoiNhan?: string,
        public ngayCapNguoiUyQuyen?: string,
        public mstNguoiGui?: string,
        public mstNguoiNhan?: string,
        public mstNguoiUyQuyen?: string,
        public loaihinh1?: boolean,
        public loaihinh2?: boolean,
        public loaihinh3?: boolean,
        public loaihinh4?: boolean,
        public loaihinh5?: boolean,
        public loaihinh6?: boolean,
        public loaihinh7?: boolean,
        public loaihinh8?: boolean,
        public loaihinh9?: boolean,
        public loaihinh10?: boolean,
        public giayphepCoQuanCap?: string,
        public soGiayPhep?: string,
        public ngayGP?: string,
        public ngayHetHan?: string,
        public giaytoKemTheo?: string,
        public nguoiKhai?: string,
        public currency?: string,
        public nonTrading?: boolean,
        public cangXep?: string,
        public cangDo?: string,
        public cangXepEnglish?: string,
        public crate?: string,
        public tauDi?: string,
        public ngayDi?: string,
        public customsDate?: string,
        public footerNote?: string,
        public detailNotes?: string,
        public descriptionM?: string,
        public noteOfNonVAT?: string,
        public soHopDong?: string,
        public ngayHD?: string,
        public ngayHetHD?: string,
        public nuocNhapKhau?: string,
        public nuocNhapKhauID?: string,
        public cuakhauXH?: string,
        public maCK?: string,
        public dieukienGH?: string,
        public dieukienDG?: string,
        public ngayGH?: string,
        public tygiaTinhThue?: number,
        public phuongthucTT?: string,
        public phuongthucTTDetail?: string,
        public chungtuTT?: string,
        public containerSize?: string,
        public containerQuantity?: string,
        public lhCothue?: boolean,
        public lhKoCothue?: boolean,
        public lhKD?: boolean,
        public lhDT?: boolean,
        public lhXTN?: boolean,
        public lhGC?: boolean,
        public lhSXXK?: boolean,
        public lhTX?: boolean,
        public lhOthers?: boolean,
        public chungtuDiKem1?: string,
        public chungtuDiKem2?: string,
        public chungtuDiKem3?: string,
        public chungtuDiKem4?: string,
        public bc1?: string,
        public bc2?: string,
        public bc3?: string,
        public bc4?: string,
        public bc5?: string,
        public bc6?: string,
        public bc7?: string,
        public bc8?: string,
        public bs1?: string,
        public bs2?: string,
        public bs3?: string,
        public bs4?: string,
        public bs5?: string,
        public bs6?: string,
        public bs7?: string,
        public bs8?: string,
        public bi1?: string,
        public bi2?: string,
        public bi3?: string,
        public bi4?: string,
        public bi5?: string,
        public bi6?: string,
        public bi7?: string,
        public bi8?: string,
        public daiLy?: string,
        public scmtDaiLy?: string,
        public grossWeight?: number,
        public mcbm?: number,
        public sokien?: string,
        public soHDTM?: string,
        public ngayHDTM?: string,
        public sohieuPTVT?: string,
        public ngayDen?: string,
        public billofLandingNo?: string,
        public billDate?: string,
        public nuocXuatKhau?: string,
        public portofDischarge?: string,
        public maCKXH?: string,
        public placeofDelivery?: string,
        public maCangXH?: string,
        public STT?: string,
        public tenHangHoa?: string,
        public masoHangHoa?: string,
        public xuatxu?: string,
        public luongHangHoa?: string,
        public donviTinh?: string,
        public dongiaNguyenTe?: string,
        public trigiaNguyenTe?: number,
        public trigiaTinhthue?: string,
        public thueSuat?: string,
        public tienThue?: string,
        public gtgtTrigiaTT?: string,
        public gtgtThuesuat?: string,
        public gtgtTienthue?: string,
        public thukhacTyle?: string,
        public tongTGTT?: number,
        public tongTienthue?: number,
        public tongGTGTTienthue?: number,
        public tongthuKhac?: number,
        public tongcongBS?: number,
        public tongBangChu?: string,
        public isImport?: boolean,
        public ctnsType?: string,
        public loaihinh?: string,
        public maLoaiHinh?: string,
        public pluong?: string
    ) {
        if (this._id == null) { this._id = null; }
        if (this.masoTK == null) { this.masoTK = null; }
        if (this.tkSo == null) { this.tkSo = null; }
        if (this.tkSoAfter == null) { this.tkSoAfter = null; }
        if (this.tkSoAfter1 == null) { this.tkSoAfter1 = null; }
        if (this.ngayGui == null) { this.ngayGui = null; }
        if (this.transactionID == null) { this.transactionID = null; }
        if (this.transactionIDKey == null) { this.transactionIDKey = null; }
        if (this.shipmentID == null) { this.shipmentID = null; }
        if (this.ngayDangKy == null) { this.ngayDangKy = null; }
        if (this.soluongTK == null) { this.soluongTK = null; }
        if (this.cucHQ == null) { this.cucHQ = null; }
        if (this.chicucHQ == null) { this.chicucHQ = null; }
        if (this.canboDangKy == null) { this.canboDangKy = null; }
        if (this.nguoiGui == null) { this.nguoiGui = null; }
        if (this.nguoiNhan == null) { this.nguoiNhan = null; }
        if (this.nguoiUyQuyen == null) { this.nguoiUyQuyen = null; }
        if (this.soCMTNguoiGui == null) { this.soCMTNguoiGui = null; }
        if (this.soCMTNguoiNhan == null) { this.soCMTNguoiNhan = null; }
        if (this.soCMTNguoiUyQuyen == null) { this.soCMTNguoiUyQuyen = null; }
        if (this.coquanCapNguoiGui == null) { this.coquanCapNguoiGui = null; }
        if (this.coquanCapNguoiNhan == null) { this.coquanCapNguoiNhan = null; }
        if (this.coquanCapNguoiUyQuyen == null) { this.coquanCapNguoiUyQuyen = null; }
        if (this.ngayCapNguoiGui == null) { this.ngayCapNguoiGui = null; }
        if (this.ngayCapNguoiNhan == null) { this.ngayCapNguoiNhan = null; }
        if (this.ngayCapNguoiUyQuyen == null) { this.ngayCapNguoiUyQuyen = null; }
        if (this.mstNguoiGui == null) { this.mstNguoiGui = null; }
        if (this.mstNguoiNhan == null) { this.mstNguoiNhan = null; }
        if (this.mstNguoiUyQuyen == null) { this.mstNguoiUyQuyen = null; }
        if (this.loaihinh1 == null) { this.loaihinh1 = null; }
        if (this.loaihinh2 == null) { this.loaihinh2 = null; }
        if (this.loaihinh3 == null) { this.loaihinh3 = null; }
        if (this.loaihinh4 == null) { this.loaihinh4 = null; }
        if (this.loaihinh5 == null) { this.loaihinh5 = null; }
        if (this.loaihinh6 == null) { this.loaihinh6 = null; }
        if (this.loaihinh7 == null) { this.loaihinh7 = null; }
        if (this.loaihinh8 == null) { this.loaihinh8 = null; }
        if (this.loaihinh9 == null) { this.loaihinh9 = null; }
        if (this.loaihinh10 == null) { this.loaihinh10 = null; }
        if (this.giayphepCoQuanCap == null) { this.giayphepCoQuanCap = null; }
        if (this.soGiayPhep == null) { this.soGiayPhep = null; }
        if (this.ngayGP == null) { this.ngayGP = null; }
        if (this.ngayHetHan == null) { this.ngayHetHan = null; }
        if (this.giaytoKemTheo == null) { this.giaytoKemTheo = null; }
        if (this.nguoiKhai == null) { this.nguoiKhai = null; }
        if (this.currency == null) { this.currency = null; }
        if (this.nonTrading == null) { this.nonTrading = null; }
        if (this.cangXep == null) { this.cangXep = null; }
        if (this.cangDo == null) { this.cangDo = null; }
        if (this.cangXepEnglish == null) { this.cangXepEnglish = null; }
        if (this.crate == null) { this.crate = null; }
        if (this.tauDi == null) { this.tauDi = null; }
        if (this.ngayDi == null) { this.ngayDi = null; }
        if (this.customsDate == null) { this.customsDate = null; }
        if (this.footerNote == null) { this.footerNote = null; }
        if (this.detailNotes == null) { this.detailNotes = null; }
        if (this.descriptionM == null) { this.descriptionM = null; }
        if (this.noteOfNonVAT == null) { this.noteOfNonVAT = null; }
        if (this.soHopDong == null) { this.soHopDong = null; }
        if (this.ngayHD == null) { this.ngayHD = null; }
        if (this.ngayHetHD == null) { this.ngayHetHD = null; }
        if (this.nuocNhapKhau == null) { this.nuocNhapKhau = null; }
        if (this.nuocNhapKhauID == null) { this.nuocNhapKhauID = null; }
        if (this.cuakhauXH == null) { this.cuakhauXH = null; }
        if (this.maCK == null) { this.maCK = null; }
        if (this.dieukienGH == null) { this.dieukienGH = null; }
        if (this.dieukienDG == null) { this.dieukienDG = null; }
        if (this.ngayGH == null) { this.ngayGH = null; }
        if (this.tygiaTinhThue == null) { this.tygiaTinhThue = null; }
        if (this.phuongthucTT == null) { this.phuongthucTT = null; }
        if (this.phuongthucTTDetail == null) { this.phuongthucTTDetail = null; }
        if (this.chungtuTT == null) { this.chungtuTT = null; }
        if (this.containerSize == null) { this.containerSize = null; }
        if (this.containerQuantity == null) { this.containerQuantity = null; }
        if (this.lhCothue == null) { this.lhCothue = null; }
        if (this.lhKoCothue == null) { this.lhKoCothue = null; }
        if (this.lhKD == null) { this.lhKD = null; }
        if (this.lhDT == null) { this.lhDT = null; }
        if (this.lhXTN == null) { this.lhXTN = null; }
        if (this.lhGC == null) { this.lhGC = null; }
        if (this.lhSXXK == null) { this.lhSXXK = null; }
        if (this.lhTX == null) { this.lhTX = null; }
        if (this.lhOthers == null) { this.lhOthers = null; }
        if (this.chungtuDiKem1 == null) { this.chungtuDiKem1 = null; }
        if (this.chungtuDiKem2 == null) { this.chungtuDiKem2 = null; }
        if (this.chungtuDiKem3 == null) { this.chungtuDiKem3 = null; }
        if (this.chungtuDiKem4 == null) { this.chungtuDiKem4 = null; }
        if (this.bc1 == null) { this.bc1 = null; }
        if (this.bc2 == null) { this.bc2 = null; }
        if (this.bc3 == null) { this.bc3 = null; }
        if (this.bc4 == null) { this.bc4 = null; }
        if (this.bc5 == null) { this.bc5 = null; }
        if (this.bc6 == null) { this.bc6 = null; }
        if (this.bc7 == null) { this.bc7 = null; }
        if (this.bc8 == null) { this.bc8 = null; }
        if (this.bs1 == null) { this.bs1 = null; }
        if (this.bs2 == null) { this.bs2 = null; }
        if (this.bs3 == null) { this.bs3 = null; }
        if (this.bs4 == null) { this.bs4 = null; }
        if (this.bs5 == null) { this.bs5 = null; }
        if (this.bs6 == null) { this.bs6 = null; }
        if (this.bs7 == null) { this.bs7 = null; }
        if (this.bs8 == null) { this.bs8 = null; }
        if (this.bi1 == null) { this.bi1 = null; }
        if (this.bi2 == null) { this.bi2 = null; }
        if (this.bi3 == null) { this.bi3 = null; }
        if (this.bi4 == null) { this.bi4 = null; }
        if (this.bi5 == null) { this.bi5 = null; }
        if (this.bi6 == null) { this.bi6 = null; }
        if (this.bi7 == null) { this.bi7 = null; }
        if (this.bi8 == null) { this.bi8 = null; }
        if (this.daiLy == null) { this.daiLy = null; }
        if (this.scmtDaiLy == null) { this.scmtDaiLy = null; }
        if (this.grossWeight == null) { this.grossWeight = null; }
        if (this.mcbm == null) { this.mcbm = null; }
        if (this.sokien == null) { this.sokien = null; }
        if (this.soHDTM == null) { this.soHDTM = null; }
        if (this.ngayHDTM == null) { this.ngayHDTM = null; }
        if (this.sohieuPTVT == null) { this.sohieuPTVT = null; }
        if (this.ngayDen == null) { this.ngayDen = null; }
        if (this.billofLandingNo == null) { this.billofLandingNo = null; }
        if (this.billDate == null) { this.billDate = null; }
        if (this.nuocXuatKhau == null) { this.nuocXuatKhau = null; }
        if (this.portofDischarge == null) { this.portofDischarge = null; }
        if (this.maCKXH == null) { this.maCKXH = null; }
        if (this.placeofDelivery == null) { this.placeofDelivery = null; }
        if (this.maCangXH == null) { this.maCangXH = null; }
        if (this.STT == null) { this.STT = null; }
        if (this.tenHangHoa == null) { this.tenHangHoa = null; }
        if (this.masoHangHoa == null) { this.masoHangHoa = null; }
        if (this.xuatxu == null) { this.xuatxu = null; }
        if (this.luongHangHoa == null) { this.luongHangHoa = null; }
        if (this.donviTinh == null) { this.donviTinh = null; }
        if (this.dongiaNguyenTe == null) { this.dongiaNguyenTe = null; }
        if (this.trigiaNguyenTe == null) { this.trigiaNguyenTe = null; }
        if (this.trigiaTinhthue == null) { this.trigiaTinhthue = null; }
        if (this.thueSuat == null) { this.thueSuat = null; }
        if (this.tienThue == null) { this.tienThue = null; }
        if (this.gtgtTrigiaTT == null) { this.gtgtTrigiaTT = null; }
        if (this.gtgtThuesuat == null) { this.gtgtThuesuat = null; }
        if (this.gtgtTienthue == null) { this.gtgtTienthue = null; }
        if (this.thukhacTyle == null) { this.thukhacTyle = null; }
        if (this.tongTGTT == null) { this.tongTGTT = null; }
        if (this.tongTienthue == null) { this.tongTienthue = null; }
        if (this.tongGTGTTienthue == null) { this.tongGTGTTienthue = null; }
        if (this.tongthuKhac == null) { this.tongthuKhac = null; }
        if (this.tongcongBS == null) { this.tongcongBS = null; }
        if (this.tongBangChu == null) { this.tongBangChu = null; }
        if (this.isImport == null) { this.isImport = null; }
        if (this.ctnsType == null) { this.ctnsType = null; }
        if (this.loaihinh == null) { this.loaihinh = null; }
        if (this.maLoaiHinh == null) { this.maLoaiHinh = null; }
        if (this.pluong == null) { this.pluong = null; }
    }
}