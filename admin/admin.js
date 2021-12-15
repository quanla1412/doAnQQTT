var productArray = [];
var showArray =[];
var handlingArray =[];
var maxShow = 8;
var curShow =1;
var editNow;

window.onload = function(){
    productArray = JSON.parse(localStorage.getItem('product'));
    showArray = productArray;
    showProduct(1);
    showPagination();
    document.getElementById('nav'+curShow).classList.add("js_page--active");
}

function showProduct(cur){
    var s="";
    curShow=cur;
    cur--;
    for(var i=maxShow*cur;i<maxShow*(cur+1) && i<showArray.length;i++){
        s+='<tr><td>' + showArray[i]['id'] + '</td>' +
            '<td class="table-img"><img src="' + showArray [i]['img'] + '" alt="san pham"></td>' +
            '<td>' + showArray[i]['name'] + '</td>' +
            '<td>' + showArray[i]['type'] + '</td>' + 
            '<td>' + showArray[i]['price'] + ' VND</td>' + 
            '<td><button class="js_button_close" onclick="erase(' + i + ')">Xóa </button>' +
            '<button class="js_button_fix" onclick="edit(' + i + ')">Sửa</button></td></tr>';
    }
    document.getElementById('productList').innerHTML = s;
}

function showPagination(){
    var s="";
    var n;
    if(showArray.length%maxShow==0)    n = showArray.length/maxShow;
    else    n = showArray.length/maxShow+1;
    if(showArray.length<=maxShow){
        document.getElementById('pagination').style.display = "none";
        return;
    }    
    document.getElementById('pagination').style.display = "flex";
    for(var i=1;i<=n;i++){
        s+='<button id="nav'+i+'" class="js_page" onclick="changePage(' + i +')">' + i + '</button>';
    }
    document.getElementById('pagination').innerHTML = s;
}

function reload(cur){
    showProduct(cur);
    showPagination();
    document.getElementById('nav'+curShow).classList.add("js_page--active");
}

function search(){
    var s = document.getElementById('searchtext').value;
    var type = document.getElementById('filter').value;
    var temp = [];
    showArray = [];
    if(s=="")   temp = productArray;
    else {
        for(var i=0;i<productArray.length;i++){
            if(productArray[i]['name'].indexOf(s)!=-1)  temp.push(productArray[i]);
        }
    }
    if(type=="all") showArray=temp;
    else {
        for(var i=0;i<temp.length;i++){
            if(temp[i]['type']==type)  showArray.push(temp[i]);
        }
    }
    reload(1);
}

function addProduct(){
    var aname = document.getElementById('add-name').value;
    var atype = document.getElementById('add-type').value;
    var aprice = parseInt(document.getElementById('add-price').value);
    var aid = productArray[productArray.length-1]['id']+1;
    var product = {id: aid, name: aname, price: aprice, type: atype, img: '../assets/img/default.png'};
    productArray.push(product);
    localStorage.setItem('product',JSON.stringify(productArray));
    alert('Thêm thành công');
    document.getElementById('add-name').value="";
    document.getElementById('add-type').value="none";
    document.getElementById('add-price').value="";
    document.getElementById('add-img').value="";
}

function checkAndAdd(){
    if(document.getElementById('add-name').value==""){
        alert('Chưa nhập tên sản phẩm');
        document.getElementById('add-name').focus();
        return;
    }
    if(document.getElementById('add-type').value=="none"){
        alert('Chưa chọn loại sản phẩm');
        document.getElementById('add-type').focus();
        return;
    }
    var price = document.getElementById('add-price').value;
    if(price==""){
        alert('Chưa nhập giá sản phẩm');
        document.getElementById('add-price').focus();
        return;
    }
    if(price.charAt(0)=='0'){            
        alert('Giá sản phẩm nhập sai');
        document.getElementById('add-price').focus();
        return;
    }
    for(var i=0;i<price.length;i++){
        if(price.charAt(i)<'0' || price.charAt(i)>'9'){            
            alert('Giá sản phẩm nhập sai');
            document.getElementById('add-price').focus();
            return;
        }
    }
    addProduct();
    reload(1);
}

function erase(pos){
    var check = confirm("Bạn có muốn xóa sản phẩm " + productArray[pos]['name'] + "không?")
    if(check==false)    return;
    productArray.splice(pos,1);
    localStorage.setItem('product',JSON.stringify(productArray));
    alert('Xóa thành công');
    reload(curShow);
}

function edit(cur){
    document.getElementById('modal').style.display = "flex";
    document.getElementById('edit-name').defaultValue=showArray[cur]['name'];
    document.getElementById('edit-price').defaultValue=showArray[cur]['price'];
    document.getElementById(showArray[cur]['type']).selected="true";
    editNow = showArray[cur]['id'];
}

function checkAndEdit(){    
    cur = editNow;
    if(document.getElementById('edit-name').value==""){
        alert('Chưa nhập tên sản phẩm');
        document.getElementById('edit-name').focus();
        return;
    }
    if(document.getElementById('edit-type').value=="none"){
        alert('Chưa chọn loại sản phẩm');
        document.getElementById('edit-type').focus();
        return;
    }
    var price = document.getElementById('edit-price').value;
    if(price==""){
        alert('Chưa nhập giá sản phẩm');
        document.getElementById('edit-price').focus();
        return;
    }
    if(price.charAt(0)=='0'){            
        alert('Giá sản phẩm nhập sai');
        document.getElementById('edit-price').focus();
        return;
    }
    for(var i=0;i<price.length;i++){
        if(price.charAt(i)<'0' || price.charAt(i)>'9'){            
            alert('Giá sản phẩm nhập sai');
            document.getElementById('edit-price').focus();
            return;
        }
    }
    var pid=showArray[cur]['id'];    
    productArray[pid]['name'] = document.getElementById('edit-name').value;
    productArray[pid]['type'] = document.getElementById('edit-type').value;
    productArray[pid]['price'] = parseInt(document.getElementById('edit-price').value);
    localStorage.setItem('product',JSON.stringify(productArray));
    alert('Sửa thành công');
    showArray = productArray;
    reload(1);
    closeModal();
}

function closeModal(){    
    document.getElementById('modal').style.display = "none";
    window.location.href="";
}

function logout(){
    window.location.href="../index.html";
}

function changePage(cur){   
    document.getElementById('nav'+cur).classList.add('js_page--active');
    document.getElementById('nav'+curShow).classList.remove("js_page--active");
    showProduct(cur);
}

function navQLDH(){
    document.getElementById('search').style.display = "none";
    document.getElementById('manager_product').style.display = "block";
    document.getElementById('manager_product_turnover').style.display = "none";
    showCurBill();
}

function navSP(){
    document.getElementById('search').style.display = "flex";
    document.getElementById('manager_product').style.display = "none";
    document.getElementById('manager_product_turnover').style.display = "none";
    productArray = JSON.parse(localStorage.getItem('product'));
    showArray = productArray;
    showProduct(1);
}

function navQLDT(){
    document.getElementById('manager_product').style.display = "none";
    document.getElementById('search').style.display = "none";
    document.getElementById('manager_product_turnover').style.display = "block";
    showTurnOver();
}

function changeMaxShow(){
    maxShow = document.getElementById('maxShow').value;
    reload(1);
}

// Quan ly hoa don
function showCurBill(){
    //Lay san pham
    if(localStorage.getItem('bill')===null) return;
    var billArray = JSON.parse(localStorage.getItem('bill'));

    //Show hoa don
    var s = "";
    var n = 0;
    for(var i=0;i<billArray.length;i++){
        if(n==0){
            n = billArray[i]['number'];
            s+="<tr><td rowspan="+n+">"+billArray[i]['idBill']+"</td>" + 
            "<td>"+billArray[i]['name']+"</td>"+
            "<td>"+billArray[i]['size']+"</td>"+
            "<td><p>"+billArray[i]['comment']+"</p></td>" +
            "<td>"+billArray[i]['quantity']+"</td>" +
            "<td rowspan="+n+">"+billArray[i]['totalPrice']+" VND</td>" + 
            "<td rowspan="+n+"><h1 id='h1_handling'>Đang xử lí</h1><button type='button'class='js_button_sucess' onclick='addHistoryBill("+billArray[i]['idBill']+")'>Hoàn Thành</button>" + 
            "<button type='button' class='js_button_fail' onclick='deleteBill("+billArray[i]['idBill']+")'>Hủy</button></td></tr>";
        } else {
            s+="<tr><td>"+billArray[i]['name']+"</td>" + 
            "<td>"+billArray[i]['size']+"</td>" + 
            "<td class='space'><p>"+billArray[i]['comment']+"</p></td>"+
            "<td>"+billArray[i]['quantity']+"</td></tr>";
        }
        n--;
    }
    document.getElementById('bill-manager').innerHTML = s;
}

function deleteBill(bill){
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var check = confirm('Bạn chắc chắn muốn xóa đơn hàng mã ' + bill);
    if(check==false)    return ;

    for(var i=0;i<billArray.length;i++){
        if(bill==billArray[i]['idBill']){
            billArray.splice(i,billArray[i]['number']);
            break;
        }
    }
    localStorage.setItem('bill',JSON.stringify(billArray));
    showCurBill();
}

function addHistoryBill(bill){    
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var historyArray = JSON.parse(localStorage.getItem('historyBill'));
    var check = confirm('Bạn đã hoàn thành đơn hàng mã ' + bill);
    if(check==false)    return ;

    for(var i=0;i<billArray.length;i++){
        if(bill==billArray[i]['idBill']){
            historyArray += billArray.splice(i,billArray[i]['number']);
            break;
        }
    }
    localStorage.setItem('bill',JSON.stringify(billArray));
    localStorage.setItem('historyBill',JSON.stringify(historyArray));
    showCurBill();
}


//Quan ly doanh thu
var maxShowTurnover = 8;
function compareDate(a,b){
    return a['date']>b['date'];
}

function checkType(array,id,type){
    for(var i=0;i<array.length;i++){
        if(array[i]['id']==id)  return type!='all' && productArray[i]['type']!=type;
    }
    return true;
}

function getType(array,id){
    for(var i=0;i<array.length;i++){
        if(array[i]['id']==id)  return array[i]['type'];
    }
    return "unknow";
}

function showTurnOver(){
    var totalTurnover = 0;
    var turnoverArray = JSON.parse(localStorage.getItem('historyBill'));
    var formDate = document.getElementById('formDate').value;
    var toDate = document.getElementById('toDate').value;
    var search = document.getElementById('turnoverSearch').value;
    var type =  document.getElementById('turnoverType').value;

    for(var i=0;i<turnoverArray.length;i++){
        var idItem = turnoverArray[i]['productId'];
        if(turnoverArray[i]['date']<formDate || turnoverArray[i]['date']>toDate || turnoverArray[i]['name'].indexOf(search)==-1 || checkType(productArray,idItem,type)){
            turnoverArray.splice(i--,1);
        }
    }
    var s = "";
    for(var i=0;i<turnoverArray.length;i++){
        totalTurnover+=(turnoverArray[i]['price']/2);
        var idItem = turnoverArray[i]['productId'];
        s+="<tr><td>"+turnoverArray[i]['productId']+"</td>" +
        "<td>"+turnoverArray[i]['name']+"</td>" + 
        "<td>"+getType(productArray,idItem)+"</td>" + 
        "<td>"+turnoverArray[i]['date']+"</td>" +
        "<td>"+(turnoverArray[i]['price']/2)+" VND</td></tr>";
    }
    document.getElementById('turnoverList').innerHTML = s;
    document.getElementById('totalTurnover').innerHTML=totalTurnover;
}