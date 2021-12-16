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
    var product = {id: aid, name: aname, price: aprice, type: atype, img: '../assets/img/header_logo.png'};
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
        document.getElementById('add-name').select();
        return;
    }
    if(document.getElementById('add-type').value=="none"){
        alert('Chưa chọn loại sản phẩm');
        document.getElementById('add-type').focus();
        document.getElementById('add-type').select();
        return;
    }
    var price = document.getElementById('add-price').value;
    if(price==""){
        alert('Chưa nhập giá sản phẩm');
        document.getElementById('add-price').focus();
        document.getElementById('add-price').select();
        return;
    }
    if(price.charAt(0)=='0'){            
        alert('Giá sản phẩm nhập sai');
        document.getElementById('add-price').focus();
        document.getElementById('add-price').select();
        return;
    }
    for(var i=0;i<price.length;i++){
        if(price.charAt(i)<'0' || price.charAt(i)>'9'){            
            alert('Giá sản phẩm nhập sai');
            document.getElementById('add-price').focus();
            document.getElementById('add-price').select();
            return;
        }
    }
    addProduct();
    reload(1);
}

function erase(pos){
    var check = confirm("Bạn có muốn xóa sản phẩm " + productArray[pos]['name'] + " không?")
    if(check==false)    return;
    productArray.splice(pos,1);
    localStorage.setItem('product',JSON.stringify(productArray));
    alert('Xóa thành công');
    reload(curShow);
}

function edit(cur){
    document.getElementById('modal').style.display = "flex";
    document.getElementById('editImg').src=showArray[cur]['img'];
    document.getElementById('edit-name').defaultValue=showArray[cur]['name'];
    document.getElementById('edit-price').defaultValue=showArray[cur]['price'];
    document.getElementById(showArray[cur]['type']).selected="true";
    editNow = cur;
}

function checkAndEdit(){ 
    cur = editNow;  
    if(document.getElementById('edit-name').value==""){
        alert('Chưa nhập tên sản phẩm');
        document.getElementById('edit-name').focus();
        document.getElementById('edit-name').select();
        return;
    }
    if(document.getElementById('edit-type').value=="none"){
        alert('Chưa chọn loại sản phẩm');
        document.getElementById('edit-type').focus();
        document.getElementById('edit-type').select();
        return;
    }
    var price = document.getElementById('edit-price').value;
    if(price==""){
        alert('Chưa nhập giá sản phẩm');
        document.getElementById('edit-price').focus();
        document.getElementById('edit-price').select();
        return;
    }
    if(price.charAt(0)=='0'){            
        alert('Giá sản phẩm nhập sai');
        document.getElementById('edit-price').focus();
        document.getElementById('edit-price').select();
        return;
    }
    for(var i=0;i<price.length;i++){
        if(price.charAt(i)<'0' || price.charAt(i)>'9'){            
            alert('Giá sản phẩm nhập sai');
            document.getElementById('edit-price').focus();
            document.getElementById('edit-price').select();
            return;
        }
    }
    var pid=showArray[cur]['id']-1;  
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
    document.getElementById('history_product').style.display="none";
    showCurBill();
}

function navSP(){
    document.getElementById('search').style.display = "flex";
    document.getElementById('manager_product').style.display = "none";
    document.getElementById('manager_product_turnover').style.display = "none";  
    document.getElementById('history_product').style.display="none";
    productArray = JSON.parse(localStorage.getItem('product'));
    showArray = productArray;
    showProduct(1);
}

function navLSDH(){
    document.getElementById('search').style.display = "none";
    document.getElementById('manager_product').style.display = "none";
    document.getElementById('manager_product_turnover').style.display = "none";
    document.getElementById('history_product').style.display="block";
    showHistory();
}

function navQLDT(){
    document.getElementById('manager_product').style.display = "none";
    document.getElementById('search').style.display = "none";
    document.getElementById('manager_product_turnover').style.display = "block";    
    document.getElementById('history_product').style.display="none";
    showTurnOver(1);
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
        if(billArray[i]["size"]=='1')   billArray[i]["size"] = "S";
        else if(billArray[i]["size"]=='2')   billArray[i]["size"] = "M";
        else if(billArray[i]["size"]=='3')   billArray[i]["size"] = "L";
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
            historyArray.push(billArray[i]);
        }
    }
    for(var i=0;i<billArray.length;i++){
        if(bill==billArray[i]['idBill']){
            billArray.splice(i--,1);
        }
    }
    localStorage.setItem('bill',JSON.stringify(billArray));
    localStorage.setItem('historyBill',JSON.stringify(historyArray));
    showCurBill();
}


//Quan ly doanh thu
var maxShowTurnover = 8;
function compareDate(a,b){
    return a['date']<b['date'];
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

function convertTime(str){
    var date = new Date(str);
    return date.getDate() + "\\" + (date.getMonth()+1) + "\\" + date.getFullYear();
}




function showTurnOver(cur){
    cur--;
    var totalTurnover = 0;
    var turnoverArray = JSON.parse(localStorage.getItem('historyBill'));
    var formDate = new Date(document.getElementById('formDate').value);
    var toDate = new Date(document.getElementById('toDate').value);
    var search = document.getElementById('turnoverSearch').value;
    var type =  document.getElementById('turnoverType').value;


    for(var i=0;i<turnoverArray.length;i++){
        var idItem = turnoverArray[i]['productId'];
        var curDate = new Date(turnoverArray[i]['date']);
        if(curDate<formDate || curDate>toDate || turnoverArray[i]['name'].indexOf(search)==-1 || checkType(productArray,idItem,type)){
            turnoverArray.splice(i--,1);
        }
    }
    var s = "";
    for(var i=cur*maxShowTurnover;i<turnoverArray.length && i<(cur+1)*maxShowTurnover;i++){
        totalTurnover+=(turnoverArray[i]['price']/2);
        var idItem = turnoverArray[i]['productId'];
        s+="<tr><td>"+turnoverArray[i]['productId']+"</td>" +
        "<td>"+turnoverArray[i]['name']+"</td>" + 
        "<td>"+getType(productArray,idItem)+"</td>" + 
        "<td>"+convertTime(turnoverArray[i]['date'])+"</td>" +
        "<td>"+(turnoverArray[i]['price']/2)+" VND</td></tr>";
    }
    document.getElementById('turnoverList').innerHTML = s;
    document.getElementById('totalTurnover').innerHTML=totalTurnover;
    TOShowPag(turnoverArray.length,cur);
    
}

function TOShowPag(lengthArray,cur){
    var s="";
    if(lengthArray<maxShowTurnover){
        document.getElementById('TOpag').innerHTML=s;
        return;
    }
    var n = lengthArray/maxShowTurnover;
    if(lengthArray%maxShowTurnover!=0)  n++;
    for(var i=1;i<=n;i++){
        s+='<button id="TOPag'+i+'" class="js_page_product_turnover" onclick="showTurnOver('+i+')">'+i+'</button>';
    }
    document.getElementById('TOpag').innerHTML=s;
    document.getElementById('TOPag' + (cur+1)).classList.add('js_page_product_turnover_active');
}

function changeMaxShowTurnover(){
    maxShowTurnover = parseInt(document.getElementById('maxShowTurnover').value);
    showTurnOver(1);
}


// lich su don hang
function showHistory(){
    var historyArray = JSON.parse(localStorage.getItem('historyBill'));
    var formDate = new Date(document.getElementById('formDateH').value);
    var toDate = new Date(document.getElementById('toDateH').value);

    for(var i=0;i<historyArray.length;i++){
        var curDate = new Date(historyArray[i]['date']); 
        if(curDate<formDate || curDate>toDate){      
            historyArray.splice(i--,1);
            
        }
    }

    var s="";
    var n=0;
    for(var i=0;i<historyArray.length;i++){
        if(n==0){
            n=historyArray[i]['number'];
            s+="<tr><td rowspan="+n+">"+historyArray[i]['idBill']+"</td>" + 
            "<td>"+historyArray[i]['name']+"</td>" +
            "<td>"+historyArray[i]['size']+"</td>" +
            "<td>"+historyArray[i]['quantity']+"</td>" + 
            "<td rowspan="+n+">"+historyArray[i]['totalPrice']+" VND</td>" + 
            "<td rowspan="+n+">"+convertTime(historyArray[i]['date'])+"</td>" +
            "<td rowspan="+n+">"+historyArray[i]['client']+"</td></tr>";
        } else {
            s+="<tr><td>"+historyArray[i]['name']+"</td>" +
            "<td>"+historyArray[i]['size']+"</td>" +
            "<td>"+historyArray[i]['quantity']+"</td></tr>" 
        }
        n--;
    }
    document.getElementById('historyBody').innerHTML = s;
}