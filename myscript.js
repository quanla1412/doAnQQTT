var productArray = [];
var showArray = [];
var maxShow = 8;
var curShow = 1;
var rootPrice;
var curPrice;
var quantity=1;
var size=1;
var statusUser="none";
var curType="all";
var nameUser; 
var totalPrice=0;


function createProduct(){
    if(localStorage.getItem('product')===null){
        productArray = [
            {id: 1, name: 'trà đá', price: 10000, type:'tea', img: '../assets/img/product/TraDa.jpg'},
            {id: 2, name: 'trà chanh', price: 20000, type:'tea', img: '../assets/img/product/TraChanh.jpg'},
            {id: 3, name: 'trà đào', price: 15000, type:'tea', img: '../assets/img/product/TraDao.jpg'},
            {id: 4, name: 'trà tắc', price: 16000, type:'tea', img: '../assets/img/product/TraTac.jpg'},
            {id: 5, name: 'cà phê đen', price: 12000, type:'coffee', img: '../assets/img/product/CaPheDen.jpg'},
            {id: 6, name: 'cà phê sữa', price: 15000, type:'coffee', img: '../assets/img/product/CaPheSua.jpg'},
            {id: 7, name: 'cà phê dừa', price: 30000, type:'coffee', img: '../assets/img/product/CaPheDua.jpg'},
            {id: 8, name: 'cà phê chồn', price: 26000, type:'coffee', img: '../assets/img/product/CaPheChon.jpg'},
            {id: 9, name: 'coca cola', price: 10000, type:'soda', img: '../assets/img/product/CocaCola.jpg'},
            {id: 10, name: 'pepsi', price: 11000, type:'soda', img: '../assets/img/product/Pepsi.jpg'},
            {id: 11, name: 'fanta', price: 9000, type:'soda', img: '../assets/img/product/Fanta.jpg'},
            {id: 12, name: 'sprite', price: 9500, type:'soda', img: '../assets/img/product/Sprite.jpg'}
        ];
        localStorage.setItem('product',JSON.stringify(productArray));
    } else {
        productArray = JSON.parse(localStorage.getItem('product'));
    }
}

function loadAccount(){
    if(localStorage.getItem('account')===null){
        var account = [
            {id: 1, username: 'admin', password:'admin', type: 'admin', fullname:'', email:'', number:''},
            {id: 2, username: 'khach', password:'123', type: 'client', fullname:'Le Anh Tan', email:'leanhtan@gmail.com', number:'0123456789'}
        ];
        localStorage.setItem('account',JSON.stringify(account));
    }
    if(localStorage.getItem('status')===null){
        var statusInfo = {type: "none", username: ""};
        localStorage.setItem('status',JSON.stringify(statusInfo));
    } 
}

function createHistoryBill(){
    var historyBill = [
        {idBill : 1, productId : 1, name: "trà đá", size: "S", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-10") , client: "khach1", address: "tphcm", totalPrice: 34000, number: 2, status: "False"},
        {idBill : 1, productId : 2, name: "trà chanh", size: "L", quantity: 2, price: 24000, comment: "", date:new Date("2021-12-10") , client: "khach1", address: "dong nai", totalPrice: 34000, number: 2, status: "False"},
        {idBill : 2, productId : 4, name: "trà tắc", size: "S", quantity: 3, price: 25000, comment: "", date:new Date("2021-12-10") , client: "khach3", address: "bien hoa", totalPrice: 47000, number: 2,status: "False"},
        {idBill : 2, productId : 5, name: "cà phê đen", size: "M", quantity: 2, price: 22000, comment: "", date:new Date("2021-12-10") , client: "khach3", address: "quan 2", totalPrice: 47000, number: 2,status: "False"},
        {idBill : 3, productId : 2, name: "trà chanh", size: "L", quantity: 4, price: 44000, comment: "", date:new Date("2021-12-10") , client: "khach4", address: "quan 6", totalPrice: 44000, number: 1,status: "False"},
        {idBill : 4, productId : 6, name: "cà phê sữa", size: "S", quantity: 2, price: 20000, comment: "", date:new Date("2021-12-10") , client: "khach2", address: "tan binh", totalPrice: 20000, number: 1,status: "False"},
        {idBill : 5, productId : 4, name: "trà tắc", size: "S", quantity: 2, price: 20000, comment: "", date:new Date("2021-12-10") , client: "khach1", address: "nha be", totalPrice: 60000, number: 3, status: "False"},
        {idBill : 5, productId : 8, name: "cà phê chồn", size: "M", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-10") , client: "khach1", address: "quan 2", totalPrice: 60000, number: 3,status: "False"},
        {idBill : 5, productId : 9, name: "coca cola", size: "L", quantity: 3, price: 30000, comment: "", date:new Date("2021-12-10") , client: "khach1", address: "quan 1", totalPrice: 60000, number: 3,status: "False"},
        {idBill : 6, productId : 3, name: "trà đào", size: "S", quantity: 2, price: 22000, comment: "", date:new Date("2021-12-11") , client: "khach3", address: "long an", totalPrice: 34000, number: 2,status: "False"},
        {idBill : 6, productId : 11, name: "fanta", size: "M", quantity: 1, price: 12000, comment: "", date:new Date("2021-12-11") , client: "khach3", address: "can tho", totalPrice: 34000, number: 2,status: "False"},
        {idBill : 7, productId : 10, name: "pepsi", size: "S", quantity: 1, price: 12000, comment: "", date:new Date("2021-12-11") , client: "khach6", address: "canada", totalPrice: 12000, number: 1,status: "False"},
        {idBill : 8, productId : 7, name: "cà phê dừa", size: "S", quantity: 2, price: 24000, comment: "", date:new Date("2021-12-11") , client: "khach6", address: "tokyo", totalPrice: 24000, number: 1,status: "False"},
        {idBill : 9, productId : 8, name: "cà phê chồn", size: "M", quantity: 3, price: 36000, comment: "", date:new Date("2021-12-11") , client: "khach6", address: "go vap", totalPrice: 106000, number: 3,status: "False"},
        {idBill : 9, productId : 9, name: "coca cola", size: "L", quantity: 4, price: 48000, comment: "", date:new Date("2021-12-11") , client: "khach6", address: "tphcm", totalPrice: 106000, number: 3,status: "False"},
        {idBill : 9, productId : 10, name: "pepsi", size: "S", quantity: 2, price: 22000, comment: "", date:new Date("2021-12-11") , client: "khach6", address: "go vap", totalPrice: 106000, number: 3,status: "False"},
        {idBill : 10, productId : 11, name: "fanta", size: "M", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-11") , client: "khach10", address: "tphcm", totalPrice: 20000, number: 2,status: "False"},
        {idBill : 10, productId : 12, name: "sprite", size: "S", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-11") , client: "khach10", address: "dong nai", totalPrice: 20000, number: 2,status: "False"},
        {idBill : 11, productId : 1, name: "trà đá", size: "L", quantity: 2, price: 12000, comment: "", date:new Date("2021-12-11") , client: "khach6", address: "tphcm", totalPrice: 22000, number: 2,status: "False"},
        {idBill : 11, productId : 2, name: "trà chanh", size: "M", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-11") , client: "khach6", address: "quan 5", totalPrice: 22000, number: 2,status: "False"},
        {idBill : 12, productId : 3, name: "trà đào", size: "S", quantity: 3, price: 33000, comment: "", date:new Date("2021-12-12") , client: "khach7", address: "tphcm", totalPrice: 33000, number: 1,status: "False"},
        {idBill : 13, productId : 4, name: "trà tắc", size: "L", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-12") , client: "khach7", address: "quan 5", totalPrice: 10000, number: 1,status: "False"},
        {idBill : 14, productId : 5, name: "cà phê đen", size: "S", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-12") , client: "khach9", address: "quan 5", totalPrice: 32000,number: 2, status: "False"},
        {idBill : 14, productId : 6, name: "cà phê sữa", size: "L", quantity: 2, price: 22000, comment: "", date:new Date("2021-12-12") , client: "khach9", address: "quan 10", totalPrice: 32000,number: 2, status: "False"},
        {idBill : 15, productId : 2, name: "trà chanh", size: "S", quantity: 2, price: 20000, comment: "", date:new Date("2021-12-12") , client: "khach10", address: "quan 5", totalPrice: 32000,number: 2, status: "False"},
        {idBill : 15, productId : 7, name: "cà phê dừa", size: "M", quantity: 1, price: 12000, comment: "", date:new Date("2021-12-12") , client: "khach10", address: "quan 3", totalPrice: 32000,number: 2, status: "False"},
        {idBill : 16, productId : 1, name: "trà đá", size: "L", quantity: 3, price: 18000, comment: "", date:new Date("2021-12-12") , client: "khach12", address: "tphcm", totalPrice: 18000,number: 1, status: "False"},
        {idBill : 17, productId : 6, name: "cà phê sữa", size: "S", quantity: 4, price: 24000, comment: "", date:new Date("2021-12-12") , client: "khach12", address: "tphcm", totalPrice: 24000,number: 1, status: "False"},
        {idBill : 18, productId : 2, name: "trà chanh", size: "M", quantity: 2, price: 24000, comment: "", date:new Date("2021-12-12") , client: "khach13", address: "quan 2", totalPrice: 24000,number: 1, status: "False"},
        {idBill : 19, productId : 4, name: "trà tắc", size: "S", quantity: 1, price: 10000, comment: "", date:new Date("2021-12-12") , client: "khach14", address: "tphcm", totalPrice: 10000,number: 1, status: "False"},
        {idBill : 20, productId : 10, name: "pepsi", size: "S", quantity: 2, price: 22000, comment: "", date:new Date("2021-12-12") , client: "khach6", address: "go vap", totalPrice: 22000, number: 1,status: "False"}
        ];
    localStorage.setItem('historyBill',JSON.stringify(historyBill));
}

window.onload = function(){
    createProduct();
    showArray = productArray;
    reload(1);

    loadAccount();
    curUser = JSON.parse(localStorage.getItem('status'))['type'];
    nameUser = JSON.parse(localStorage.getItem('status'))['username'];
    changeHeader(curUser, nameUser);

    loadCart();
    if(localStorage.getItem('historyBill')===null)createHistoryBill();
}

function showProduct(cur){
    var s="";
    curShow = cur;
    cur--;
    for(var i=maxShow*cur;i<maxShow*(cur+1) && i<showArray.length;i++){
        s+='<div class="drink-item">' +
            '<img class="item-image" src="' + showArray [i]['img'] + '" alt="san pham"></td>' +
            '<div class="item-name">' + showArray[i]['name'] + '</div>' +
            '<div class="item-price">' + showArray[i]['price'] + ' VNĐ</div>' + 
            '<button class="button-order" onclick="openOrderModal('+i+')">Đặt hàng</button></div>';
    }
    document.getElementById('productList').innerHTML = s;
}

function changeMaxShow(){
    maxShow = parseInt(document.getElementById('maxShow').value);
    reload(1);
}

function showPagination(){
    var s="";
    var n;
    if(showArray.length%maxShow==0)    n = showArray.length/maxShow;
    else    n = showArray.length/maxShow+1;
    if(showArray.length<=maxShow){
        document.getElementById('Pagination').style.display = "none";
        return;
    }    
    document.getElementById('Pagination').style.display = "flex";
    for(var i=1;i<=n;i++){
        s+=' <li id="nav'+i+'" class="pagination-item pagination-item-link"><div class="pagination-item-link" onclick="changePage(' +i + ')">' + i +'</div></li>';
    }
    document.getElementById('pagination-index').innerHTML = s;
}

function reload(cur){
    showProduct(cur);
    showPagination();
    if(cur==1) document.getElementById('nav1').classList.add('pagination-item--active');
}

function changePage(cur){   
    document.getElementById('nav'+cur).classList.add('pagination-item--active');
    document.getElementById('nav'+curShow).classList.remove("pagination-item--active");
    showProduct(cur);
}

function pageDown(){
    var down = curShow-1;
    if(down>0)  changePage(down);
}

function pageUp(){
    var up = curShow+1;
    var n;
    if(showArray.length%maxShow==0)    n = showArray.length/maxShow;
    else    n = showArray.length/maxShow+1;
    if(up<=n)  changePage(up);
}

function openOrderModal(cur) {
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }
    document.getElementById('modal-order').style.display='flex';

    document.getElementById('order-name').innerHTML = showArray[cur]['name'];

    curPrice = rootPrice = showArray[cur]['price']; 
    document.getElementById('rootPrice').innerHTML = rootPrice + ' VNĐ';    
    quantity = 1;
    document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';

    document.getElementById('size-1').style.borderColor='green';
    document.getElementById('size-3').style.borderColor='green';
    document.getElementById('size-2').style.borderColor='orange';
    size=2;

    document.getElementById('order-button').innerHTML = '<button class="modal-order-button" onclick="buy('+cur+')">ĐẶT HÀNG</button>';
}

function closeOrderModal() {
    document.getElementById('modal-order').style.display='none';
}

function incQuantity(){
    quantity++;
    document.getElementById('quantity').innerHTML=quantity;
    curPrice = rootPrice * quantity;
    document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';
}

function decQuantity(){
    if(quantity-1>0){
        quantity--;
        document.getElementById('quantity').innerHTML=quantity;
        curPrice = rootPrice * quantity;
        document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';
    }
}

function changeSize(cur){
    document.getElementById('size-'+size).style.borderColor='green';
    document.getElementById('size-'+cur).style.borderColor='orange';
    rootPrice = rootPrice + (cur-size)*1000;
    curPrice = rootPrice * quantity;
    document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';
    size=cur;
}

function buy(cur){
    var check = confirm('Bạn chắc chắn đặt hàng ?');
    var comment = document.getElementById('txtComment').value;
    if(check==false)    return;
    if(localStorage.getItem('cart')===null){
        var cartItem = [
            {id: cur+1,name: showArray[cur]['name'], size: size, quantity: quantity, price: curPrice, comment: comment}
        ];
    } else {
        var cartItem = JSON.parse(localStorage.getItem('cart'));
        var find=0;
        for(var i=0;i<cartItem.length;i++){
            if(cartItem[i]['id']==cur && cartItem[i]['size'] == size){
                find=1;
                cartItem[i]['quantity']+=quantity;
                cartItem[i]['price']+=curPrice;
            }
        }
        if(find==0) {
            cartItem.push(
                {id: cur+1,name: showArray[cur]['name'], size: size, quantity: quantity, price: curPrice, comment: comment}
            );
        }
    }
    localStorage.setItem('cart',JSON.stringify(cartItem));
    closeOrderModal();
    loadCart();
    alert('Đặt hàng thành công');
    window.location.href="";
}

function showLogIn() {
    document.getElementById('modal_log').style.display="flex";
}

function closeLogIn() {
    document.getElementById('modal_log').style.display="none";
}

function showRegister() {
    document.getElementById('modal-register').style.display="flex";
}

function closeRegister() {
    document.getElementById('modal-register').style.display="none";
}

function changeHeader(type,name){
    document.getElementById(statusUser).style.display = "none";
    document.getElementById(type).style.display = "flex";
    statusUser = type;
    localStorage.setItem('status',JSON.stringify({type: type, username: name}));
    if(type=="admin")   document.getElementById('adminName').innerHTML = name;
    else    if(type=="client")  document.getElementById('clientName').innerHTML = name;
}

function login(){
    var log1 = document.getElementById('log1').value;
    var log2 = document.getElementById('log2').value;

    var ac = JSON.parse(localStorage.getItem('account'));
    for(var i=0; i<ac.length; i++){
        if(ac[i]['username']==log1 && ac[i]['password']==log2){
            changeHeader(ac[i]['type'],ac[i]['username']);
            break;
        }
        if(i==ac.length-1) { 
            alert('Sai thông tin đăng nhập');
            document.getElementById('log2').select();
            document.getElementById('log2').focus();
            return;
        }
    }
    closeLogIn();
    window.location.href="";
}

function logout(){
    changeHeader("none","");
    window.location.href="";
}

function register(){
    var dataAccount = JSON.parse(localStorage.getItem('account'));
    var rFullName = document.getElementById('rgt1');
    rFullName.value = rFullName.value.split();
    var rEmail = document.getElementById('rgt2');
    rEmail.value = rEmail.value.split();
    var rNum = document.getElementById('rgt3');
    rNum.value = rNum.value.split();
    var rUsername = document.getElementById('rgt4');
    rUsername.value = rUsername.value.split();
    var rPassword = document.getElementById('rgt5');
    var rRepassword = document.getElementById('rgt6');

    if(rFullName.value == ""){
        alert('Vui lòng nhập họ tên');
        rFullName.focus();
        rFullName.select();
        return;
    }
    if(rEmail.value == ""){
        alert('Vui lòng nhập email');
        rEmail.focus();
        rEmail.select();
        return;
    }
    if(rNum.value == "" || rNum.value.indexOf(" ")!=-1){
        alert('Vui lòng nhập số điện thoại');
        rNum.focus();
        rNum.select();
        return;
    }
    if(rUsername.value == "" || rUsername.value.indexOf(" ")!=-1){
        alert('Vui lòng nhập tên đăng nhập');
        rUsername.focus();
        rUsername.select();
        return;
    }
    if(rPassword.value == ""){
        alert('Vui lòng nhập mật khẩu');
        rPassword.focus();
        rPassword.select();
        return;
    }
    if(rRepassword.value == ""){
        alert('Vui lòng nhập lại mật khẩu');
        rRepassword.focus();
        rRepassword.select();
        return;
    }
    if(rEmail.value.indexOf(" ")!==-1 || rEmail.value.indexOf("@")==-1) {        
        alert('Email không hợp lệ');
        rEmail.focus();
        rEmail.select();
        return;
    }
    var checkNum=1;
    for(var i=0;i<rNum.value.length; i++){
        if(rNum.value[i]<'0' || rNum.value[i]>'9')  checkNum=0;
    }
    if(checkNum==0 || rNum.value.length!=10){        
        alert('Số điện thoại không hợp lệ');
        rNum.focus();
        rNum.select();
        return;
    }
    for(var i=0;i<dataAccount.length;i++){
        if(dataAccount[i]['username']==rUsername){    
            alert('Tên đăng nhập đã có người sử dụng');
            rUsername.focus();
            rUsername.select();
            return;
        }   
    }
    if(rPassword.value != rRepassword.value){        
        alert('Mật khẩu nhập lại không trùng khớp');
        rRepassword.focus();        
        rRepassword.select();
        return;
    }

    dataAccount.push(
        {id: dataAccount[dataAccount.length-1]['id']+1, username: rUsername.value, password: rPassword.value, 
        type: 'client', fullname: rFullName.value, email: rEmail.value, number:rNum.value}
    );
    localStorage.setItem('account',JSON.stringify(dataAccount));
    alert('Đăng ký thành công');
    closeRegister();
}

function setting(){
    window.location.href="./admin/admin.html";
}

function showCart(){    
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }
}

function loadCart() {
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var s = "";
    totalPrice=0;
    if(localStorage.getItem('cart')!==null){
        for(var i=0;i<productCartList.length;i++){
            var cartId = productCartList[i]['id']-1;
            var sizeChar;
            if(productCartList[i]["size"]==1)   sizeChar = "S";
            else if(productCartList[i]["size"]==2)   sizeChar = "M";
            else if(productCartList[i]["size"]==3)   sizeChar = "L";
    
            totalPrice+=productCartList[i]['price'];
            
            s+='<!-- One item --><div class="sub-item">' + 
                '<div class="item-image"><img class="item-img" src="'+productArray[cartId]["img"]+'" alt="'+productArray[cartId]["type"]+'"></div>' +
                '<div class="item-PQT"><div class="item-name-extra"><div class="item-title">'+productArray[cartId]["name"]+'</div>' + 
                '<ul class="item-note"><li class="item-note-size font-note">Size '+sizeChar+'</li>' + 
                '<li class="item-note-notes font-note">'+productCartList[i]["comment"]+'</li></ul></div>' +
                '<div class="item-price">'+productArray[cartId]['price']+'VNĐ</div>' + 
                '<div class="item-quantity"><span class="change-qty decrease" onclick="decQuanCart('+i+')">-</span>' +
                '<span id="cartQuantity'+i+'" class="quantity ng-binding">'+productCartList[i]['quantity']+'</span><span class="change-qty increase" onclick="incQuanCart('+i+')"">+</span></div>' +
                '<div class="total-all-item"><div id="total-all-price'+i+'" class="total-all-price">'+productCartList[i]["price"]+' VNĐ</div><i class="icon-shopping-cart fas fa-times" onclick="deleteCartItem('+i+')"></i>' + 
                '<div style="clear:both"></div></div></div><div style="clear:both"></div></div> <!-- End One item -->';
        }
    }
    document.getElementById('cartList').innerHTML = s;
    document.getElementById('total-price').innerHTML = totalPrice + "VNĐ";
}

function incQuanCart(cur) {
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var cRootPrice = productCartList[cur]['price']/productCartList[cur]['quantity'];
    productCartList[cur]['quantity']++;
    productCartList[cur]['price']+=cRootPrice;
    document.getElementById('cartQuantity'+cur).innerHTML = productCartList[cur]['quantity'];    
    document.getElementById('total-all-price'+cur).innerHTML = productCartList[cur]['price']+' VNĐ';
    localStorage.setItem('cart',JSON.stringify(productCartList));

    var sum=0;
    for(var i=0;i<productCartList.length;i++)   sum+=productCartList[i]['price'];
    document.getElementById('total-price').innerHTML =  sum + "VNĐ";
}

function decQuanCart(cur) {
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var cRootPrice = productCartList[cur]['price']/productCartList[cur]['quantity'];
    if(productCartList[cur]['quantity']-1<=0)   return;
    productCartList[cur]['quantity']--;
    productCartList[cur]['price']-=cRootPrice;
    document.getElementById('cartQuantity'+cur).innerHTML = productCartList[cur]['quantity'];    
    document.getElementById('total-all-price'+cur).innerHTML = productCartList[cur]['price']+' VNĐ';
    localStorage.setItem('cart',JSON.stringify(productCartList));

    
    var sum=0;
    for(var i=0;i<productCartList.length;i++)   sum+=productCartList[i]['price'];
    document.getElementById('total-price').innerHTML =  sum + "VNĐ";
}

function deleteCartItem(cur) {    
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var check = confirm("Bạn có muốn xóa sản phẩm " + productCartList[cur]['name'] + " không?")
    if(check==false)    return;
    productCartList.splice(cur,1);    
    localStorage.setItem('cart',JSON.stringify(productCartList));
    loadCart();
    alert('Xóa thành công');
}

function deleteAllCart(){   
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }     
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var check = confirm("Bạn có muốn xóa hết sản phẩm không?")
    if(check==false)    return;
    productCartList=[];    
    localStorage.setItem('cart',JSON.stringify(productCartList));
    loadCart();
    alert('Xóa thành công');
}

function successOrder() {
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }
    if(document.getElementById('addressCart').value==""){
        alert('Vui lòng nhập địa chỉ');
        document.getElementById('addressCart').focus();
        return;
    }
    var check = confirm("Bạn có chắc chắn đặt hàng không?")
    if(check==false)    return;            
    var productCartList = JSON.parse(localStorage.getItem('cart'));

    //Xu ly
    var billArray = [];
    var idBill = 1;
    if(localStorage.getItem('bill')!==null && localStorage.getItem('bill')!=null && JSON.parse(localStorage.getItem('bill')).length.length>0){
        var billArray = JSON.parse(localStorage.getItem('bill'));
        idBill = billArray[billArray.length-1]['idBill']+1;
    } 
    for(var i=0;i<productCartList.length;i++){
        billArray.push({
            idBill : idBill, productId : productCartList[i]['id'], name:  productCartList[i]['name'], size: productCartList[i]['size'],
            quantity: productCartList[i]['quantity'], price: productCartList[i]['price'], comment: productCartList[i]['comment'], 
            date: new Date("2021-12-16"), client: nameUser, address: document.getElementById('addressCart').value, totalPrice: totalPrice,number:productCartList.length , status: "False"
        });
    }
    localStorage.setItem('bill',JSON.stringify(billArray));

    productCartList=[];    
    localStorage.setItem('cart',JSON.stringify(productCartList));
    loadCart();
    alert('Đặt hàng thành công');
    document.getElementById('addressCart').value="";
    document.getElementById('total-price').innerHTML = "0 VNĐ";
    totalPrice =0;
    
}

function navBuy() {
    window.location.href="#shopping-cart";
}

function navPage(type){  
    showArray = [];
    curType = type;
    if(type=="all") showArray=productArray;
    else {
        for(var i=0;i<productArray.length;i++){
            if(productArray[i]['type']==type)  showArray.push(productArray[i]);
        }
    }
    reload(1);
}

var advancedMode = 0;
function search(){
    var s = document.getElementById('search_txt').value;
    var temp = [];
    if(s==""){
        navPage(curType);
    }
    else {
        for(var i=0;i<showArray.length;i++){
            if(showArray[i]['name'].indexOf(s)!=-1)  temp.push(showArray[i]);
        }
        showArray=temp;
        reload(1);
    }
}

function showAdvanceSearch(){
    document.getElementById('advanceSearch').style.display = document.getElementById('advanceSearch').style.display=="block"? "none":"block";
}

function advancedSearch(){   
    var fromPrice = document.getElementById('fromPrice').value;
    var toPrice = document.getElementById('toPrice').value;
    var fPrice=0,tPrice=999999999;
    var type=document.getElementById('advanceType').value;
    var s = document.getElementById('search_txt').value;
    var temp = [];
        if(fromPrice!=""){
            var checkNum=1;
            for(var i=0;i<fromPrice.length; i++){
                if(fromPrice[i]<'0' || fromPrice[i]>'9')  checkNum=0;
            }
            if(checkNum==0) {
                alert('Nhập mức giá tối thiểu chưa đúng định dạng')
                document.getElementById('fromPrice').select();
                document.getElementById('fromPrice').focus();
                return;
            } 
            fPrice = parseInt(fromPrice);
        }       
        if(toPrice!=""){
            for(var i=0;i<toPrice.length; i++){
                if(toPrice[i]<'0' || toPrice[i]>'9')  checkNum=0;
            }
            if(checkNum==0) {
                alert('Nhập mức giá tối đa chưa đúng định dạng')
                document.getElementById('toPrice').select();
                document.getElementById('toPrice').focus();
                return;
            }
            tPrice = parseInt(toPrice);
        }
      
    for(var i=0;i<productArray.length;i++){
        if(productArray[i]['name'].indexOf(s)!=-1 && productArray[i]['price']>=fPrice && productArray[i]['price']<=tPrice
        && (type=='all' || productArray[i]['type']==type))  temp.push(productArray[i]);
    }
    showArray=temp;
    reload(1);
}
