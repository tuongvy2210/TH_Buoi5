let curItem = null;
let products = [];
$(function () {
    var data = [
        {
            "value": "Quạt Bàn YANFAN B202",
            "label": "Quạt Bàn YANFAN B202 - 179.000Đ",
            "maSP": 'SP001',
            "tenSP": "Quạt Bàn YANFAN B202",
            "DG": 179000,
            "DVT": "Cái",
            "Loai": "Gia dụng"
        }, {
            "value": "Quạt Điều Hòa Không Khí Rapido Everest 3000-D",
            "label": "Quạt Điều Hòa Không Khí Rapido Everest 3000-D - 999.000Đ",
            "maSP": 'SP002',
            "tenSP": "Quạt Điều Hòa Không Khí Rapido Everest 3000-D",
            "DG": 999000,
            "DVT": "Cái",
            "Loai": "Gia dụng"
        }, {
            "value": "Máy Lạnh Sunhouse 1.0 HP SHR-AW09C110",
            "label": "Máy Lạnh Sunhouse 1.0 HP SHR-AW09C110 - 3.999.000Đ",
            "maSP": 'SP003',
            "tenSP": "Máy Lạnh Sunhouse 1.0 HP SHR-AW09C110",
            "DG": 3999000,
            "DVT": "Cái",
            "Loai": "Điện lạnh"
        }, {
            "value": "Smart Tivi Samsung 4K UHD 55 Inch UA55AU8000",
            "label": "Smart Tivi Samsung 4K UHD 55 Inch UA55AU8000 - 9.999.000Đ",
            "maSP": 'SP004',
            "tenSP": "Smart Tivi Samsung 4K UHD 55 Inch UA55AU8000",
            "DG": 9999000,
            "DVT": "Cái",
            "Loai": "Tivi"
        }
    ];
    $("#txtSanPham").autocomplete({
        source: data,
        //để chọn đc 1 item dùng select
        select: (e, ui) => {
            curItem = ui.item;
        }
    });
});

function add() {
    //#txtSoLuong đang ở dạng chuỗi nên cần chuyển kiểu bằng cách dùng thủ thuật * 1, nếu k thì dùng parseInt
    //#txtSoLuong is string datatype so that it needs to be cast to number datatype by a trick * 1, otherwise using parseInt
    //curItem.soLuong là thêm 1 thuộc tính số lượng vào 1 object
    //curItem.soLuong add 1 property quantity into 1 object
    let soLuong = $('#txtSoLuong').val() * 1;
    product = products.find(item => item.maSP === curItem.maSP);
    if (product) {
        product.soLuong += soLuong;
    } else {
        curItem.soLuong = soLuong;
        products.push(curItem);
    }

    render();
}

function remove(maSP) {
    // let index = 0;
    // for (let i = 0; i < products.length; i++) {
    //     if (products[i].maSP == maSP) {
    //         index = i;
    //         break;
    //     }
    // }
    // products.splice(index, 1);

    products = products.filter(item => item.maSP !== maSP);

    render();
}

function render() {
    //#productTemplate là id của template, products là mảng chứa các sản phẩm trong giỏ hàng, #dsSanPham là id của nơi mà muốn hiển thị ra
    //#productTemplate is id of template, products is array contains product in cart, #dsSanPham is id of where to show those products
    $('#dsSanPham').html('');
    $("#productTemplate").tmpl(products).appendTo("#dsSanPham");

    let sumTotal = products.reduce((acc, cur) => acc + (cur.soLuong * cur.DG), 0)
    $('#tongTien').text(sumTotal);
}